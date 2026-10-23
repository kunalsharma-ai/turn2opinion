"use client";
import React from "react";
import { Controller } from "react-hook-form";
import Icon from "../Icon";

/**
 * Date of birth as three selects, the way the preview does it — far
 * better on mobile than a calendar popover, and it sidesteps the
 * day/month ambiguity that a single text field invites.
 *
 * Stored value stays "YYYY-MM-DD", which is what the API already expects,
 * so this is a drop-in replacement for the MUI date picker.
 */
export default function DobField({ question, control, disabled, invalid }) {
  const thisYear = new Date().getFullYear();
  const range = question.dateRange || {};
  const maxYear = range.max ? new Date(range.max).getFullYear() : thisYear - 16;
  const minYear = range.min ? new Date(range.min).getFullYear() : 1900;

  const months = React.useMemo(() => {
    const fmt = new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" });
    return Array.from({ length: 12 }, (_, m) =>
      fmt.format(new Date(Date.UTC(2000, m, 1))),
    );
  }, []);

  const years = React.useMemo(() => {
    const out = [];
    for (let y = maxYear; y >= minYear; y--) out.push(y);
    return out;
  }, [maxYear, minYear]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <Controller
      name={question.name}
      control={control}
      rules={{
        required: question.required ? "This field is required" : false,
        validate: (v) =>
          !v || /^\d{4}-\d{2}-\d{2}$/.test(v) ? true : "Pick a full date",
      }}
      render={({ field }) => {
        const [y = "", m = "", d = ""] = String(field.value || "").split("-");
        const set = (ny, nm, nd) =>
          field.onChange(ny || nm || nd ? `${ny}-${nm}-${nd}` : "");

        // Clamp the day list to the selected month, so 31 February can't be chosen.
        const daysInMonth =
          y && m ? new Date(Number(y), Number(m), 0).getDate() : 31;

        return (
          <div
            className={`dob${invalid ? " bad" : ""}`}
            role="group"
            aria-labelledby="qh"
            aria-describedby="er"
          >
            <span className="fi">
              <Icon n="calendar" />
            </span>

            <label>
              <span>Day</span>
              <select
                id="qi"
                value={d}
                disabled={disabled}
                autoComplete="bday-day"
                onChange={(e) => set(y, m, e.target.value)}
              >
                <option value="">DD</option>
                {Array.from({ length: daysInMonth }, (_, i) => (
                  <option key={i} value={pad(i + 1)}>
                    {pad(i + 1)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Month</span>
              <select
                value={m}
                disabled={disabled}
                autoComplete="bday-month"
                onChange={(e) => set(y, e.target.value, d)}
              >
                <option value="">MM</option>
                {months.map((name, i) => (
                  <option key={i} value={pad(i + 1)}>
                    {pad(i + 1)} · {name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Year</span>
              <select
                value={y}
                disabled={disabled}
                autoComplete="bday-year"
                onChange={(e) => set(e.target.value, m, d)}
              >
                <option value="">YYYY</option>
                {years.map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
            </label>
          </div>
        );
      }}
    />
  );
}
