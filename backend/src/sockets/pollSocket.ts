import { Server, Socket } from "socket.io";
import { SOCKET_EVENTS } from "../utils/socketEvents";
import { studentService } from "../services/StudentService";
import { pollService } from "../services/PollService";

export const pollSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on(SOCKET_EVENTS.STUDENT_JOIN, ({ name }) => {
      studentService.addStudent(socket.id, name);
    });

    socket.on(
      SOCKET_EVENTS.CREATE_POLL,
      async ({ question, options, duration }) => {
        try {
          const poll = await pollService.createPoll(
            question,
            options,
            duration
          );

          io.emit(SOCKET_EVENTS.POLL_STARTED, {
            poll,
          });

          setTimeout(async () => {
            await pollService.endPoll();
            io.emit(SOCKET_EVENTS.POLL_ENDED);
          }, duration * 1000);
        } catch (err: any) {
          socket.emit("error", err.message);
        }
      }
    );

    socket.on("disconnect", () => {
      studentService.removeStudent(socket.id);
      console.log("Socket disconnected:", socket.id);
    });
  });
};
