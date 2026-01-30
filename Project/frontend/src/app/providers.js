"use client";

import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";

import theme from "@/theme/theme";
import { MemberProvider, QueryProvider } from "@/Context";
import { TelemetryProvider } from "@/Context/telemetry";
import LoadingOverlay from "@/componentsMHO/LoadingOverlay";
import "@/lib/enhancements";

export default function Providers({ children }) {
  return (
    <MemberProvider>
      <TelemetryProvider>
        <QueryProvider>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppRouterCacheProvider>
        </QueryProvider>
      </TelemetryProvider>
    </MemberProvider>
  );
}
