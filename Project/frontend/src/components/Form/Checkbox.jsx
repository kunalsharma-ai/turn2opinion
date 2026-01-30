"use client";
import React from "react";

import { Controller } from "react-hook-form";
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { Page } from "@/util";
// import FormControlLabel from "@mui/material/FormControlLabel";

export default function ({
  control,
  name,
  label,
  validations,
  error,
  icon,
  size = "small",
  labelPlacement = "end",
  ...attr
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={validations}
      render={({ field }) => {
        return (
          <>
            <FormControlLabel
              sx={attr.sx}
              labelPlacement={labelPlacement}
              label={
                <Page.Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.6,
                  }}
                >
                  {icon}
                  {label}
                </Page.Box>
              }
              control={
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  size={size}
                  color="secondary"
                />
              }
            />
            {!!error && (
              <FormHelperText sx={{ color: "error.main" }}>
                {error.message}
              </FormHelperText>
            )}
          </>
        );
      }}
    />
  );
}
