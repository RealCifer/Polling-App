import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoleSelect = () => {
  const [role, setRole] = useState<"student" | "teacher" | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (role === "student") navigate("/");
    if (role === "teacher") navigate("/admin/create");
  };

  return (
    <div className="role-container">
      <h1 className="role-title">Welcome to the Live Polling System</h1>
      <p className="role-subtitle">
        Please select the role that best describes you
      </p>
<div className="role-cards">
  <div
    className={`role-card ${role === "student" ? "active" : ""}`}
    onClick={() => setRole("student")}
  >
    <h3>I’m a Student</h3>
    <p>Lorem ipsum is simply dummy text of the printing and typesetting industry</p>
  </div>

  <div
    className={`role-card ${role === "teacher" ? "active" : ""}`}
    onClick={() => setRole("teacher")}
  >
    <h3>I’m a Teacher</h3>
    <p>Submit answers and view live poll results in real time</p>
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
  );
};

export default RoleSelect;
