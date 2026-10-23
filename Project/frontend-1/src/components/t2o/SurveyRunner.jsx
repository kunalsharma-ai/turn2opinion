"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { api } from "@/util";
import { useToast } from "@/hooks";

import Panel from "./Panel";
import Journey from "./Journey";
import QuestionCard from "./QuestionCard";
import Icon from "./Icon";
import { useQuestionMeta, useExistingAnswers, isBlank } from "./useSurveyData";

/**
 * The survey, one question per screen.
 *
 * Data flow is unchanged from the previous MUI implementation — same
 * react-hook-form instance, same endpoints, same payload on submit. What
 * changed is that `survey.pages` is flattened into a single sequence:
 * each page's first element stays its section name and is shown in the
 * card header, while the questions after it become individual steps.
 *
 * Conditional questions still work the way they did: a question whose
 * `parent` has no answer is skipped rather than shown empty, and changing
 * an answer clears everything downstream of it.
 */
export default function SurveyRunner({
  survey,
  user,
  onError,
  onComplete,
  endpage = "/api/v1/me/survey",
  world,
}) {
  /* ── flatten pages → steps ─────────────────────────────── */
  const allSteps = React.useMemo(() => {
    const out = [];
    (survey?.pages || []).forEach((page) => {
      const [section, ...names] = page;
      names.forEach((name) => {
        if (!out.find((s) => s.name === name)) out.push({ name, section });
      });
    });
    return out;
  }, [survey]);

  const names = React.useMemo(() => allSteps.map((s) => s.name), [allSteps]);
  const { byName: meta, isLoading: metaLoading } = useQuestionMeta(names);

  const form = useForm({ mode: "onChange" });
  const { data: existing } = useExistingAnswers(names, names.length > 0);

  // Prefill once the saved answers land.
  const prefilled = React.useRef(false);
  React.useEffect(() => {
    if (!existing || prefilled.current) return;
    Object.entries(existing).forEach(([k, v]) => {
      if (names.includes(k) && !isBlank(v)) form.setValue(k, v);
    });
    prefilled.current = true;
  }, [existing, names, form]);

  /* ── which steps are actually live right now ───────────── */
  const values = form.watch();
  const steps = React.useMemo(
    () =>
      allSteps.filter((s) => {
        const q = meta[s.name];
        if (!q) return false;

        // Conditional: nothing to ask until the parent is answered.
        if (q.parent && isBlank(values?.[q.parent])) return false;
        if (s.name === "alternate-phone" && isBlank(values?.phone)) return false;

        // A locked question with no stored answer is a dead end — the
        // respondent can't edit it, so if it's also required they could
        // never get past it. Nothing to show and nothing to do: skip it.
        const locked = !(q.isEditable ?? true);
        if (locked && isBlank(values?.[s.name])) return false;

        return true;
      }),
    [allSteps, meta, values],
  );

  /* ── position: null = intro screen ─────────────────────── */
  const [cursor, setCursor] = React.useState(null);
  const [error, setError] = React.useState(null);

  const index = cursor === null ? -1 : Math.min(cursor, steps.length - 1);
  const step = index >= 0 ? steps[index] : null;
  const question = step ? meta[step.name] : null;

  const answeredCount = steps.filter((s) => !isBlank(values?.[s.name])).length;
  const pct = steps.length ? Math.round((answeredCount / steps.length) * 100) : 0;

  /* ── submit ────────────────────────────────────────────── */
  const save = useMutation({
    mutationFn: (data) => api.patch(endpage, { ...data, respID: survey.respID }),
    onSuccess: () => onComplete?.(true, { answers: answeredCount }),
    onError: (err) => {
      useToast(err);
      setError("We couldn’t save your answers. Please try again.");
    },
  });

  /* ── navigation ────────────────────────────────────────── */
  const goNext = React.useCallback(async () => {
    setError(null);

    // Intro → first question
    if (cursor === null) {
      const { link } = survey || {};
      if (link) return redirect(link.replace(/\$uid/g, survey.respID));
      return setCursor(0);
    }
    if (!step) return;

    const ok = await form.trigger(step.name);
    if (!ok) {
      const msg = form.formState.errors?.[step.name]?.message;
      return setError(msg || "Please answer this question to continue.");
    }

    // Age must agree with the date of birth already on the profile.
    if (step.name === "age" && user?.dob) {
      const age = Number(form.getValues("age"));
      const dob = new Date(user.dob);
      if (new Date().getFullYear() !== dob.getFullYear() + age) {
        return onError?.({
          title: "Invalid Age",
          btns: { ok: "Try Again", cancel: "Go Back" },
          message: (
            <p>
              The age you entered doesn’t match the information on your profile.
              Please check and correct your age and try again.
            </p>
          ),
        });
      }
    }

    if (index >= steps.length - 1) {
      return form.handleSubmit((data) => save.mutate(data))();
    }
    setCursor(index + 1);
  }, [cursor, step, index, steps.length, form, survey, user, onError, save]);

  const goBack = React.useCallback(() => {
    setError(null);
    setCursor((c) => (c === null || c <= 0 ? null : c - 1));
  }, []);

  // Alt + ← mirrors the preview's shortcut.
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goBack]);

  // Move focus to the new question so screen readers announce it.
  React.useEffect(() => {
    if (index < 0) return;
    const h = document.getElementById("qh");
    if (h) h.focus({ preventScroll: true });
  }, [index]);

  /* ── render ────────────────────────────────────────────── */
  if (metaLoading && !steps.length) return <RunnerSkeleton />;

  const mapSteps = steps.map((s, i) => ({
    name: s.name,
    title: meta[s.name]?.label || s.name,
    answered: !isBlank(values?.[s.name]),
    current: i === index,
  }));

  return (
    <main id="app" tabIndex={-1}>
      <div className="flow L">
        <Panel
          world={world || slugify(steps[0]?.section) || "identity"}
          category={step?.section || survey?.name || "Profile"}
          title={survey?.name || "Profile"}
          tagline={summarise(survey?.description, 110)}
          answered={answeredCount}
          total={steps.length}
          minutesLeft={Math.ceil((steps.length - answeredCount) / 8)}
          steps={mapSteps}
          onJump={(i) => {
            setError(null);
            setCursor(i);
          }}
          onBack={() => setCursor(null)}
        />

        <section className="qwrap">
          <Journey pct={pct} />

          {cursor === null ? (
            <Intro survey={survey} onStart={goNext} />
          ) : question ? (
            <QuestionCard
              question={question}
              form={form}
              section={step.section}
              index={index}
              total={steps.length}
              user={user}
              error={error}
              busy={save.isPending}
              canGoBack={index > 0}
              isLast={index >= steps.length - 1}
              onBack={goBack}
              onNext={goNext}
            />
          ) : (
            <RunnerSkeleton />
          )}
        </section>
      </div>
    </main>
  );
}

function Intro({ survey, onStart }) {
  return (
    <div className="card v-soft" id="cd">
      <span className="card-fx" aria-hidden="true">
        <span className="card-glow" />
      </span>
      <div className="qb enter-f">
        <div className="qhead">
          <span className="qemo" aria-hidden="true">
            <span>👋</span>
          </span>
          <span className="sec">{survey?.name}</span>
        </div>
        <div
          className="intro"
          dangerouslySetInnerHTML={{ __html: survey?.description || "" }}
        />
        <div className="nav">
          <button className="btn pr" type="button" onClick={onStart}>
            <span>Start</span>
            <Icon n="arrow-r" flip />
          </button>
        </div>
        <p className="kbd">Press Enter to continue</p>
      </div>
    </div>
  );
}

function RunnerSkeleton() {
  return (
    <div className="card v-soft">
      <div className="qb">
        <div className="skel" aria-hidden="true">
          <span className="sk-a" />
          <span className="sk-b" />
          <span className="sk-b" />
        </div>
        <p className="loading">Preparing your questions…</p>
      </div>
    </div>
  );
}

/** Plain-text lead-in for the side panel, cut on a word boundary. */
function summarise(html, max) {
  const text = String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : max).trimEnd()}…`;
}

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
