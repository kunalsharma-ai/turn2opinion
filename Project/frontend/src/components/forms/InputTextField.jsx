import React from "react";
import TextField from "@mui/material/TextField";

const FormTextField = React.forwardRef((props, ref) => {
  const {
    InputProps,
    inputProps,
    inputSX,
    error,
    helperText,
    id,
    type,
    name,
    label,
    placeholder,
    autoComplete,
    autoFocus,
    required,
    fullWidth,
    select,
    variant,
    color,
    sx,
    defaultValue,
    onChange,
    children,
    InputLabelProps,
    multiline,
    maxRows,
    disabled,
    ...rest
  } = props;

  return (
    <TextField
      inputRef={ref} // Forward the ref to the input element
      InputProps={{
        ...InputProps,
        sx: {
          backgroundColor: "white",
          ...InputProps?.sx,
        },
      }}
      inputProps={{
        ...inputProps,
        autoComplete: autoComplete || inputProps?.autoComplete || "off", // Respect passed autoComplete or inputProps
      }}
      InputLabelProps={InputLabelProps}
      error={error}
      helperText={helperText}
      id={id}
      {...(multiline ? {} : { type })}
      name={name}
      label={label}
      placeholder={placeholder}
      autoFocus={autoFocus}
      required={required}
      fullWidth={fullWidth}
      select={multiline ? false : select}
      variant={variant}
      color={color}
      sx={sx ?? inputSX}
      defaultValue={defaultValue}
      onChange={onChange}
      maxRows={maxRows}
      multiline={multiline}
      size="small"
      disabled={disabled}
      {...rest} // Spread any additional props
    >
      {children}
    </TextField>
  );
});

FormTextField.displayName = "FormTextField";

export default FormTextField;
