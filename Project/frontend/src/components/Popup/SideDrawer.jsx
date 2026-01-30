"use client";
import React from "react";
import { Drawer, IconButton, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Page } from "@/util";

export default function SideDrawer({
  open,
  onClose,
  onEdit,
  anchor = "left",
  children,
  title = "term",
  hideTitleBar = false,
  width = 900,
}) {
  return (
    <Drawer
      anchor={anchor}
      open={open}
      onClose={() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
        onClose();
      }}
      sx={{ zIndex: 7000 }}
      ModalProps={{
        BackdropProps: {
          sx: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(1px)",
            pointerEvents: "none",
          },
        },
      }}
    >
      <Page.Box
        id="drawer-container"
        sx={{
          width: { xs: "98vw", lg: width },
          height: "100%",
          backgroundColor: "#e6f3ff",
          p: 2,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <Page.Box
          sx={{ bgcolor: "white", p: hideTitleBar ? 0 : 2, borderRadius: 2 }}
        >
          {!hideTitleBar && (
            <Grid
              container
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
                pl: 2,
                flexWrap: "nowrap",
              }}
            >
              <Page.Text
                sx={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#007acc",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  flex: 1,
                }}
              >
                {title}
              </Page.Text>

              <Page.Box sx={{ display: "flex", gap: 1 }}>
                {onEdit && (
                  <IconButton onClick={onEdit} sx={{ color: "#007acc" }}>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton onClick={onClose} sx={{ color: "#007acc" }}>
                  <CloseIcon />
                </IconButton>
              </Page.Box>
            </Grid>
          )}
          {children}
        </Page.Box>
      </Page.Box>
    </Drawer>
  );
}
