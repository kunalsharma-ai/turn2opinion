"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/util";
const MemberContext = createContext();
function notLoggedIn(pathname, router) {
  if (typeof pathname !== "string") return;
  if (pathname.startsWith("/member")) router.replace("/");
  if (pathname.startsWith("/admin")) router.replace("/");

}
function createEvent(name, detail) {
  if (typeof document === "undefined") return console.log("No Document");
  if (!name) return console.log("Event ka naam required hai")
  document.dispatchEvent(new CustomEvent(name, { detail }));
}

async function loadUserInfo() {
  let temp = await api.get(`/api/v1/me`);
  if (
    temp.status === "error" &&
    temp.message.toLowerCase() === "token expired"
  ) {
    window.localStorage.removeItem("token");
    setMe(null);
    throw new Error("token expired");
  }
  return temp.data
}
export function MemberProvider({ children }) {
  const [reload, setReload] = useState(1);
  const [me, setMe] = useState(null);
  const [router, pathname] = [useRouter(), usePathname()];
  function Reload() {
    setReload(reload + 1)
  }
  function update(data) {
    updateMe(data)
  }
  function updateMe(data) {
    setMe({
      ...data,
      Reload,
      update
    })
  }
  // useEffect(() => {
  //   if (typeof window === "undefined")
  //     return console.error("Window not loaded yet");
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     setMe(null)
  //     return notLoggedIn(pathname, router);
  //   }
  //   loadUserInfo()
  //     .then((resp) => {
  //       if(pathname.startsWith("/admin") && !["root","admin"].includes(resp.role)){
  //           router.replace("/")
  //       }
  //       updateMe(resp)
  //     })
  //     .catch((err) => {
  //       notLoggedIn(pathname, router);
  //     });
  // }, [reload, pathname]);
  return <MemberContext.Provider value={ me }>{ children }</MemberContext.Provider>;
}

export function useMember() {
  return useContext(MemberContext);
}
//*/