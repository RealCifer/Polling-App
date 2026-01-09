import { useEffect, useState } from "react";
import { socket } from "../services/socket";
import { usePollTimer } from "../hooks/usePollTimer";
import "../styles/poll.css";

const Poll = () => {
  const [poll, setPoll] = useState<any>(null);
  const [pollEnded, setPollEnded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const timeLeft = usePollTimer(remainingTime);

  useEffect(() => {
    socket.emit("GET_ACTIVE_POLL");

    socket.on("POLL_STARTED", ({ poll, remainingTime }) => {
      setPoll(poll);
      setRemainingTime(remainingTime);
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
    if (pollEnded || hasVoted || timeLeft <= 0) return;
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

        {/* TIMER */}
        <p style={{ textAlign: "center", marginBottom: "16px" }}>
          ⏱️ Time left: <strong>{timeLeft}s</strong>
        </p>

        {poll.options.map((opt: any, index: number) => (
          <button
            key={index}
            className="poll-option"
            disabled={pollEnded || hasVoted || timeLeft <= 0}
            onClick={() => castVote(index)}
          >
            <span>{opt.text}</span>
            <span className="vote-count">{opt.votes}</span>
          </button>
        ))}

        {(pollEnded || timeLeft <= 0) && (
          <p className="poll-ended-text">Poll has ended</p>
        )}
      </div>
    </div>
  );
};

export default Poll;
