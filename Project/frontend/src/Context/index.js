"use client"
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { MemberProvider } from "./member";
import { TelemetryProvider } from "./telemetry";
import { QueryProvider } from "./query";


export { useQuery, QueryProvider } from "./query";
export { useTelemetry, TelemetryProvider } from "./telemetry";
export { useMember, MemberProvider } from "./member";

export function ContextProviders({ children }) {
  const queryClient = new QueryClient();
  return (
    <React.Suspense fallback={<></>}>
      <QueryClientProvider client={queryClient}>
      <MemberProvider>
        <TelemetryProvider>
          <QueryProvider>{children}</QueryProvider>
        </TelemetryProvider>
      </MemberProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
}
