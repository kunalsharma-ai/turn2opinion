"use client"
import { useQuery } from "@/Context";
import { api } from "@/util";
import React from "react";

export default function page() {
    const [user, setUser] = React.useState({});
    const [query] = [useQuery()];
    React.useEffect(() => {
        if (!query || !query.user) return;
        api.get(`/api/v1/user/${query.user}`).then(resp => setUser(resp.data));
    }, [query])
    return (<pre>
        { JSON.stringify(user, null, 2) }
    </pre>)
}