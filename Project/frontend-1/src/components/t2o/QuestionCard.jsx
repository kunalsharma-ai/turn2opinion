"use client";
import React from "react";
import Icon from "./Icon";
import { useQuestionOptions } from "./useSurveyData";

import TextField from "./fields/TextField";
import PhoneField from "./fields/PhoneField";
import DobField from "./fields/DobField";
import ChoiceField from "./fields/ChoiceField";
import MultiChoiceField from "./fields/MultiChoiceField";
import CheckboxField from "./fields/CheckboxField";
import { normalise, withExtras, describeFor } from "./fields/ChoiceField";

/**
 * One question, one card. Reproduces the preview's card anatomy:
 *
 *   .qhead   emoji · section · "Question n of m" · optional badge
 *   .qt      the question itself, words staggered in on entry
 *   #fld     the field widget
 *   .er      live error region
 *   .nav     Back / Continue
 *   .kbd     keyboard hint
 */
export default function QuestionCard({
  question,
  form,
  section,
  index,
  total,
  disabled,
  user,
  error,
  onBack,
  onNext,
  canGoBack,
  isLast,
  busy,
}) {
  const parentValue = question.parent ? form.watch(question.parent) : null;
  const { data: optionData, isLoading } = useQuestionOptions(question, parentValue);

  const options = Array.isArray(optionData) ? optionData : [];
  const pattern = Array.isArray(optionData) ? null : toRegExp(optionData?.pattern);
  const patternMessage = Array.isArray(optionData) ? null : optionData?.message;

  // Clear dependent answers when this one changes.
  const clearChildren = React.useCallback(() => {
    (question.children || []).forEach((child) =>
      form.setValue(child, null, { shouldDirty: true, shouldValidate: false }),
    );
  }, [question.children, form]);

  const field = renderField({
    question,
    form,
    options,
    pattern,
    patternMessage,
    disabled,
    user,
    invalid: Boolean(error),
    onEnter: onNext,
    onPick: clearChildren,
  });

  // A choice whose selected option asks for free text reveals a follow-up
  // stored as "<name>_specify", the same key the previous build submitted.
  const currentValue = form.watch(question.name);
  const specifyLabel = ["select", "multiselect"].includes(question.type)
    ? describeFor(withExtras(normalise(options), question), currentValue)
    : null;

  const words = String(question.label || "").split(/(\s+)/);

  return (
    <div className={`card v-soft${busy ? " wait" : ""}`} id="cd">
      <span className="card-fx" aria-hidden="true">
        <span className="card-glow" />
      </span>

      <div className="qb enter-f" id="qbody" key={question.name}>
        <div className="qhead">
          <span className="qemo" aria-hidden="true">
            <span>{emojiFor(question)}</span>
          </span>
          <span className="sec">{section}</span>
          <span className="qn">
            Question {index + 1} of {total}
          </span>
          {!question.required && <span className="opt">Optional</span>}
        </div>

        <h2 className="qt" id="qh" tabIndex={-1} aria-label={question.label}>
          {words.map((w, i) =>
            /^\s+$/.test(w) ? (
              w
            ) : (
              <span aria-hidden="true" className="w" style={{ "--i": i }} key={i}>
                {w}
              </span>
            ),
          )}
        </h2>

        <div id="fld">
          {isLoading ? <FieldSkeleton /> : field}
          {specifyLabel && (
            <div className="other-q">
              <p className="notice-q">{specifyLabel}</p>
              <TextField
                question={{
                  name: `${question.name}_specify`,
                  label: specifyLabel,
                  required: true,
                  isEditable: true,
                  placeholder: "Type your answer",
                }}
                control={form.control}
                disabled={disabled}
                onEnter={onNext}
              />
            </div>
          )}
        </div>

        <div className="er" id="er" role="alert">
          {error || ""}
        </div>

        <div className="nav">
          <button
            className="btn gh"
            id="bk"
            type="button"
            hidden={!canGoBack}
            onClick={onBack}
          >
            <Icon n="arrow-l" flip />
            <span>Back</span>
          </button>
          <button
            className="btn pr"
            id="nx"
            type="button"
            onClick={onNext}
            disabled={busy}
          >
            <span id="nxl">{busy ? "Saving…" : isLast ? "Finish" : "Continue"}</span>
            <Icon n="arrow-r" flip />
          </button>
        </div>

        <p className="kbd">
          Press Enter to continue{canGoBack ? " · Alt + ← to go back" : ""}
        </p>
      </div>
    </div>
  );
}

function renderField(props) {
  const { question } = props;
  switch (question.type) {
    case "text":
      return (
        <TextField
          {...slice(props)}
          pattern={props.pattern}
          patternMessage={props.patternMessage}
        />
      );
    case "phone":
      return <PhoneField {...slice(props)} />;
    case "date":
      return <DobField {...slice(props)} />;
    case "select":
      return <ChoiceField {...slice(props)} options={props.options} onPick={props.onPick} />;
    case "multiselect":
      return (
        <MultiChoiceField {...slice(props)} options={props.options} onPick={props.onPick} />
      );
    case "checkbox":
      return (
        <CheckboxField {...slice(props)} options={props.options} user={props.user} />
      );
    default:
      return (
        <p className="notice">
          This question type (<code>{question.type}</code>) isn’t handled yet.
        </p>
      );
  }
}

/**
 * Builds the validation RegExp the API sends as a string.
 *
 * Patterns that use Unicode property escapes (\p{L} and friends, which is
 * what you want for names in any script) only mean anything with the `u`
 * flag — without it `\p{L}` silently degrades to the characters p, L and
 * braces, and every real name fails. `u` is also stricter about stray
 * escapes, so a pattern it rejects is retried unflagged rather than lost.
 */
function toRegExp(pattern) {
  if (!pattern) return null;
  try {
    return new RegExp(pattern, "u");
  } catch {
    try {
      return new RegExp(pattern);
    } catch {
      return null; // malformed on the server — don't block the respondent
    }
  }
}

/** Common props every field takes. */
function slice({ question, form, disabled, invalid, onEnter }) {
  return {
    question,
    control: form.control,
    disabled: disabled || !(question.isEditable ?? true),
    invalid,
    onEnter,
  };
}

function FieldSkeleton() {
  return (
    <div className="skel" aria-hidden="true">
      <span className="sk-a" />
      <span className="sk-b" />
    </div>
  );
}

/** A small face for the card header — purely decorative. */
function emojiFor(q) {
  const n = `${q.name} ${q.label}`.toLowerCase();
  if (/mail/.test(n)) return "📧";
  if (/phone|mobile/.test(n)) return "📱";
  if (/birth|dob|age/.test(n)) return "🎂";
  if (/gender/.test(n)) return "🙂";
  if (/country|state|city|postal|address|live/.test(n)) return "🌍";
  if (/income|salary|money/.test(n)) return "💰";
  if (/employ|job|work|industry|company/.test(n)) return "💼";
  if (/household|family|children|relationship/.test(n)) return "🏠";
  if (/interest|hobby/.test(n)) return "✨";
  if (/device|tech/.test(n)) return "💻";
  if (/communicat|contact/.test(n)) return "🔔";
  if (/educat|study|school/.test(n)) return "🎓";
  if (/health/.test(n)) return "🩺";
  return "🙂";
}
