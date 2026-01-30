import React from "react";

export const RequiredLabel = ({ label }) => {
  return [null, undefined, ""].includes(label) ? (
    <></>
  ) : (
    <>
      {label} <span style={{ color: "red" }}>*</span>
    </>
  );
};
export default RequiredLabel;
