import React from "react";
import { Select, MenuItem, Chip } from "@mui/material";

const Dropdown = ({
  options = [], // label, value, bgcolor
  onChange,
  backgroundColor = "black",
  value = "",
  disabled = false,
}) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event, event.target.value);
    }
  };
  const [option, setOption] = React.useState({});
  React.useEffect(() => {
    setOption(options.find((opt) => opt.value === value));
  }, [options, value]);
  if (disabled)
    return (
      <Chip
        label={option?.label || ""}
        size="small"
        sx={{
          color: "white",
          bgcolor: option?.bgcolor || option?.color,
          fontSize: "12px",
          fontWeight: "bold",
          height: 22,
          px: 1,
          mr: 1,
          "&:hover": {
            color: "white",
            bgcolor: option?.bgcolor || option?.color,
          },
        }}
      />
    );

  return (
    <Select
      disabled={disabled}
      value={value}
      onChange={handleChange}
      notched={false}
      size="small"
      MenuProps={{
        PaperProps: {
          sx: {
            padding: 0,
            marginTop: 0.5,
            borderRadius: 2,
            boxShadow: "none",
            border: "none",
            minWidth: "90px",
            "& .MuiList-root": {
              padding: 0,
            },
          },
        },
      }}
      sx={{
        minWidth: "90px",
        backgroundColor: () => {
          let option = options.find((opt) => opt.value === value);
          if (!option) return "";
          return option.bgcolor || option.color || "black";
        },
        color: "white",
        textShadow: "1px 1px 1px rgba(0, 0, 0, 0.2)",
        "& .MuiSelect-icon": {
          color: "white",
        },
        "& .MuiSelect-select": {
          padding: "2px 10px",
          fontSize: "12px !important",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
        "& .Mui-disabled": {
          color: "white !important",
          WebkitTextFillColor: "white !important",
        },
        "& .MuiSelect-select.Mui-disabled": {
          color: "white !important",
          WebkitTextFillColor: "white !important",
        },
        "& .MuiSelect-icon.Mui-disabled": {
          opacity: 0.4,
        },
        height: "24px",
      }}
    >
      {options.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
          sx={{
            color: "white",
            padding: "2px 10px",
            fontSize: "12px !important",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `${
              option.bgcolor || option.color || backgroundColor
            } !important`,

            minHeight: "24px",
            "&:hover, &.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: `${
                option.bgcolor || option.color || backgroundColor
              } !important`,
            },
          }}
        >
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default Dropdown;
