import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";

const JoinPoll = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleJoin = () => {
    if (!name.trim()) return;

    socket.connect();
    socket.emit("student:join", { name });

    navigate("/waiting");
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <h1 className="title">Live Poll</h1>
        <p className="subtitle">Enter your name to continue</p>

        <input
          className="input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={handleJoin}
          disabled={!name}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default JoinPoll;
