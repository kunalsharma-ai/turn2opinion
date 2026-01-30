"use client";
import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
let eventSource;
function createEvent(name, detail) {
  if (typeof document === "undefined") return console.log("No Document");
  if (!name || !detail) return;
  document.dispatchEvent(new CustomEvent(name, { detail }));
}
const SSE = ({ onMessage, onError, onOpen }) => {
  let [token, setToken] = React.useState();
  let path = usePathname();
  let searchParams = useSearchParams();
  // return <></>;
  const [isConnected, setIsConnected] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    let temp = localStorage.getItem("token");
    setToken(temp);
  }, []);
  React.useEffect(() => {
    if (!token) return;
    const url = `/event/subscribe?token=${token}`;
    if (eventSource) {
      eventSource.close();
    }
    eventSource = new EventSource(url, {
      headers: {
        Authorization: "none",
        Cookie: "test cookie",
        currentPage: `${path}?${searchParams.toString()}`,
      },
    });
    eventSource.onopen = (event) => {
      setIsConnected(true);
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        data = event.data;
      }
      createEvent("sse-connected", data);
      onOpen?.(event);
    };

    eventSource.onmessage = (event) => {
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        data = event.data;
      }
      createEvent("sse-message", data);
      onMessage?.(event);
    };
    eventSource.onerror = (event) => {
      setIsConnected(false);
      let data = {};
      try {
        data = JSON.parse(event.data);
      } catch (error) {
        data = event.data;
      }
      createEvent("sse-disconnect", data);
      onError?.(event);
    };
  }, [token]);
  return <></>;
};

export default SSE;
