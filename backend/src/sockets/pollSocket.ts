import { Server, Socket } from "socket.io";

let activePoll: any = null;

export const pollSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on("poll:create", ({ question, options }) => {
      console.log("📥 poll:create received");

      activePoll = {
        id: Date.now().toString(),
        question,
        options: options.map((text: string) => ({
          text,
          votes: 0,
        })),
      };

      console.log("📤 Broadcasting POLL_STARTED");
      io.emit("POLL_STARTED", { poll: activePoll });
    });

    socket.on("GET_ACTIVE_POLL", () => {
      console.log("📥 GET_ACTIVE_POLL from", socket.id);

      if (!activePoll) {
        console.log("⚠️ No active poll yet");
        return;
      }

      console.log("📤 Sending POLL_STARTED to student");
      socket.emit("POLL_STARTED", { poll: activePoll });
    });

    socket.on("vote:cast", ({ optionIndex }) => {
      console.log("📥 vote:cast", optionIndex);

      if (!activePoll) return;
      if (!activePoll.options[optionIndex]) return;

      activePoll.options[optionIndex].votes += 1;

      console.log("📤 Broadcasting POLL_UPDATED");
      io.emit("POLL_UPDATED", { poll: activePoll });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
};
