"use client";
import React from "react";
export default function useCustomState(value = {}) {
  let [val, setVal] = React.useState(value);
  function update(data){
    setVal(data)
  }
  return {
    value: val,
    update
  }
}
