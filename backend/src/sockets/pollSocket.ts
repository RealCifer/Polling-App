import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "../utils/socketEvents";
import { studentService } from "../services/StudentService";

export const pollSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on(SOCKET_EVENTS.STUDENT_JOIN, ({ name }) => {
      studentService.addStudent(socket.id, name);
    });

    socket.on("disconnect", () => {
      studentService.removeStudent(socket.id);
      console.log("Socket disconnected:", socket.id);
    });
  });
};
