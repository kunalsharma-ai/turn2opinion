console.log("🔥 SharedWorker started!");

let socket = null;
let ports = [];
let joinPayload = null;

onconnect = function (e) {
  const port = e.ports[0];
  ports.push(port);

  port.onmessage = function (event) {
    const msg = event.data;

    // ====== INIT SOCKET (only once) ======
    if (msg.type === "init" && !socket) {
      console.log("Initializing socket in worker...");

      // load socket.io library
      importScripts("/js/socket.io.min.js");
      console.log("Socket.IO library loaded");

      joinPayload = msg.joinRoom;

      socket = io(msg.serverURL, {
        path: msg.path + "/socket.io",   // <<< IMPORTANT FIX
        transports: ["websocket"],
      });

      socket.on("connect", () => {
        console.log("Worker socket connected:", socket.id);
        broadcast({ type: "connected", id: socket.id });

        if (joinPayload) {
          console.log("Joining room:", joinPayload);
          socket.emit("joinRoom", joinPayload);
          broadcast({ type: "roomJoined", payload: joinPayload });
        }
      });

      socket.on("reconnect", () => {
        if (joinPayload) {
          console.log("Rejoining room:", joinPayload);
          socket.emit("joinRoom", joinPayload);
          broadcast({ type: "roomReJoined", payload: joinPayload });
        }
      });

      socket.on("notification", (data) => {
        console.log("Notification from server:", data);
        broadcast({ type: "notification", data });
      });
      socket.on("onlineUsers", (data) => {
        console.log("Notification from server:", data);
        broadcast({ type: "online users", data });
      });
    }

    // ====== CLIENT EMIT ======
    if (msg.type === "emit" && socket) {
      socket.emit(msg.event, msg.data);
    }
  };

  port.start();
};

function broadcast(msg) {
  ports.forEach((p) => p.postMessage(msg));
}
