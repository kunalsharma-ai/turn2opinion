"use client";
import React from "react";
import { Controller } from "react-hook-form";
import Icon from "../Icon";
import { normalise } from "./ChoiceField";
import PhoneField from "./PhoneField";

/**
 * The `checkbox` question type — in practice this is "communication-methods",
 * which has the quirk that picking SMS or Phone reveals a phone input.
 * That behaviour is carried over from the old components/Checkbox.jsx.
 */
export default function CheckboxField({
  question,
  control,
  options = [],
  disabled,
  invalid,
  user,
}) {
  const opts = normalise(options);
  const isComms = question.name === "communication-methods";
  const needsPhone = isComms && !user?.phone;

  return (
    <Controller
      name={question.name}
      control={control}
      defaultValue={
        isComms && opts.some((o) => o.value === "email") ? ["email"] : []
      }
      rules={{
        validate: (v) =>
          !question.required || (Array.isArray(v) && v.length > 0)
            ? true
            : "Pick at least one",
      }}
      render={({ field }) => {
        const selected = Array.isArray(field.value) ? field.value : [];
        const toggle = (v) =>
          field.onChange(
            selected.includes(v)
              ? selected.filter((x) => x !== v)
              : [...selected, v],
          );

        const showPhone =
          needsPhone && selected.some((v) => ["sms", "phone", "whatsapp"].includes(v));

        return (
          <>
            <div
              className="chips"
              role="group"
              aria-labelledby="qh"
              aria-describedby="er"
            >
              {opts.map((o) => {
                const on = selected.includes(o.value);
                return (
                  <label key={o.value} className={`chip${on ? " on" : ""}`}>
                    <input
                      type="checkbox"
                      value={o.value}
                      checked={on}
                      disabled={disabled}
                      onChange={() => toggle(o.value)}
                    />
                    <Icon n="check" />
                    <span>{o.label}</span>
                  </label>
                );
              })}
            </div>

            {showPhone && (
              <div className="grp" style={{ marginTop: 16 }}>
                <p className="grp-h">Phone number for communication</p>
                <PhoneField
                  question={{ name: "phone", required: true }}
                  control={control}
                  disabled={disabled}
                />
              </div>
            )}
          </>
        );
      }}
    />
  );
}
