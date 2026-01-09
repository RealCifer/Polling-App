import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";
import "../../styles/createPoll.css";

const CreatePoll = () => {
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [duration, setDuration] = useState(60); // seconds

  const addOption = () => setOptions([...options, ""]);

  const handleCreatePoll = () => {
    if (!question.trim() || options.some((o) => !o.trim())) return;

    socket.emit("poll:create", {
      question,
      options,
      duration,
    });

    navigate("/admin/live");
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2>Create a Poll</h2>

        <input
          className="input"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            className="input"
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
          />
        ))}

        {}
        <input
          className="input"
          type="number"
          min={10}
          max={300}
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          placeholder="Duration (seconds)"
        />

        <button className="secondary" onClick={addOption}>
          + Add Option
        </button>

        <button className="primary" onClick={handleCreatePoll}>
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default CreatePoll;
