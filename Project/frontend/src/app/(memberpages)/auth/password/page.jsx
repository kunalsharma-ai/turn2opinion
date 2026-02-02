"use client";
import dynamic from "next/dynamic";

const PasswordPage = dynamic(
  () => import("./PasswordPage"),
  { ssr: false }
);

export default PasswordPage;
