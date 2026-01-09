import { useEffect, useState } from "react";
import { socket } from "../../services/socket";
import { SOCKET_EVENTS } from "../../services/socketEvents";
import "./liveResults.css";

type Option = {
  id: string;
  text: string;
  votes: number;
};

type Poll = {
  id: string;
  question: string;
  options: Option[];
};

const LiveResults = () => {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [pollEnded, setPollEnded] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on(SOCKET_EVENTS.POLL_STARTED, ({ poll }) => {
      console.log("POLL_STARTED received", poll);
      setPoll(poll);
      setPollEnded(false); // reset if new poll starts
    });

    socket.on(SOCKET_EVENTS.POLL_UPDATED, ({ poll }) => {
      console.log("POLL_UPDATED received", poll);
      setPoll(poll);
    });

    socket.on(SOCKET_EVENTS.POLL_ENDED, ({ poll }) => {
      console.log("POLL_ENDED received", poll);
      setPoll(poll);
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
    return <p className="waiting-text">Waiting for poll data...</p>;
  }

  return (
    <div className="page-center">
      <div className="card">
        <h3>{poll.question}</h3>

        {poll.options.map((o) => (
          <div key={o.id} className="option-row">
            <span>{o.text}</span>
            <span className="badge">{o.votes} votes</span>
          </div>
        ))}

        {}
        <button
          className="end-poll-btn"
          disabled={pollEnded}
          onClick={() => socket.emit("poll:end")}
        >
          {pollEnded ? "Poll Ended" : "End Poll"}
        </button>
      </div>
    </div>
  );
};

export default LiveResults;
