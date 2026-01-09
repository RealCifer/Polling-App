import { Server, Socket } from "socket.io";
import PollService from "../services/PollService";

let pollTimeout: NodeJS.Timeout | null = null;

export const pollSocketHandler = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("poll:create", async ({ question, options, duration }) => {
      try {
        console.log("poll:create");

        const poll = await PollService.createPoll(
          question,
          options,
          duration
        );

        io.emit("POLL_STARTED", {
          poll,
          remainingTime: duration,
        });

        if (pollTimeout) clearTimeout(pollTimeout);

        pollTimeout = setTimeout(async () => {
          const endedPoll = await PollService.endPoll();
          if (endedPoll) {
            console.log("POLL_ENDED (AUTO)");
            io.emit("POLL_ENDED", { poll: endedPoll });
          }
        }, duration * 1000);
      } catch (err) {
        console.error("poll:create error", err);
      }
    });

    socket.on("GET_ACTIVE_POLL", async () => {
      try {
        const data = await PollService.getActivePollWithRemainingTime();
        if (!data) return;

        socket.emit("POLL_STARTED", {
          poll: data.poll,
          remainingTime: data.remainingTime,
        });
      } catch (err) {
        console.error("GET_ACTIVE_POLL error", err);
      }
    });

    socket.on("vote:cast", async ({ optionIndex }) => {
      try {
        const result = await PollService.castVote(
          optionIndex,
          socket.id
        );

        if (result?.error) {
          socket.emit("VOTE_REJECTED", {
            message: result.error,
          });
          return;
        }

        io.emit("POLL_UPDATED", { poll: result.poll });
      } catch (err) {
        console.error("vote:cast error", err);
      }
    });

    socket.on("poll:end", async () => {
      try {
        if (pollTimeout) clearTimeout(pollTimeout);

        const poll = await PollService.endPoll();
        if (poll) {
          console.log("POLL_ENDED (MANUAL)");
          io.emit("POLL_ENDED", { poll });
        }
      } catch (err) {
        console.error("poll:end error", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
};
