import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./roleSelect.css";

const RoleSelect = () => {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (role === "student") navigate("/join");
    if (role === "teacher") navigate("/admin/create");
  };

  return (
    <div className="role-page">
      <div className="role-card-wrapper">
        <h1>Welcome to the Live Polling System</h1>
        <p>Please select the role that best describes you</p>

        <div className="role-cards">
          <div
            className={`role-card ${role === "student" ? "active" : ""}`}
            onClick={() => setRole("student")}
          >
            <h3>I’m a Student</h3>
            <p>Join a live poll and submit your answer in real time</p>
          </div>

          <div
            className={`role-card ${role === "teacher" ? "active" : ""}`}
            onClick={() => setRole("teacher")}
          >
            <h3>I’m a Teacher</h3>
            <p>Create polls and view live results</p>
          </div>
        </div>

        <button
          className="primary-btn"
          disabled={!role}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default RoleSelect;
