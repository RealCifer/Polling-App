import { Server, Socket } from "socket.io";

let activePoll: any = null;

export const pollSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("poll:create", ({ question, options }) => {
      activePoll = {
        id: Date.now().toString(),
        question,
        options: options.map((text: string) => ({
          text,
          votes: 0,
        })),
      };

      io.emit("POLL_STARTED", { poll: activePoll });
    });

    socket.on("GET_ACTIVE_POLL", () => {
      if (activePoll) {
        socket.emit("POLL_STARTED", { poll: activePoll });
      }
    });

    socket.on("vote:cast", ({ optionIndex }) => {
      if (!activePoll) return;

      activePoll.options[optionIndex].votes += 1;

      io.emit("POLL_UPDATED", { poll: activePoll });
    });
  });
};
