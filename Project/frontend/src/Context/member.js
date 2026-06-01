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
      return { ...temp.data, fullname: temp.data.fullName, firstname: temp?.data?.name?.first, lastname: temp?.data?.name?.last }

  } catch (error) {
    throw new Error(error.message);
  }
}
class ValidUser {
  constructor(userinfo, router) {
    this.userinfo = userinfo
    this.router = router
  }
  termsAccepted() {
    return ("terms" in this.userinfo && this.userinfo.terms instanceof Array && this.userinfo.terms.length !== 0)
  }
  emailVerified() {
    return ("isVerified" in this.userinfo && "email" in this.userinfo.isVerified && this.userinfo.isVerified.email === "verified")
  }
  async hasCompletedWelcomeSurvey() {
    try {
      let temp = await api.post(`/api/v1/me/survey`, {
        slug: "welcome"
      });
      if (temp.status === "error") {
        console.error(temp.message);
        return false;
      }
      if ("data" in temp && Array.isArray(temp.data) && temp.data.length === 1) {
        return temp.data[0].participationStatus === "complete"
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  isAdmin() {
    return ("role" in this.userinfo && ["root", "admin"].includes(this.userinfo.role))
  }
  async allowAccess(pathname) {
    if (pathname.startsWith("/admin")) {
      if (!this.isAdmin()) return this.router.replace("/")
    }
    if (pathname.startsWith("/member")) {
      if (!this.emailVerified()) return this.router.replace(`/?verifyemail=${this.userinfo.mail}`)
    }
    if (!this.termsAccepted()) return this.router.replace("/auth/terms")
    if (!(await this.hasCompletedWelcomeSurvey())) return this.router.replace("/survey?name=welcome")
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
    if (typeof window === "undefined") return;
    localStorage.clear();
    Reload();
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
        let user = new ValidUser(resp, router)
        user.allowAccess(pathname)
        updateMe(resp)
      })
      .catch((err) => {
        // notLoggedIn(pathname, router);
        setMe(null);
      });
  }, [reload, pathname]);

  return <MemberContext.Provider value={me}>{children}</MemberContext.Provider>;
}

export function useMember() {
  return useContext(MemberContext);
}
//*/