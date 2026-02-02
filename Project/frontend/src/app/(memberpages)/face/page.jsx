"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const runWasm = async () => {
      // ✅ Dynamically load wasm_exec.js
      await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "/wasm_exec.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

      // ✅ Now Go is defined
      const go = new Go();
      const wasmResponse = await fetch("/main.wasm");
      const wasmBuffer = await wasmResponse.arrayBuffer();
      const { instance } = await WebAssembly.instantiate(wasmBuffer, go.importObject);
      go.run(instance);

      // ✅ Use your exported Go function
      console.log(formatTime(9876543)); // → "02:44:36.543"
    };

    runWasm();
  }, []);

  return <div className="p-6 text-xl">Go WASM Time Formatter ⏱️</div>;
}
