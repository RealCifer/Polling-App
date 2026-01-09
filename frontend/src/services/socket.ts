import { io } from "socket.io-client";

export const socket = io("https://polling-app-ks6s.onrender.com", {
  transports: ["websocket"],
});
