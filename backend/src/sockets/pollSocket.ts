import { Server, Socket } from "socket.io";
import Poll from "../models/Poll";

export const pollSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("poll:create", async ({ question, options }) => {
      try {
        console.log("poll:create");

        await Poll.updateMany({ isActive: true }, { isActive: false });

        const poll = await Poll.create({
          question,
          options: options.map((text: string) => ({ text })),
          isActive: true,
          voters: [],
        });

        console.log("POLL_STARTED");
        io.emit("POLL_STARTED", { poll });
      } catch (err) {
        console.error("poll:create error", err);
      }
    });

    socket.on("poll:end", async () => {
  try {
    const poll = await Poll.findOne({ isActive: true });
    if (!poll) return;

    poll.isActive = false;
    await poll.save();

    console.log("POLL_ENDED");
    io.emit("POLL_ENDED");
  } catch (err) {
    console.error("poll:end error", err);
  }
});


    socket.on("GET_ACTIVE_POLL", async () => {
      try {
        const poll = await Poll.findOne({ isActive: true });

        if (!poll) {
          console.log("No active poll");
          return;
        }

        console.log("Sending active poll to student");
        socket.emit("POLL_STARTED", { poll });
      } catch (err) {
        console.error("GET_ACTIVE_POLL error", err);
      }
    });

    socket.on("vote:cast", async ({ optionIndex }) => {
  try {
    const poll = await Poll.findOne({ isActive: true });
    if (!poll) return;

    if (poll.voters.includes(socket.id)) {
      socket.emit("VOTE_REJECTED", {
        message: "You have already voted",
      });
      return;
    }

    if (!poll.options[optionIndex]) return;

    poll.options[optionIndex].votes += 1;
    poll.voters.push(socket.id);

    await poll.save();

    io.emit("POLL_UPDATED", { poll });
  } catch (err) {
    console.error("vote:cast error", err);
  }
});

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
