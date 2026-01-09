import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";

const Waiting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("POLL_STARTED", () => {
      navigate("/poll");
    });

    socket.emit("GET_ACTIVE_POLL");

    return () => {
      socket.off("POLL_STARTED");
    };
  }, [navigate]);

  return (
    <div className="page-center">
      <div className="card" style={{ textAlign: "center" }}>
        <span className="badge">Live Poll</span>

        <div className="loader" />

        <p style={{ marginTop: "12px" }}>
          Wait for the teacher to ask questions...
        </p>
      </div>
    </div>
  );
};

export default Waiting;
