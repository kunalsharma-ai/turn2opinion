import React from "react";
import { Page } from "@/util";
import { Grid, Popper, Paper } from "@mui/material";

const PopperForm = ({
  anchorEl,
  setAnchorEl: onClose,
  title,
  children,
  onSubmit,
}) => {
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && anchorEl) {
        onClose(null);
      }
    };

    if (anchorEl) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [anchorEl, onClose]);
  return (
    <>
      {anchorEl && (
        <Page.Box
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
          onMouseDown={() => {
            if (onClose) onClose(null);
          }}
        />
      )}
      <Popper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        style={{ zIndex: 9000 }}
        placement="bottom"
      >
        <Paper
          component="form"
          onSubmit={onSubmit}
          sx={{
            p: 2,
            width: 320,
            borderRadius: 2,
            boxShadow: 24,
            bgcolor: "#ffffff90",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Page.Text sx={{ fontWeight: "bold" }}>{title}</Page.Text>
          <Page.Divider sx={{ my: 1 }} />
          <Grid size={12} spacing={1.5} container mb={2}>
            {children}
          </Grid>
          <Page.Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 1,
            }}
          >
            <Page.MuiButton
              variant="contained"
              sx={{
                borderRadius: 2,
                height: "30px",
                background: "linear-gradient(to top right, #ff512f, #dd2476)",
              }}
              onClick={() => {
                try {
                  if (onClose) onClose(null);
                } catch (error) {
                  console.log(error);
                  console.log([onClose]);
                }
              }}
            >
              Cancel
            </Page.MuiButton>
            <Page.MuiButton
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
              variant="contained"
              type="submit"
            >
              Update
            </Page.MuiButton>
          </Page.Box>
        </Paper>
      </Popper>
    </>
  );
};
export default PopperForm;
