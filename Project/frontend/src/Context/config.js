"use client"
import { createContext, use, useContext, useEffect, useState } from "react"
import { api } from "@/util"
import { useRouter, usePathname } from "next/navigation";

const ConfigContext = createContext();
export function ConfigProvider({ children }) {
    const [config, setConfig] = useState({});
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        api.get("/api/v1/config").then(resp => {
            if (resp.data) setConfig(resp.data);
            if (!resp.data) {
                console.log(resp);
            }
            if (resp.status === "error") {
                if (pathname.startsWith("/setup")) return;
                router.replace("/setup");
            }
        })
    }, [])
    return <ConfigContext.Provider value={ config }>{ children }</ConfigContext.Provider>
}
export function useConfig() {
    return useContext(ConfigContext);
}
