import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import "../styles/poll.css";

const Poll = () => {
  const [poll, setPoll] = useState<any>(null);
  const [pollEnded, setPollEnded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    socket.emit("GET_ACTIVE_POLL");

    socket.on("POLL_STARTED", ({ poll }) => {
      setPoll(poll);
      setPollEnded(false);
      setHasVoted(false);
    });

    socket.on("POLL_UPDATED", ({ poll }) => {
      setPoll(poll);
    });

    socket.on("POLL_ENDED", () => {
      setPollEnded(true);
    });

    socket.on("VOTE_REJECTED", ({ message }) => {
      alert(message);
    });

    return () => {
      socket.off("POLL_STARTED");
      socket.off("POLL_UPDATED");
      socket.off("POLL_ENDED");
      socket.off("VOTE_REJECTED");
    };
  }, []);

  const castVote = (index: number) => {
    if (pollEnded || hasVoted) return;
    socket.emit("vote:cast", { optionIndex: index });
    setHasVoted(true);
  };

  if (!poll) {
    return (
      <div className="page-center">
        <div className="card">Waiting for poll…</div>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="card">
        <h3 className="poll-question">{poll.question}</h3>

        {poll.options.map((opt: any, index: number) => (
          <button
            key={index}
            className="poll-option"
            disabled={pollEnded || hasVoted}
            onClick={() => castVote(index)}
          >
            <span>{opt.text}</span>
            <span className="vote-count">{opt.votes}</span>
          </button>
        ))}

        {pollEnded && (
          <p className="poll-ended-text">Poll has ended</p>
        )}
      </div>
    </div>
  );
};

export default Poll;
