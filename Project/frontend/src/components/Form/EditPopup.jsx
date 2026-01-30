"use client";
import React from "react";
import { Popper, Paper, ClickAwayListener, Box, Divider } from "@mui/material";
import { Form } from "@/components";
import { Page } from "@/util";

export default function EditPopup({
  open,
  anchorEl,
  onClose,
  title,
  form,
  onSubmit,
  fields = [],
  popupMode,
}) {
  const { handleSubmit, control } = form;
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);
  return (
    <>
      {/* Background Blur Overlay */}
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(244, 244, 244, 0.1)",
            backdropFilter: "blur(1px)",
            WebkitBackdropFilter: "blur(1px)",
            zIndex: 1400,
          }}
          onClick={onClose}
        />
      )}

      {/* Popper */}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        modifiers={[
          {
            name: "offset",
            options: {
              offset: popupMode === "add" ? [100, 10] : [0, 10],
            },
          },
        ]}
        style={{ zIndex: 1401 }}
      >
        <ClickAwayListener onClickAway={onClose}>
          <Paper
            sx={{
              p: 2,
              minWidth: 280,
              borderRadius: 2,
              boxShadow: 24,
              bgcolor: "#ffffff90",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <Page.Text sx={{ mb: 1, fontSize: "14px", fontWeight: "bold" }}>
              {title}
            </Page.Text>
            <Divider sx={{ mb: 3.5 }} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: 15 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {fields.map((field) => (
                  <Form.Input
                    key={field.name}
                    {...field.validations}
                    name={field.name}
                    label={field.label}
                    control={control}
                    type={field.type || "text"}
                  />
                ))}
                {popupMode === "add" && (
                  <Form.Checkbox
                    name="sortOrder"
                    label="Set as Favorite"
                    control={control}
                    value={1}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Page.MuiButton
                  size="small"
                  variant="contained"
                  onClick={onClose}
                  sx={{
                    borderRadius: 2,
                    height: "30px",
                    background:
                      "linear-gradient(to top right, #ff512f, #dd2476)",
                  }}
                >
                  Cancel
                </Page.MuiButton>
                <Page.MuiButton
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    height: "30px",
                    background:
                      "linear-gradient(to top right,rgba(0, 162, 199),rgb(0, 78, 187));",
                    "&:disabled": {
                      background: "linear-gradient(to left,#b0d4f0,#d3e9f9)",
                      color: "whitesmoke",
                    },
                  }}
                >
                  Save
                </Page.MuiButton>
              </Box>
            </form>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
