import React from "react";

import { MemberProvider } from "./member";
import { TelemetryProvider } from "./telemetry";
import { QueryProvider } from "./query";

export { useQuery, QueryProvider } from "./query";
export { useTelemetry, TelemetryProvider } from "./telemetry";
export { useMember, MemberProvider } from "./member";

export function ContextProviders({ children }) {
  return (
    <React.Suspense fallback={<></>}>
      <MemberProvider>
        <TelemetryProvider>
          <QueryProvider>{children}</QueryProvider>
        </TelemetryProvider>
      </MemberProvider>
    </React.Suspense>
  );
}
