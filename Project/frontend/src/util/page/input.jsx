"use client";
import {
  InputTextField,
  Control,
  Label,
  ControlLabel,
  Checkbox,
  Password,
} from "./";
import { InputAdornment, IconButton } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function input(attr) {
  if (attr.control)
    return (
      <Controller
        name={attr?.name}
        control={attr?.control}
        render={({ fld }) => <InputField {...fld} {...attr} name={undefined} />}
      />
    );
  else return <InputField {...attr} />;
}
function InputField(attr) {
  const [slotProps, setSlotProps] = React.useState(undefined);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  React.useEffect(() => {
    // console.log(attr)

    if (!attr.hasAction) {
      setSlotProps(undefined);
      return;
    }
    setSlotProps({
      input: {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              variant="contained"
              onClick={attr.onAction}
              sx={{
                height: "32px",
                width: "32px",
                px: 2,
                "&:hover": {
                  boxShadow: "none",
                },
              }}
            >
              {attr.actionBtn}
            </IconButton>
          </InputAdornment>
        ),
      },
      root: {},
    });
  }, [attr.hasAction, attr.actionBtn]);

  switch (attr.type ?? "text") {
    case "checkbox":
      return (
        <ControlLabel
          control={
            <Checkbox
              name={attr.name}
              value={attr.value}
              color="primary"
              size="small"
            />
          }
          label={attr.label}
        />
      );
      break;
    case "password":
      // console.log("Loading password")
      return (
        <Control>
          {/* <Label htmlFor={attr.id??attr.name}>{attr.label}</Label> */}
          <Password
            id={attr.id ?? attr.name}
            name={attr.name}
            required={attr.required}
            autoFocus={attr.autoFocus}
            unmaskable={attr.unmaskable}
            strengthMeter={attr.strengthMeter}
            timeout={attr.timeout}
            onTimeout={attr.onTimeout}
            match={attr.match}
            {...attr}
          />
        </Control>
      );
      break;
      // case "date":
      //   return <DatePicker
      //     id={ attr.id ?? attr.name }
      //     name={ attr.name }
      //     required={ attr.required }
      //     autoFocus={ attr.autoFocus }
      //     { ...attr }
      //   />;
      break;
    default:
      return (
        <Control>
          {/* <Label htmlFor={ attr.id ?? attr.name }>{ attr.label }</Label> */}

          <InputTextField
            fullWidth={attr.fullWidth}
            id={attr.id ?? attr.name}
            type={attr.type ?? "text"}
            name={attr.name}
            placeholder={attr.placeholder}
            autoComplete={attr.autoComplete}
            variant={attr.variant}
            required={attr.required}
            autoFocus={attr.autoFocus}
            InputProps={attr.InputProps}
            onFocus={attr.onFocus}
            slotProps={slotProps}
            error={hasError}
            helperText={attr.helperText}
            inputProps={attr.inputProps}
            sx={attr.sx}
            {...attr}
            // label={undefined}
          />
        </Control>
      );
      break;
  }
}
