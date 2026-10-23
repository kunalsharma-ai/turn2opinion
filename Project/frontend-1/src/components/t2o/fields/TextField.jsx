"use client";
import React from "react";
import { Controller } from "react-hook-form";
import Icon from "../Icon";

/**
 * Single-line input.  Markup contract from the preview:
 *   <div class="fld"><span class="fi">icon</span><input id="qi" class="in"><span class="vk">✓</span></div>
 * `.vk` is the validity tick the stylesheet reveals once the field is valid.
 */
export default function TextField({
  question,
  control,
  disabled,
  pattern,
  patternMessage,
  invalid,
  onEnter,
}) {
  const icon = ICONS[question.name] || guessIcon(question);
  const inputType =
    question.name === "email" || /mail/i.test(question.name) ? "email" : "text";

  return (
    <Controller
      name={question.name}
      control={control}
      rules={{
        required: question.required ? "This field is required" : false,
        ...(pattern
          ? { pattern: { value: pattern, message: patternMessage || msgFor(question) } }
          : {}),
      }}
      render={({ field, fieldState }) => {
        const filled = !["", null, undefined].includes(field.value);
        const bad = invalid || Boolean(fieldState.error);
        return (
          <div className={`fld${bad ? " bad" : ""}${filled && !bad ? " ok" : ""}`}>
            <span className="fi">
              <Icon n={icon} />
            </span>
            <input
              id="qi"
              className="in"
              type={inputType}
              value={field.value ?? ""}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              disabled={disabled}
              placeholder={question.placeholder || "Type your answer"}
              aria-labelledby="qh"
              aria-describedby="er"
              aria-invalid={bad || undefined}
              maxLength={question.maxLength || 120}
              autoComplete={AUTOCOMPLETE[question.name] || "off"}
              spellCheck={false}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onEnter?.();
                }
              }}
            />
            <span className="vk">
              <Icon n="check" />
            </span>
          </div>
        );
      }}
    />
  );
}

function msgFor(q) {
  if (/mail/i.test(q.name)) return "Add the @ and the domain, e.g. name@example.com";
  return "Check this answer and try again.";
}

function guessIcon(q) {
  const n = q.name.toLowerCase();
  if (/mail/.test(n)) return "mail";
  if (/name/.test(n)) return "user";
  if (/phone|mobile/.test(n)) return "call";
  if (/city|state|country|address|postal|zip/.test(n)) return "pin";
  if (/company|employer|organisation|organization/.test(n)) return "building";
  if (/job|title|role/.test(n)) return "briefcase";
  return "text";
}

const ICONS = {
  firstname: "user",
  lastname: "user",
  email: "mail",
  "alternate-email": "mail",
  "postal-code": "pin",
};

const AUTOCOMPLETE = {
  firstname: "given-name",
  lastname: "family-name",
  email: "email",
  "postal-code": "postal-code",
};
