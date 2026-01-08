import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";

const Waiting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePollStart = () => {
      navigate("/poll");
    };

    socket.on("POLL_STARTED", handlePollStart);

    socket.emit("GET_ACTIVE_POLL");

    return () => {
      socket.off("POLL_STARTED", handlePollStart);
    };
  }, [navigate]);

  return (
    <div className="waiting-container">
      <p>Wait for the teacher to ask questions...</p>
    </div>
  );
};

export default Waiting;
