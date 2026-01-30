"use client";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment, LinearProgress, Box } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import React from "react";
import checkPasswordStrength from "../checkPasswordStrength";
import { Page } from "@/util";

export default function ({
  unmaskable,
  strengthMeter,
  timeout,
  onTimeout,
  match,
  onStrengthChanged,
  error: Error,
  ...attr
}) {
  const [extraInfo, setExtraInfo] = React.useState("");
  const [slotProps, setSlotProps] = React.useState();
  const [masked, setMasked] = React.useState(true);
  const [countdown, setCountdown] = React.useState(0);
  const [showStrength, setShowStrength] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState({
    score: 0,
    color: "",
    strength: "",
  });

  React.useEffect(() => {
    if (!strengthMeter) return;
    setShowStrength(true);
  }, [strengthMeter]);

  React.useEffect(() => {
    if (countdown === undefined) return;
    if (countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      setExtraInfo(
        <span className="flex-end">
          {timeout.prefix} {countdown} {timeout.suffix}
        </span>
      );
    }
  }, [countdown]);
  React.useEffect(() => {
    if (!onTimeout) return;
    setCountdown(timeout?.value);
    setTimeout(() => {
      setExtraInfo("");
      onTimeout();
    }, timeout?.value * 1000);
  }, [timeout?.value]);

  React.useEffect(() => {
    setSlotProps({
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              variant="contained"
              onClick={toggleMasked}
              sx={{
                height: "32px",
                width: "32px",
                px: 2,
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {" "}
              {masked ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      },
      root: {},
    });
  }, [unmaskable, masked]);
  React.useEffect(() => {
    if (!showStrength) return;
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);
  React.useEffect(() => {
    if (!showStrength) return;
    setError(passwordStrength.score < 4);
    setExtraInfo(
      passwordStrength.score > 0 ? (
        <>
          <Page.Box
            component="span"
            sx={{
              fontSize: "12px",
              mt: 0.5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span
              className={passwordStrength.color}
              component="span"
              sx={{
                fontSize: "13px",
                fontWeight: "400",
                color: passwordStrength.color,
              }}
            >
              {passwordStrength.strength}
            </span>
            <span style={{ color: "#757575", fontSize: "11px" }}>
              {passwordStrength.score}/5
            </span>
          </Page.Box>
          <LinearProgress
            variant="determinate"
            value={passwordStrength.score * 20}
            color={passwordStrength.color}
          />
        </>
      ) : (
        <></>
      )
    );
    onStrengthChanged && onStrengthChanged(passwordStrength);
  }, [passwordStrength]);
  function toggleMasked() {
    setMasked(!masked);
  }

  return (
    <TextField
      {...attr}
      InputProps={attr.InputProps}
      inputProps={{
        ...attr.inputProps,
        sx: {
          backgroundColor: "white",
        },
      }}
      InputLabelProps={attr.InputLabelProps}
      error={error}
      helperText={extraInfo}
      id={attr.id}
      type={masked ? "password" : "text"}
      name={attr.name}
      placeholder={attr.placeholder}
      autoComplete={attr.autocomplete}
      autoFocus={attr.autoFocus}
      required={attr.required}
      variant={attr.variant}
      color={attr.color}
      sx={attr.sx}
      size="small"
      value={password}
      onChange={(e) => {
        if (attr.onChange) attr.onChange(e);
        let target = e.target;
        setPassword(target.value);
        if (!match) return;
        let form = target.form;
        let fld = form.querySelector(`[name=${match}]`);
        let basePassword = fld.value;
        if (basePassword === target.value) {
          setError(false);
        } else {
          setError(true);
        }
      }}
      onBlur={() => {
        if (Error) {
          setPassword("");
          setError(false);
        }
      }}
      slotProps={slotProps}
      fullWidth
    />
  );
}
