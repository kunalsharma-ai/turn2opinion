import React from "react";

export default function FlagAndCountryCode({ cn }) {
  return (
    <div style={{ display: "flex" }}>
      <div className="flagged-code">
        <img src={`/images/flags/${cn.toLowerCase()}.svg`} alt={`${cn} flag`} />
        <span style={{ display: "flex", alignItems: "center" }}>{cn}</span>
      </div>
    </div>
  );
}
