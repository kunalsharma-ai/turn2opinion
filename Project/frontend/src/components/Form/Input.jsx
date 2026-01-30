"use client";
import React from "react";
import { Controller } from "react-hook-form";
import { InputTextField, RequiredLabel } from "../forms";
import getOptions from "@/util/getOptions";
import { Link } from "@/util/page";
import { InputAdornment, Grid } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { IconButton, Tooltip, LinearProgress } from "@mui/material";
import Zoom from "@mui/material/Zoom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import checkPasswordStrength from "@/util/checkPasswordStrength";
import { Page } from "@/util";

function ParseErrorMessage({ error }) {
  try {
    let err = JSON.parse(error);
    return (
      <>
        {err.message}
        {err.link && <Link href={err.link.target}>{err.link.text}</Link>}
      </>
    );
  } catch (e) {
    return error;
  }
}

function PasswordStrengthMeter({ passwordStrength, showStrength }) {
  if (!showStrength || passwordStrength.score === 0) return null;

  return (
    <Page.Box sx={{ mt: 1, mb: 1 }}>
      <LinearProgress
        variant="determinate"
        value={passwordStrength.score * 20}
        sx={{
          height: 4,
          borderRadius: 2,
          "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor:
              passwordStrength.color === "success"
                ? "#4caf50"
                : passwordStrength.color === "warning"
                ? "#ff9800"
                : passwordStrength.color === "error"
                ? "#f44336"
                : "#9e9e9e",
          },
        }}
      />
      <Page.Box
        sx={{
          fontSize: "12px",
          mt: 0.5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span style={{ color: passwordStrength.color, fontWeight: 500 }}>
          {passwordStrength.strength}
        </span>
        <span style={{ color: "#757575", fontSize: "11px" }}>
          {passwordStrength.score}/5
        </span>
      </Page.Box>
    </Page.Box>
  );
}

export default function Input({
  prefix,
  compSize,
  suffix,
  control,
  errors,
  name,
  label,
  labelText,
  surveyLabel,
  required = false,
  sx,
  validations,
  parent,
  watch,
  api,
  showLabel = true,
  type,
  strengthMeter,
  match,
  onStrengthChanged,
  ...props
}) {
  const [hide, setHide] = React.useState(false);
  const [validate, setValidate] = React.useState(validations);
  const [masked, setMasked] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [showStrength, setShowStrength] = React.useState(false);
  const [passwordStrength, setPasswordStrength] = React.useState({
    score: 0,
    color: "",
    strength: "",
  });

  let pValue;
  if (parent) {
    pValue = watch(parent);
  }

  React.useEffect(() => {
    if (!parent) return;
    if (!pValue || pValue === "") return setHide(true);
    getOptions(api, pValue, (e) => {
      return e.pattern;
    }).then((r) => {
      if (r?.length === 1 && r[0] !== "") {
        const pattern = {
          value: new RegExp(`^${atob(r[0])}$`),
          message: `Invalid ${label}`,
        };
        setValidate({ ...validate, pattern });
      } else {
        setHide(true);
      }
    });
    setHide(false);
  }, [pValue]);

  // Password strength logic
  React.useEffect(() => {
    if (!strengthMeter || type !== "password") return;
    setShowStrength(true);
  }, [strengthMeter, type]);

  React.useEffect(() => {
    if (!showStrength) return;
    const strength = checkPasswordStrength(password);
    setPasswordStrength(strength);
    onStrengthChanged && onStrengthChanged(strength);
  }, [password, showStrength]);

  let temp = {};
  if (suffix && suffix !== "")
    temp.endAdornment = (
      <InputAdornment position="end">{suffix}</InputAdornment>
    );
  if (prefix && prefix !== "")
    temp.startAdornment = (
      <InputAdornment position="start">{prefix}</InputAdornment>
    );

  // Add visibility toggle for password fields
  if (type === "password" && !props.InputProps?.endAdornment) {
    temp.endAdornment = (
      <InputAdornment position="end">
        <IconButton
          onClick={() => setMasked(!masked)}
          sx={{
            height: "32px",
            width: "32px",
            p: 0,
            "&:hover": {
              boxShadow: "none",
            },
          }}
        >
          {masked ? (
            <VisibilityOff fontSize="small" />
          ) : (
            <Visibility fontSize="small" />
          )}
        </IconButton>
        {temp.endAdornment}
      </InputAdornment>
    );
  }

  props["InputProps"] = { ...temp };
  if (hide) return <></>;
  /* <Grid
          size={ { xs: 12, md: Number(question?.size) } }
          alignSelf="flex-end"
          sx={ { textAlign: "center", px: 2, py: 1 } }
        ></Grid> */
  return (
    <Grid
      size={{ xs: 12, md: Number(compSize ?? 12) }}
      alignSelf="flex-end"
      // sx={ { textAlign: "center", px: 2, py: 1 } }
    >
      <Controller
        name={name}
        control={control}
        rules={validate}
        render={({ field }) => {
          const hasError = !!errors;
          const errorMessage = errors?.message;
          const isPasswordField = type === "password";

          let inputProps = { ...(props.InputProps || {}) };

          // Handle password visibility toggle
          if (isPasswordField) {
            inputProps.endAdornment = (
              <>
                {inputProps.endAdornment}
                {hasError && errorMessage && (
                  <Tooltip
                    title={ParseErrorMessage({ error: errorMessage })}
                    arrow
                    placement="top-end"
                    slots={{
                      transition: Zoom,
                    }}
                    slotProps={{
                      transition: { timeout: 200 },
                    }}
                    PopperProps={{
                      disablePortal: true,
                      sx: { zIndex: 7600 },
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          zIndex: 7600,
                          bgcolor: "#fff8f8",
                          color: "#d32f2f",
                          border: "1.5px solid #d32f2f",
                          fontSize: "12px",
                          px: 1,
                          py: 0.75,
                          borderRadius: 1,
                          boxShadow: 2,
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#fff8f8",
                          filter: "drop-shadow(0 0 1.5px #d32f2f)",
                        },
                      },
                    }}
                  >
                    <IconButton size="small" aria-label="error info">
                      <InfoOutlinedIcon color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            );
          } else {
            inputProps.endAdornment = (
              <>
                {inputProps.endAdornment}
                {hasError && errorMessage && (
                  <Tooltip
                    title={ParseErrorMessage({ error: errorMessage })}
                    arrow
                    placement="top-end"
                    slots={{
                      transition: Zoom,
                    }}
                    slotProps={{
                      transition: { timeout: 200 },
                    }}
                    PopperProps={{
                      disablePortal: true,
                      sx: { zIndex: 7600 },
                    }}
                    componentsProps={{
                      tooltip: {
                        sx: {
                          zIndex: 7600,
                          bgcolor: "#fff8f8",
                          color: "#d32f2f",
                          border: "1.5px solid #d32f2f",
                          fontSize: "12px",
                          px: 1,
                          py: 0.75,
                          borderRadius: 1,
                          boxShadow: 2,
                        },
                      },
                      arrow: {
                        sx: {
                          color: "#fff8f8",
                          filter: "drop-shadow(0 0 1.5px #d32f2f)",
                        },
                      },
                    }}
                  >
                    <IconButton size="small" aria-label="error info">
                      <InfoOutlinedIcon color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </>
            );
          }

          if (prefix && prefix !== "") {
            inputProps.startAdornment = (
              <InputAdornment position="start">{prefix}</InputAdornment>
            );
          }

          return (
            <>
              {surveyLabel}
              {labelText && (
                <Page.Text sx={{ fontWeight: 500, color: "#555" }}>
                  {labelText}{" "}
                  {required && (
                    <span style={{ color: "red", fontWeight: 600 }}>*</span>
                  )}
                </Page.Text>
              )}
              <InputTextField
                {...props}
                {...field}
                value={field.value ?? ""}
                type={
                  type === "password" ? (masked ? "password" : "text") : type
                }
                label={
                  label === undefined ? undefined : validate?.required ? (
                    <RequiredLabel label={label} />
                  ) : (
                    label
                  )
                }
                fullWidth
                sx={{
                  ...sx,
                  "& .MuiInputAdornment-root": {
                    opacity: 0.7,
                  },
                }}
                error={hasError}
                InputProps={inputProps}
                onChange={(e) => {
                  field.onChange(e);
                  // Update password state for strength meter
                  if (isPasswordField) {
                    setPassword(e.target.value);
                  }
                }}
              />
              {isPasswordField && (
                <PasswordStrengthMeter
                  passwordStrength={passwordStrength}
                  showStrength={showStrength}
                />
              )}
            </>
          );
        }}
      />
    </Grid>
  );
}
