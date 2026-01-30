import React from "react";
import { Switch } from "@mui/material";
import { Controller } from "react-hook-form";
import { Page } from "@/util";

export default function ({ label, control, defaultValue = false, ...attr }) {
  return (
    <Page.Box display="flex" alignItems="center">
      <label htmlFor="toggle-switch" style={{ fontWeight: "bold" }}>
        {label}
      </label>
      <Controller
        {...attr}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Switch
            size="small"
            id="toggle-switch"
            {...field}
            sx={{
              transform: "scale(0.7)",
              filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.5))",
            }}
            checked={field.value}
            onChange={(e) => {
              field.onChange(e.target.checked);
            }}
          />
        )}
      />
    </Page.Box>
  );
}
