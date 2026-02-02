"use client";
import React from "react";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/admin/dashboard");
  }, []);
  return <></>;
}

export default page;
