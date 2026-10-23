"use client";
import React from "react";
import { Controller } from "react-hook-form";
import Icon, { Flag } from "../Icon";

/**
 * Single choice. The preview picks one of four shapes by option count and
 * label length, and that choice is what makes the page feel designed rather
 * than generic — so it is reproduced here:
 *
 *   tiles   ≤ 6 short options   big tappable cards with an icon
 *   tiles bin  exactly 2 yes/no   side-by-side affirmative/negative
 *   scale   ≤ 7 ordered options   bar-chart rating
 *   rows    anything longer       searchable radio list
 */
export default function ChoiceField({
  question,
  control,
  options = [],
  disabled,
  invalid,
  onPick,
}) {
  const opts = withExtras(normalise(options), question);
  const shape = pickShape(question, opts);

  return (
    <Controller
      name={question.name}
      control={control}
      rules={{ required: question.required ? "This field is required" : false }}
      render={({ field }) => {
        const common = {
          value: field.value,
          onChange: (v) => {
            field.onChange(v);
            onPick?.(v);
          },
          disabled,
          invalid,
          opts,
        };
        if (shape === "bin") return <Binary {...common} />;
        if (shape === "scale") return <Scale {...common} />;
        if (shape === "rows") return <Rows {...common} q={question} />;
        return <Tiles {...common} q={question} />;
      }}
    />
  );
}

function Tiles({ opts, value, onChange, disabled, q }) {
  const withIcons = opts.some((o) => o.emoji || o.icon);
  return (
    <div
      className={`tiles${withIcons ? "" : " noic"}`}
      role="radiogroup"
      aria-labelledby="qh"
      aria-describedby="er"
    >
      {opts.map((o, i) => (
        <label
          key={o.value}
          className={`tile${value == o.value ? " on" : ""}`}
          style={{ "--k": i }}
        >
          <input
            type="radio"
            name="q"
            value={o.value}
            checked={value == o.value}
            disabled={disabled}
            onChange={() => onChange(o.value)}
          />
          {withIcons &&
            (o.emoji ? (
              <span className="ic emo" aria-hidden="true">{o.emoji}</span>
            ) : (
              <span className="ic">
                <Icon n={o.icon || iconFor(q, o)} />
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
      ))}
    </div>
  );
}

function Binary({ opts, value, onChange, disabled }) {
  return (
    <div className="tiles bin" role="radiogroup" aria-labelledby="qh" aria-describedby="er">
      {opts.map((o, i) => (
        <label
          key={o.value}
          className={
            "tile" +
            (value == o.value ? " on" : "") +
            (/^yes/i.test(o.label) ? " yes" : /^no\b/i.test(o.label) ? " no" : "")
          }
          style={{ "--k": i }}
        >
          <input
            type="radio"
            name="q"
            value={o.value}
            checked={value == o.value}
            disabled={disabled}
            onChange={() => onChange(o.value)}
          />
          <span className="tl">{o.label}</span>
          <span className="tk">
            <Icon n="check" />
          </span>
        </label>
      ))}
    </div>
  );
}

function Scale({ opts, value, onChange, disabled }) {
  const n = opts.length;
  return (
    <div
      className="scale"
      style={{ "--n": n }}
      role="radiogroup"
      aria-labelledby="qh"
      aria-describedby="er"
    >
      {opts.map((o, i) => (
        <label key={o.value} className={`sc${value == o.value ? " on" : ""}`}>
          <input
            type="radio"
            name="q"
            value={o.value}
            checked={value == o.value}
            disabled={disabled}
            onChange={() => onChange(o.value)}
          />
          <span className="bars" aria-hidden="true">
            {Array.from({ length: n }, (_, k) => (
              <i
                key={k}
                className={k <= i ? "f" : ""}
                style={{ height: `${30 + (k * 70) / (n - 1 || 1)}%` }}
              />
            ))}
          </span>
          <span className="sl">{o.label}</span>
        </label>
      ))}
    </div>
  );
}

function Rows({ opts, value, onChange, disabled, q }) {
  const [filter, setFilter] = React.useState("");
  const needle = filter.trim().toLowerCase();
  const searchable = opts.length > 8;

  return (
    <>
      {searchable && (
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
      <div className="rows" role="radiogroup" aria-labelledby="qh" aria-describedby="er">
        {opts.map((o) => (
          <label
            key={o.value}
            className={`row${value == o.value ? " on" : ""}`}
            hidden={Boolean(needle) && !o.label.toLowerCase().includes(needle)}
          >
            <input
              type="radio"
              name="q"
              value={o.value}
              checked={value == o.value}
              disabled={disabled}
              onChange={() => onChange(o.value)}
            />
            <span className="dot" />
            {o.img ? (
              <Flag cc={o.img} />
            ) : o.emoji ? (
              <span className="ri emo" aria-hidden="true">{o.emoji}</span>
            ) : (
              <Icon n={iconFor(q, o)} className="ri" />
            )}
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </>
  );
}

/* ── helpers ───────────────────────────────────────────────── */

export function normalise(options) {
  return (options || []).map((o) =>
    typeof o === "string"
      ? { label: o, value: o, img: null, describeLabel: "", isExclusive: false }
      : {
          label: o.label,
          value: o.value,
          img: o.img || null,
          emoji: o.emoji || null,
          icon: o.icon || null,
          describeLabel: o.describeLabel || "",
          isExclusive: Boolean(o.isExclusive),
        },
  );
}

/**
 * Appends the synthetic choices the API asks for by flag rather than by
 * sending them as options. The previous MUI `Form.Select` did this too —
 * keeping it here means question definitions need no changes.
 *
 * "None of these" and "Prefer not to say" are exclusive: picking either
 * clears any other selection on a multi-select.
 */
export function withExtras(options, question) {
  const out = [...options];
  const has = (v) => out.some((o) => o.value === v);

  if (question?.hasOthers && !has(OTHER_VALUE)) {
    out.push({
      label: "Other",
      value: OTHER_VALUE,
      describeLabel: "Please specify",
      isExclusive: false,
    });
  }
  if (question?.hasNone && !has("none")) {
    out.push({ label: "None of these", value: "none", describeLabel: "", isExclusive: true });
  }
  if (question?.hasSkip && !has("skip")) {
    out.push({
      label: "Prefer not to say",
      value: "skip",
      describeLabel: "",
      isExclusive: true,
    });
  }
  return out;
}

export const OTHER_VALUE = "others";

/**
 * The label for the free-text follow-up a selection asks for, or null when
 * none does. Covers both the per-option `describeLabel` the API sends and
 * the generic "Other" added above.
 */
export function describeFor(options, value) {
  const picked = Array.isArray(value) ? value : [value];
  for (const v of picked) {
    const opt = options.find((o) => o.value === v);
    if (opt?.describeLabel) return opt.describeLabel;
    if (v === OTHER_VALUE) return "Please specify";
  }
  return null;
}

function pickShape(question, opts) {
  if (question.shape) return question.shape;
  const n = opts.length;
  const longest = opts.reduce((m, o) => Math.max(m, o.label.length), 0);
  const yesno =
    n === 2 && opts.some((o) => /^yes/i.test(o.label)) && opts.some((o) => /^no\b/i.test(o.label));
  if (yesno) return "bin";
  if (question.isScale && n <= 7) return "scale";
  if (n <= 6 && longest <= 28) return "tiles";
  return "rows";
}

function iconFor(question, option) {
  const s = `${option.label}`.toLowerCase();
  if (/female|woman/.test(s)) return "user";
  if (/male|man/.test(s)) return "user";
  if (/student/.test(s)) return "cap";
  if (/retired/.test(s)) return "clock";
  if (/employ|work|job/.test(s)) return "briefcase";
  if (/married|relationship|partner/.test(s)) return "heart";
  if (/tech|software|it\b/.test(s)) return "chip";
  if (/health|medical/.test(s)) return "heartpulse";
  if (/financ|bank/.test(s)) return "bank";
  if (/retail|shop/.test(s)) return "cart";
  if (/educat/.test(s)) return "book";
  return "check";
}
