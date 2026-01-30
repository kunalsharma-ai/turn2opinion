
import React from "react";
import { Page } from "@/util";
import { CircularProgress } from "@mui/material";

function LoadingOverlay({ zIndex = 9998 }) {
  return (
    <Page.Box
      sx={{
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(15px)",
        zIndex: zIndex,
      }}
    >
      <Page.Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: zIndex + 1,
          width: "300px",
        }}
      >
        <Page.Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <CircularProgress enableTrackSlot size={120} color="primary"/>
        </Page.Box>
      </Page.Box>
    </Page.Box>
  );
}

export default LoadingOverlay;
