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
    };
  }, []);

  const castVote = (index: number) => {
  if (pollEnded || hasVoted) return;

  socket.emit("vote:cast", { optionIndex: index });
  setHasVoted(true);
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
            disabled={pollEnded || hasVoted} 
          >
            <span>{opt.text}</span>
            <span className="vote-count">{opt.votes} votes</span>
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
