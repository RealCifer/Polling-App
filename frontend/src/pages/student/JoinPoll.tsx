import { useState } from "react";

const JoinPoll = () => {
  const [name, setName] = useState("");

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

        <button className="primary-btn" disabled={!name}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default JoinPoll;
