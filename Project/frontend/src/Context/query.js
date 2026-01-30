"use client"
import { createContext, useContext } from "react"
import { useSearchParams } from "next/navigation";

const QueryContext = createContext();
export function QueryProvider({ children }) {
    const searchParams = useSearchParams();
    const queryParams = Array.from(searchParams.keys()).reduce((a, key) => {
        const values = searchParams.getAll(key);
        a[key] = values.length === 1 ? values[0] : values;
        return a;
    }, {})
    return <QueryContext.Provider value={ queryParams }>{ children }</QueryContext.Provider>
}
export function useQuery() {
    return useContext(QueryContext);
}