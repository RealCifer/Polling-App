import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";

const JoinPoll = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

const handleJoin = () => {
  if (!socket.connected) {
    socket.once("connect", () => {
      socket.emit("GET_ACTIVE_POLL");
    });
  } else {
    socket.emit("GET_ACTIVE_POLL");
  }
};


  useEffect(() => {
    console.log("🟡 JoinPoll mounted");

    socket.on("connect", () => {
      console.log("✅ Student socket connected:", socket.id);
    });

    socket.on("POLL_STARTED", (data) => {
      console.log("🎉 POLL_STARTED received:", data);
      navigate("/poll");
    });

    return () => {
      socket.off("POLL_STARTED");
    };
  }, [navigate]);

  return (
    <div className="page-center">
      <div className="card">
        <h2>Join Poll</h2>

        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button onClick={handleJoin}>Continue</button>
      </div>
    </div>
  );
};

export default JoinPoll;
