import React from "react";

export default function FlagAndCountryCode({ cn, showLabel = true, title }) {
  return (
    <div style={{ display: "flex" }}>
      <div className="flagged-code">
        <img
          title={title}
          src={`/images/flags/${cn.toLowerCase()}.svg`}
          alt={`${cn} flag`}
        />
        {showLabel && (
          <span style={{ display: "flex", alignItems: "center" }}>{cn}</span>
        )}
      </div>
    </div>
  );
}
