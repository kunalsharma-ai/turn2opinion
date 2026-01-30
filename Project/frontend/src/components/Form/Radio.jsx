import React from "react";
import { RadioGroup, Radio, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { Page } from "@/util";

export default function ({
  label,
  control,
  defaultValue = "",
  options = [],
  ...attr
}) {
  return (
    <Page.Box display="flex" alignItems="center" sx={{ width: "100%" }}>
      <label
        htmlFor="radio-group"
        style={{ fontWeight: "bold", marginRight: 8 }}
      >
        {label}
      </label>
      <Controller
        {...attr}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup
            id="radio-group"
            row
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value}
            sx={{ gap: 2 }}
          >
            {options.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={
                  <Radio
                    color="secondary"
                    sx={{
                      filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3))",
                    }}
                  />
                }
                label={opt.label}
                sx={{
                  ".MuiFormControlLabel-label": {
                    marginLeft: -0.5,
                  },
                  marginRight: 1,
                }}
              />
            ))}
          </RadioGroup>
        )}
      />
    </Page.Box>
  );
}
