import { useEffect, useState } from "react";
import { socket } from "../../services/socket";

type Option = {
  text: string;
  votes: number;
};

type Poll = {
  question: string;
  options: Option[];
};

const AnswerPoll = () => {
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    socket.on("POLL_STARTED", ({ poll }) => {
      setPoll(poll);
    });

    socket.on("POLL_UPDATED", ({ poll }) => {
      setPoll({ ...poll });
    });

    socket.emit("GET_ACTIVE_POLL");

    return () => {
      socket.off("POLL_STARTED");
      socket.off("POLL_UPDATED");
    };
  }, []);

  const handleVote = (index: number) => {
    socket.emit("vote:cast", { optionIndex: index });
  };

  if (!poll) {
    return <p>Waiting for poll...</p>;
  }

  return (
    <div className="poll-container">
      <h2>{poll.question}</h2>

      {poll.options.map((opt, index) => (
        <button key={index} onClick={() => handleVote(index)}>
          {opt.text} ({opt.votes})
        </button>
      ))}
    </div>
  );
};

export default AnswerPoll;
