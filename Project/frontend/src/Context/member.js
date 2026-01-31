"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { api } from "@/util";
const MemberContext = createContext();
function notLoggedIn(pathname, router) {
  if (typeof pathname !== "string") return;
  return;
  if (pathname.startsWith("/member")) router.replace("/");
  if (pathname.startsWith("/admin")) router.replace("/");
}

async function loadUserInfo() {
  try {
    let temp = await api.get(`/api/v1/me`);
    if (temp.status === "error") throw new Error(temp.message);
    if ("data" in temp)
      return {...temp.data,fullname:temp.data.fullName}
    
  } catch (error) {
    throw new Error(error.message);
  }
}
export function MemberProvider({ children }) {
  const [reload, setReload] = useState(1);
  const [me, setMe] = useState(null);
  const [router, pathname] = [useRouter(), usePathname()];
  function Reload() {
    setReload(reload + 1)
  }
  function update(data) {
    if (!Boolean(data))
      updateMe(null)
    else
      updateMe(data)
  }
  async function Logout() {
    await api.delete("/api/v1/me")
    router.replace("/")
  }
  function updateMe(data) {
    setMe({
      ...data,
      Reload,
      Logout,
      update
    })
  }
  useEffect(() => {
    loadUserInfo()
      .then((resp) => {
        if (pathname.startsWith("/admin") && !["root", "admin"].includes(resp.role)) {
          // router.replace("/")
        }
        updateMe(resp)
      })
      .catch((err) => {
        // notLoggedIn(pathname, router);
        setMe(null);
      });
  }, [reload, pathname]);
  return <MemberContext.Provider value={ me }>{ children }</MemberContext.Provider>;
}

export function useMember() {
  return useContext(MemberContext);
}
//*/