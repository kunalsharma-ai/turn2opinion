import React from "react";
import { IconButton, Popover } from "@mui/material";

import { Check as CheckIcon, Clear as ClearIcon } from "@mui/icons-material";
import { Page } from "@/util";
function Confirm({
  onClose,
  onConfirm,
  position,
  message = "Confirm Change?",
}) {
  console.log({ position });

  return (
    <Popover
      open={Boolean(position)}
      anchorEl={position}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      PaperProps={{
        sx: {
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          borderRadius: "10px",
        },
      }}
    >
      <Page.Box sx={{ mr: 1.5, fontWeight: 500 }}>{message}</Page.Box>

      <IconButton
        color="success"
        size="small"
        onClick={(e) => {
          e.preventDefault();
          onConfirm(e);
        }}
        sx={{ "&:hover": { bgcolor: "success.light", color: "white" } }}
      >
        <CheckIcon fontSize="small" />
      </IconButton>

      <IconButton
        color="error"
        size="small"
        onClick={onClose}
        sx={{
          ml: 0.5,
          "&:hover": { bgcolor: "error.light", color: "white" },
        }}
      >
        <ClearIcon fontSize="small" />
      </IconButton>
    </Popover>
  );
}
export default Confirm;
