import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import connectDB from "./utils/db";
import { pollSocketHandler } from "./sockets/pollSocket";

dotenv.config();

app.get("/", (_req, res) => {
  res.send("Live Polling Backend is running ");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

pollSocketHandler(io);

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
