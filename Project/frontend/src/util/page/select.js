"use client";
import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectInput = ({
  label,
  value,
  onChange,
  onClick,
  name,
  options,
  size = "small",
  fullWidth = true,
  sx = {},
  slotProps = {},
  defaultValue,
}) => {
  const [val, setVal] = React.useState(defaultValue ?? value ?? "");
  React.useEffect(() => {
    setVal(defaultValue ?? value ?? "");
  }, [defaultValue, value]);
  const labelId = `${name || label.toLowerCase().replace(/\s+/g, "-")}-label`;

  return (
    <FormControl size={size} fullWidth={fullWidth} sx={sx}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        labelId={labelId}
        label={label}
        value={val}
        onChange={onChange}
        onClick={onClick}
        name={name}
        size={size}
        fullWidth
        slotProps={{
          ...slotProps,
          paper: {
            sx: {
              zIndex: 15000,
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value} sx={{ fontWeight: 500 }}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
