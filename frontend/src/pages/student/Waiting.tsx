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
    <div className="page-center">
      <div className="card">
        <h2>Waiting for the teacher to start the poll</h2>
        <p>Please stay on this page.</p>
      </div>
    </div>
  );
};

export default Waiting;
