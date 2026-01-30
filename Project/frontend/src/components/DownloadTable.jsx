"use client";
import React from "react";
import "@/lib/enhancements.js";

function sluggify({ data }) {
  if (!data) return;
  return data
    .trim() // Remove leading/trailing whitespace
    .toLowerCase() // Convert to lowercase for consistency
    .replace(/[^a-z0-9\s]/g, "-") // Replace special characters with dash
    .replace(/\s+/g, "-") // Replace whitespace sequences with dash
    .replace(/-+/g, "-") // Collapse multiple consecutive dashes
    .replace(/^-|-$/g, ""); // Remove leading/trailing dashes
}

export function jsxToText(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") {
    // Clean string of invisible Unicode characters
    return value
      .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
      .replace(/ /g, " ") // Replace non-breaking space with regular space
      .trim();
  }
  if (typeof value === "number") return value.toString();
  if (typeof value === "boolean") return value.toString();

  if (React.isValidElement(value)) {
    try {
      const extractTextFromElement = (element) => {
        if (typeof element === "string" || typeof element === "number") {
          return element.toString();
        }

        if (React.isValidElement(element)) {
          const { children } = element.props || {};

          if (!children) return "";

          if (typeof children === "string" || typeof children === "number") {
            return children.toString();
          }

          if (Array.isArray(children)) {
            return children.map(extractTextFromElement).join(" ");
          }

          return extractTextFromElement(children);
        }

        return "";
      };

      const textContent = extractTextFromElement(value);

      return textContent
        .replace(/[\u200B-\u200D\uFEFF]/g, "") // Remove zero-width characters
        .replace(/ /g, " ") // Replace non-breaking space with regular space
        .replace(/\s+/g, " ") // Replace multiple whitespace with single space
        .trim();
    } catch (error) {
      console.warn("Failed to convert JSX to text:", error);
      return "";
    }
  }

  // Handle arrays (in case of multiple JSX elements)
  if (Array.isArray(value)) {
    return value.map(jsxToText).filter(Boolean).join(" ");
  }

  // Handle objects with toString method
  if (
    typeof value === "object" &&
    value.toString !== Object.prototype.toString
  ) {
    return value.toString();
  }

  return "";
}

export default function DownloadTable({ info, title, replaceChars }) {
  if (!info || !info.length) return;
  if (!title) title = "Sampledge-Downloads";

  const csvRows = info
    .map((row) =>
      row
        .map((val) => {
          const textValue = jsxToText(val);
          // Escape quotes and handle comma-containing values
          const escapedValue = textValue.replace(/"/g, '""');
          const finalValue =
            textValue.includes(",") ||
            textValue.includes('"') ||
            textValue.includes("\n")
              ? `"${escapedValue}"`
              : escapedValue;
          return finalValue.replace(replaceChars ?? /[\r\n]+/g, " ");
        })
        .join(",")
    )
    .join("\n");

  // Create blob without BOM - let the browser handle encoding
  const blob = new Blob([csvRows], {
    type: "text/csv;charset=utf-8;",
  });

  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${sluggify(title)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
