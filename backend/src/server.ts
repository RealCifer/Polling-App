import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./utils/db";
import { pollSocketHandler } from "./sockets/pollSocket";

dotenv.config();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

pollSocketHandler(io); 

connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
