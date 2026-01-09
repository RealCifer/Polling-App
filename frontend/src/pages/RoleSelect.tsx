import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!role) return;
    navigate(role === "student" ? "/join" : "/admin/create");
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2>Welcome to the Live Polling System</h2>
        <p>Please select the role that best describes you</p>

        {/* ROLE CARDS */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div
            className="btn-outline"
            style={{
              flex: 1,
              borderColor: role === "student" ? "#7765da" : "#e6e6e6",
            }}
            onClick={() => setRole("student")}
          >
            <strong>I’m a Student</strong>
            <p style={{ fontSize: "12px", marginTop: "6px" }}>
              Join a live poll and submit your answer in real time
            </p>
          </div>

          <div
            className="btn-outline"
            style={{
              flex: 1,
              borderColor: role === "teacher" ? "#7765da" : "#e6e6e6",
            }}
            onClick={() => setRole("teacher")}
          >
            <strong>I’m a Teacher</strong>
            <p style={{ fontSize: "12px", marginTop: "6px" }}>
              Create polls and view live results
            </p>
          </div>
        </div>

        <button
          className="btn-primary"
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
