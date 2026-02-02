"use client"
import React from "react";
import AdminHeader from "./components/AdminHeader";
import AdminSidebar from "./components/AdminSidebar";
import { useMember } from "@/Context";


function layout({ children }) {
  const member=useMember();
  
  return (
    <div>
      <AdminHeader />
      <AdminSidebar>
        <main>{ children }</main>
      </AdminSidebar>
    </div>
  );
}

export default layout;
