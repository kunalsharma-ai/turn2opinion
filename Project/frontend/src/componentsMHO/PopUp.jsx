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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import SectionTitle from "@/components/SectionTitle";

export default function PopUp({ hideTitle = false, sx, ...attr }) {
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
      slots={{ transition: Fade }}
      slotProps={{
        transition: {
          onExited: () => {
            if (attr?.onExited) {
              attr.onExited();
            }
          },
        },
      }}
      maxWidth={attr.maxWidth ?? "lg"}
      fullWidth
      sx={{
        zIndex: 3300,
        boxShadow: 24,
        overflowY: "auto",
        border: "1px solid var(--primary)",

        borderRadius: attr.noBorder ? 0 : 4,
        ...attr?.DialogSx,
      }}
      BackdropProps={{
        sx: {
          backgroundColor: attr.backgroundColor
            ? attr.backgroundColor
            : "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(5px)",
          ...sx,
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: attr.noBorder ? 0 : 2,
          maxHeight: attr.maxHeight ?? "95vh",
        },
      }}
    >
      {!hideTitle && (
        <DialogTitle
          sx={{
            m: 0,
            p: 0,
          }}
        >
          {/* <Box
            sx={{
              py: 1.2,
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "18px",
              fontWeight: "bold",
              borderBottom: `1px solid rgba(51, 169, 202, 0.4)`,
              color: attr.color ?? "black",
              background:
                attr.background ??
                "linear-gradient(-45deg, rgb(191, 226, 247), #e4e5e6, rgb(191, 226, 247))",
              // "linear-gradient(90deg, #e3ffe7 0%, #d9e7ff 100%)",
            }}
          > */}
          <SectionTitle
            title={attr?.title}
            sx={{
              justifyContent: "space-between",
              background: "var(--secondary)",
              color: "white",
            }}
          >
            <Box>
              {attr.onEdit && (
                <IconButton
                  aria-label="Edit"
                  onClick={attr.onEdit}
                  sx={{
                    color: attr.color ?? "white",
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
                sx={{
                  color: attr.color ?? "white",
                  "&:hover": { color: "error.light" },
                }}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </SectionTitle>
          {/* </Box> */}
        </DialogTitle>
      )}
      <DialogContent
        sx={{
          minHeight: attr.minHeight ?? "10vh",
          position: "relative",
          p: 0,
          m: 0,
        }}
      >
        <Box
          sx={{
            bgcolor: "#f1f4f9",
          }}
        >
          {children}
        </Box>

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
