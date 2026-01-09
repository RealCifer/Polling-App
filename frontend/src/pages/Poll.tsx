import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import "../styles/poll.css";

const Poll = () => {
  const [poll, setPoll] = useState<any>(null);

  useEffect(() => {
    socket.emit("GET_ACTIVE_POLL");

    socket.on("POLL_STARTED", ({ poll }) => {
      setPoll(poll);
    });

    socket.on("POLL_UPDATED", ({ poll }) => {
      setPoll(poll);
    });

    return () => {
      socket.off("POLL_STARTED");
      socket.off("POLL_UPDATED");
    };
  }, []);

  const castVote = (index: number) => {
    socket.emit("vote:cast", { optionIndex: index });
  };

  if (!poll) {
    return (
      <div className="poll-page">
        <div className="poll-card">Waiting for poll...</div>
      </div>
    );
  }

  return (
    <div className="poll-page">
      <div className="poll-card">
        <h2 className="poll-question">{poll.question}</h2>

        {poll.options.map((opt: any, index: number) => (
          <button
            key={index}
            className="poll-option"
            onClick={() => castVote(index)}
          >
            <span>{opt.text}</span>
            <span className="vote-count">{opt.votes} votes</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Poll;
