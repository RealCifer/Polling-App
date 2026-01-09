import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";

const JoinPoll = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!name.trim()) return;

    socket.emit("student:join", { name });
    navigate("/waiting");
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2>Let’s Get Started</h2>
        <p>
          If you’re a student, enter your name below to participate in live
          polls.
        </p>

        <input
          className="input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          className="btn-primary"
          style={{ marginTop: "16px" }}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default JoinPoll;
