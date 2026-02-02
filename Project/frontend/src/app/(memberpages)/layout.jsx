import React from "react";
import { ContextProviders } from "@/Context";
export default function layout({ children }) {
    return (<ContextProviders>{ children }</ContextProviders>)
}