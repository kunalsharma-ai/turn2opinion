import React from "react";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function HeaderIconSelect({
  options = [],
  value,
  onChange,
  tooltip = "",
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (val) => {
    if (onChange) onChange({ target: { value: val } });
    handleClose();
  };

  return (
    <>
      <Tooltip title={tooltip} placement="top">
        <IconButton
          aria-controls={open ? "header-select-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpen}
          sx={{
            p: 0.5,
          }}
        >
          <KeyboardArrowDownIcon sx={{ color: "white", fontSize: 24 }} />
        </IconButton>
      </Tooltip>

      <Menu
        id="header-select-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { minWidth: 80, zIndex: 15000 } }}
      >
        {options.map((opt) => (
          <MenuItem
            sx={{ fontWeight: "bold" }}
            key={String(opt.value ?? opt.label)}
            selected={opt.value === value}
            onClick={() => handleSelect(opt.value)}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
