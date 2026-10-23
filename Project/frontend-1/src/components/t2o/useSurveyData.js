"use client";
import React from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import { api } from "@/util";

/**
 * Metadata for every question in the survey, fetched up front.
 *
 * The one-question-at-a-time layout needs all of it before it can draw
 * anything: the question map lists every title, and the progress ring
 * needs a denominator. The existing endpoint is single-question, so this
 * fans out and relies on react-query's cache to dedupe.
 *
 * If you add a bulk endpoint later, swap the body of this hook for one
 * request — nothing else in the runner has to change.
 */
export function useQuestionMeta(names = []) {
  const results = useQueries({
    queries: names.map((name) => ({
      queryKey: ["question", name],
      queryFn: async () => {
        const resp = await api.post("/api/v1/question", { name });
        if (resp.status === "error") throw new Error(resp.message);
        const row = Array.isArray(resp.data) && resp.data.length === 1 ? resp.data[0] : null;
        return row && row.name ? row : null;
      },
      staleTime: 5 * 60 * 1000,
      retry: false,
    })),
  });

  return React.useMemo(() => {
    const byName = {};
    names.forEach((n, i) => {
      const r = results[i];
      if (r?.data) byName[n] = r.data;
    });
    return {
      byName,
      isLoading: results.some((r) => r.isLoading),
      isError: results.every((r) => r.isError) && results.length > 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [names.join("|"), results.map((r) => r.status).join("|")]);
}

const OPTION_TYPES = ["select", "multiselect", "checkbox", "radio"];

/** Options (or the validation pattern) for one question. */
export function useQuestionOptions(question, parentValue) {
  const endpoint = OPTION_TYPES.includes(question?.type) ? "option" : "validation";
  const hasParent = Boolean(question?.parent);

  return useQuery({
    queryKey: [endpoint, question?.name, question?.parent, parentValue],
    queryFn: async () => {
      if (hasParent && isBlank(parentValue)) return [];
      const url = `/api/v1/${endpoint}/${question.name}`;
      const resp = hasParent
        ? await api.post(url, { parentValue })
        : await api.get(url);
      return resp?.data ?? [];
    },
    enabled: Boolean(question?.name) && (!hasParent || !isBlank(parentValue)),
    staleTime: 5 * 60 * 1000,
  });
}

/** Existing answers for the whole survey, used to prefill the form. */
export function useExistingAnswers(questions = [], enabled = true) {
  return useQuery({
    queryKey: ["answers", questions.join("|")],
    queryFn: async () => {
      const resp = await api.post("/api/v1/me", { questions });
      return resp?.data ?? {};
    },
    enabled: enabled && questions.length > 0,
    staleTime: 60 * 1000,
  });
}

export function isBlank(v) {
  return (
    v === null ||
    v === undefined ||
    v === "" ||
    (Array.isArray(v) && v.length === 0)
  );
}
