"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/util";
import Icon, { Flag } from "../Icon";

/**
 * Phone, as a dial-code select glued to a national-number input.
 * Stored value is "+{code} {national}", matching the current API.
 *
 * The dial code is preselected from /api/v1/get-country, the same call
 * the old Checkbox.jsx made, so behaviour is unchanged — only the skin is.
 */
export default function PhoneField({
  question,
  control,
  disabled,
  invalid,
  onEnter,
  defaultCountry,
}) {
  const { data } = useQuery({
    queryKey: ["country"],
    queryFn: async () => {
      const resp = await api.get("/api/v1/get-country");
      return String(resp?.country || "").trim().toUpperCase();
    },
    enabled: !defaultCountry,
    staleTime: Infinity,
  });

  const guess = (defaultCountry || data || "IN").toUpperCase();

  return (
    <Controller
      name={question.name}
      control={control}
      rules={{
        required: question.required ? "This field is required" : false,
        validate: (v) =>
          !v || String(v).replace(/\D/g, "").length >= 7
            ? true
            : "That number looks too short",
      }}
      render={({ field }) => {
        const raw = String(field.value || "");
        const matched = raw.match(/^\+(\d{1,4})\s*(.*)$/);
        const national = matched ? matched[2] : raw;
        const cc =
          (matched && codeToCountry(matched[1])) || guess;
        const dial = DIAL[cc] || "1";

        const write = (country, number) =>
          field.onChange(number ? `+${DIAL[country] || "1"} ${number}` : "");

        return (
          <div className={`fld phone${invalid ? " bad" : ""}`}>
            <label className="ccode">
              <span className="sr">Country code</span>
              <Flag cc={cc} />
              <span className="dial" dir="ltr">
                +{dial}
              </span>
              <Icon n="chev" />
              <select
                value={cc}
                disabled={disabled}
                aria-label="Country code"
                onChange={(e) => write(e.target.value, national)}
              >
                {Object.keys(DIAL)
                  .sort()
                  .map((c) => (
                    <option key={c} value={c}>
                      {NAMES[c] || c} (+{DIAL[c]})
                    </option>
                  ))}
              </select>
            </label>

            <input
              id="qi"
              className="in"
              type="tel"
              inputMode="tel"
              dir="ltr"
              value={national}
              disabled={disabled}
              placeholder="Type your answer"
              aria-labelledby="qh"
              aria-describedby="er"
              aria-invalid={invalid || undefined}
              maxLength={20}
              autoComplete="tel-national"
              onChange={(e) => write(cc, e.target.value.replace(/[^\d\s()\-.]/g, ""))}
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

/* A starter set. Extend from your existing country table as needed —
   the widget reads whatever keys are present here. */
const DIAL = {
  IN: "91", US: "1", GB: "44", DE: "49", FR: "33", ES: "34", IT: "39",
  JP: "81", CN: "86", BR: "55", AU: "61", CA: "1", SG: "65", AE: "971",
  ZA: "27", NG: "234", KE: "254", MX: "52", NL: "31", SE: "46",
};

const NAMES = {
  IN: "India", US: "United States", GB: "United Kingdom", DE: "Germany",
  FR: "France", ES: "Spain", IT: "Italy", JP: "Japan", CN: "China",
  BR: "Brazil", AU: "Australia", CA: "Canada", SG: "Singapore",
  AE: "United Arab Emirates", ZA: "South Africa", NG: "Nigeria",
  KE: "Kenya", MX: "Mexico", NL: "Netherlands", SE: "Sweden",
};

function codeToCountry(code) {
  // "1" and "44" etc. are ambiguous (US/CA share 1); first match wins,
  // and the user can always correct it with the select.
  return Object.keys(DIAL).find((c) => DIAL[c] === code) || null;
}
