"use client";

import { useEffect, useRef, useState } from "react";
import deviceid from "@/util/UUID";

export default function useSharedSocket(user) {
  const workerRef = useRef(null);
  const [uuid, setUUID] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const serverURL = "https://chat.sampledge.com";

  // Load device ID once
  useEffect(() => {
    deviceid().then((id) => setUUID(id));
  }, []);

  // Initialize SharedWorker
  useEffect(() => {
    if (!user || !uuid) {
      console.log("Waiting for user + uuid...");
      return;
    }
    const worker = new SharedWorker("/js/socket-worker.js", { type: "classic" });
    workerRef.current = worker;
    worker.port.start();

    worker.port.onmessage = (e) => {
      setMessages(e.data);
    };

    worker.port.postMessage({
      type: "init",
      serverURL,
      path: "/chat",
      joinRoom: {
        username: `${user?.mail??""}:${uuid}`,
        roomName: "mho",
        deviceID: uuid, // <-- PASS UUID HERE
      },
    });

    setIsLoaded(true);

    return () => {
      worker.port.close();
    };
  }, [user, uuid]);

  const emit = (event, data) => {
    workerRef.current?.port?.postMessage({
      type: "emit",
      event,
      data,
    });
  };

  return { messages, emit, isLoaded };
}
