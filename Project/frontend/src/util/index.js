export * as Page from "./page";

export { default as api } from "./api.js";
export { default as loadPDF } from "./loadPDF";
export { default as submitWithAjax } from "./submitWithAjax";
export { default as checkPasswordStrength } from "./checkPasswordStrength";
export { default as inputKeyboardShortcut } from "./inputKeyboardShortcut";
export { default as isAllowed } from "./isAllowed";
export { default as telemetry } from "./getSecurityInfo";
export { default as getCurrency } from "./getCurrency";
export {default as getOptions} from "./getOptions";
export function mutate(data) {
  return JSON.parse(JSON.stringify(data));
}
