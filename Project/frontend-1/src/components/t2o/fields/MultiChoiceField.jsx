"use client";
import React from "react";
import { Controller } from "react-hook-form";
import Icon, { Flag } from "../Icon";
import { normalise, withExtras } from "./ChoiceField";

/**
 * Multi-select. Short labels become `chips`, longer ones `tiles multi`.
 * Above them sits the preview's filter row: search, live count, clear-all.
 *
 * Honours the flags the existing API already sends: maxSelections,
 * isExclusive ("None of these" clears the rest) and describeLabel
 * (reveals a <name>_specify text field, handled by the caller).
 */
export default function MultiChoiceField({
  question,
  control,
  options = [],
  disabled,
  invalid,
  onPick,
}) {
  const opts = withExtras(normalise(options), question);
  const [filter, setFilter] = React.useState("");
  const needle = filter.trim().toLowerCase();

  const compact = opts.every((o) => o.label.length <= 22);
  const withIcons = opts.some((o) => o.emoji || o.icon);
  const max = Number(question.maxSelections) || 0;

  return (
    <Controller
      name={question.name}
      control={control}
      defaultValue={[]}
      rules={{
        validate: (v) =>
          !question.required || (Array.isArray(v) && v.length > 0)
            ? true
            : "Pick at least one",
      }}
      render={({ field }) => {
        const selected = Array.isArray(field.value) ? field.value : [];

        const toggle = (opt) => {
          let next;
          if (selected.includes(opt.value)) {
            next = selected.filter((v) => v !== opt.value);
          } else if (opt.isExclusive) {
            next = [opt.value];
          } else {
            const cleaned = selected.filter(
              (v) => !opts.find((o) => o.value === v && o.isExclusive),
            );
            if (max && cleaned.length >= max) return;
            next = [...cleaned, opt.value];
          }
          field.onChange(next);
          onPick?.(next);
        };

        return (
          <>
            <div className="cbh">
              {opts.length > 8 && (
                <label className="fsr">
                  <span className="sr">Filter options</span>
                  <Icon n="search" />
                  <input
                    id="flt"
                    type="search"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder={`Search ${opts.length} options`}
                    autoComplete="off"
                    onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                  />
                </label>
              )}
              <span className="cnt" id="cnt" aria-live="polite">
                {selected.length} selected
                {max ? ` of ${max}` : ""}
              </span>
              <button
                type="button"
                className="lnk"
                id="clr"
                hidden={!selected.length}
                onClick={() => field.onChange([])}
              >
                Clear all
              </button>
            </div>

            <div
              className={
                compact ? "chips" : `tiles multi${withIcons ? "" : " noic"}`
              }
              role="group"
              aria-labelledby="qh"
              aria-describedby="er"
            >
              {opts.map((o, i) => {
                const on = selected.includes(o.value);
                const hidden =
                  Boolean(needle) && !o.label.toLowerCase().includes(needle);
                const input = (
                  <input
                    type="checkbox"
                    value={o.value}
                    checked={on}
                    disabled={disabled || (!on && max > 0 && selected.length >= max)}
                    onChange={() => toggle(o)}
                  />
                );

                return compact ? (
                  <label
                    key={o.value}
                    className={`chip${on ? " on" : ""}`}
                    hidden={hidden}
                  >
                    {input}
                    <Icon n="check" />
                    <Flag cc={o.img} />
                    {o.emoji && (
                      <span className="emo" aria-hidden="true">{o.emoji}</span>
                    )}
                    <span>{o.label}</span>
                  </label>
                ) : (
                  <label
                    key={o.value}
                    className={`tile${on ? " on" : ""}`}
                    style={{ "--k": i }}
                    hidden={hidden}
                  >
                    {input}
                    {withIcons &&
                      (o.emoji ? (
                        <span className="ic emo" aria-hidden="true">{o.emoji}</span>
                      ) : (
                        <span className="ic">
                          <Icon n={o.icon || "check"} />
                        </span>
                      ))}
                    <span className="tl">
                      <Flag cc={o.img} />
                      {o.label}
                    </span>
                    <span className="tk">
                      <Icon n="check" />
                    </span>
                  </label>
                );
              })}
            </div>
          </>
        );
      }}
    />
  );
}
