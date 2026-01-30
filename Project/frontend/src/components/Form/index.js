"use client";
import dynamic from "next/dynamic";

const TextEditor = dynamic(() => import("./TextEditor"), {
  ssr: false,
});
export { default as Checkbox } from "./Checkbox";
export { default as Input } from "./Input";
export { default as Phone } from "./Phone";
export { default as Date } from "./Date";

export { default as Select } from "./Select";
export { default as Text } from "./Text";
export { default as Upload } from "./Upload";
export { default as Active } from "./Active";
// export { default as Field } from "./Field";
export { default as Switch } from "./Switch";
export { default as SwitchWithText } from "./SwitchWithText";
export { default as Radio } from "./Radio";
export { default as DateRangeSelector } from "./DateRange";

export { TextEditor };
