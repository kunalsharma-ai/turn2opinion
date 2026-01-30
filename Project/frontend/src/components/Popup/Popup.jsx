"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  CircularProgress,
  Box,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import { Page } from "@/util";
import { SectionTitle } from "..";

export default function Popup(attr) {
  const [open, setOpen] = React.useState(attr.open ?? false);
  const { title, children, loading } = attr;
  React.useEffect(() => {
    if (attr.open !== undefined) {
      setOpen(attr.open);
    }
  }, [attr.open]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        if (attr.onClose) attr.onClose();
        else setOpen(false);
      }}
      // slots={{ transition: Fade }}
      // slotProps={{
      //   transition: {
      //     onExited: () => attr?.onExited(),
      //   },
      // }}
      maxWidth={attr.maxWidth ?? "lg"}
      fullWidth
      sx={{
        zIndex: 3300,
        boxShadow: 24,
        overflowY: "auto",
      }}
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(1px)",
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 0,
        }}
      >
        <SectionTitle
          title={title}
          sx={{
            px: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          <Page.Box>
            {attr.onEdit && (
              <IconButton
                aria-label="Edit"
                onClick={attr.onEdit}
                sx={{
                  color: "grey",
                  mr: 2,
                  "&:hover": { color: "info.light" },
                }}
                size="small"
              >
                <EditIcon />
              </IconButton>
            )}
            {attr.onDownload && (
              <IconButton
                aria-label="Download"
                onClick={attr.onDownload}
                sx={{
                  color: "grey",
                  mr: 2,
                  "&:hover": { color: "success.light" },
                }}
                size="small"
              >
                <DownloadIcon />
              </IconButton>
            )}
            <IconButton
              aria-label="close"
              onClick={() => {
                if (attr.onClose) attr.onClose();
                else setOpen(false);
              }}
              sx={{ color: "grey", "&:hover": { color: "error.light" } }}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Page.Box>
        </SectionTitle>
      </DialogTitle>
      <DialogContent
        sx={{
          maxHeight: "80vh",
          minHeight: attr.minHeight ?? "10vh",
          position: "relative",
          p: 0,
          m: 0,
        }}
      >
        <Box sx={{ p: 1 }}>{children}</Box>

        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(255,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
