"use client";
import React from "react";
import {
  Popover,
  Grid,
  Checkbox,
  FormControlLabel,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Page } from "@/util";

function DeleteWithPassword({
  anchorEl,
  onConfirm,
  onClose,
  title = "Confirm Delete?",
  message = "Do you want to delete this? Enter your password to confirm",
  btnLabel = "Delete",
  errorMessage = null,
  ...attr
}) {
  const [anchorElement, setAnchorElement] = React.useState(null);
  const [password, setPassword] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const isConfirmEnabled = (() => {
    if (password.trim() === "") return false;
    if (!attr?.askRemarks) return true;
    if (remark.trim() === "") return false;
    return true;
  })();
  React.useEffect(() => {
    // if (!anchorEl) return;
    setAnchorElement(anchorEl);
  }, [anchorEl]);
  function Close(e) {
    setAnchorElement(null);
    setPassword("");
    setRemark("");
    if (onClose) onClose(e);
  }
  const open = Boolean(anchorElement);
  return (
    <>
      {open && (
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
          onClick={Close}
        />
      )}
      <Popover
        open={open}
        anchorEl={anchorElement}
        onClose={Close}
        disableEnforceFocus
        disableAutoFocus
        anchorOrigin={{ vertical: "bottom", horizontal: "bottom" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        style={{ zIndex: 1401 }}
      >
        <Grid
          container
          size={12}
          direction="column"
          sx={{
            p: 2,
            minWidth: "300px",
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Page.Text
              sx={{
                fontWeight: "bold",
                maxWidth: { xs: "300px", md: "500px" },
              }}
            >
              {title}
            </Page.Text>
            <IconButton onClick={Close}>
              <CloseIcon sx={{ color: "#f24f4f" }} />
            </IconButton>
          </Grid>
          <Page.Text
            sx={{
              mt: 1,
              maxWidth: { xs: "300px", md: "500px" },
              textAlign: "justify",
            }}
          >
            {message}
          </Page.Text>
          <Grid container sx={{ pt: 1, pb: 0.5, gap: 1.5 }}>
            <Page.InputTextField
              fullWidth
              label="Enter Password"
              type="password"
              size="small"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {attr.askRemarks && (
              <Page.InputTextField
                fullWidth
                label="Remark"
                size="small"
                multiline
                rows={4}
                value={remark}
                onChange={(event) => setRemark(event.target.value)}
              />
            )}
          </Grid>
          <Page.Box sx={{ pb: 2 }}>
            {errorMessage && (
              <Alert
                severity="error"
                sx={{
                  py: 0,
                  height: "25px",
                  width: "100%",
                  "& .MuiAlert-icon": {
                    fontSize: "14px",
                    mr: 0.5,
                    alignItems: "center",
                  },
                  "& .MuiAlert-message": {
                    p: 0,
                    m: 0,
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <Page.Text
                  sx={{
                    fontSize: "12px",
                    p: 0,
                    m: 0,
                    lineHeight: "1",
                    width: "100%",
                  }}
                >
                  {errorMessage}
                </Page.Text>
              </Alert>
            )}
          </Page.Box>
          <Grid container size={12} justifyContent="flex-end" gap={0.5}>
            {/* <Page.MuiButton
              variant="outlined"
              onClick={Close}
              sx={{
                height: "26px",
              }}
            >
              Cancel
            </Page.MuiButton> */}
            <Page.MuiButton
              disabled={!isConfirmEnabled}
              color="error"
              onClick={async (e) => {
                await onConfirm(password, e, remark);
                setPassword("");
                setRemark("");
              }}
              variant="contained"
              sx={{
                fontWeight: "bold",
                height: "26px",
                ml: 1,
                "&:hover": { bgcolor: "error.light", color: "white" },
              }}
            >
              {btnLabel}
            </Page.MuiButton>
          </Grid>
        </Grid>
      </Popover>
    </>
  );
}

export default DeleteWithPassword;
