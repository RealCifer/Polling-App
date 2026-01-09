import { useEffect, useState } from "react";
import { socket } from "../../services/socket";
import { SOCKET_EVENTS } from "../../services/socketEvents";
import "../../styles/adminLive.css";

type Option = {
  text: string;
  votes: number;
};

type Poll = {
  question: string;
  options: Option[];
};

const LiveResults = () => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [pollEnded, setPollEnded] = useState(false);

  useEffect(() => {
    socket.on(SOCKET_EVENTS.POLL_STARTED, ({ poll }) => {
      setPoll(poll);
      setPollEnded(false);
    });

    socket.on(SOCKET_EVENTS.POLL_UPDATED, ({ poll }) => {
      setPoll(poll);
    });

    socket.on(SOCKET_EVENTS.POLL_ENDED, () => {
      setPollEnded(true);
    });

    socket.emit(SOCKET_EVENTS.GET_ACTIVE_POLL);

    return () => {
      socket.off(SOCKET_EVENTS.POLL_STARTED);
      socket.off(SOCKET_EVENTS.POLL_UPDATED);
      socket.off(SOCKET_EVENTS.POLL_ENDED);
    };
  }, []);

  if (!poll) {
    return (
      <div className="page-center">
        <div className="card">
          <p className="waiting-text">Waiting for poll to start…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-center">
      <div className="card">
        <h3 className="admin-question">{poll.question}</h3>

        {poll.options.map((opt, index) => (
          <div key={index} className="admin-option">
            <span>{opt.text}</span>
            <span className="badge">{opt.votes}</span>
          </div>
        ))}

        <button
          className="btn-primary"
          disabled={pollEnded}
          onClick={() => socket.emit("poll:end")}
          style={{ marginTop: "16px" }}
        >
          {pollEnded ? "Poll Ended" : "End Poll"}
        </button>
      </div>
    </div>
  );
};

export default LiveResults;
