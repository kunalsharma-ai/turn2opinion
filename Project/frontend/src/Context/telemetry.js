"use client"
import { createContext, useContext } from "react";
import { telemetry } from "@/util";

const TelemetryContext = createContext();

export function TelemetryProvider({ children }) {
  return <TelemetryContext.Provider value={ telemetry }>{ children }</TelemetryContext.Provider>
}

export function useTelemetry() {
  return useContext(TelemetryContext);
}