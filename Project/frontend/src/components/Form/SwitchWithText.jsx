"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { Page } from "@/util";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const TextSwitch = styled(Switch)(({ theme }) => ({
  width: 64,
  height: 28,
  padding: 0,

  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "200ms",
    "&.Mui-checked": {
      transform: "translateX(36px)",
      color: "white",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.success.dark,
        "&::before": { opacity: 1 }, // show ON
        "&::after": { opacity: 0 }, // hide OFF
      },
    },
  },

  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: theme.palette.common.white,
  },

  "& .MuiSwitch-track": {
    borderRadius: 14,
    backgroundColor: theme.palette.grey[400],
    opacity: 1,
    position: "relative",
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.shortest,
    }),

    "&::before, &::after": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 12,
      fontWeight: 600,
      color: theme.palette.common.white,
    },
    "&::before": {
      content: '"ON"',
      left: 8,
      opacity: 0,
    },
    "&::after": {
      content: '"OFF"',
      right: 8,
      opacity: 1,
    },
  },
}));

export default function SwitchWithText({
  label,
  control,
  defaultValue = false,
  ...attr
}) {
  return (
    <Page.Box display="flex" alignItems="center" gap={2.5}>
      <label htmlFor="toggle-switch-with-text" style={{ fontWeight: "bold" }}>
        {label}
      </label>
      <Controller
        {...attr}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <TextSwitch
            id="toggle-switch-with-text"
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        )}
      />
    </Page.Box>
  );
}
