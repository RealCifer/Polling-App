import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";
import "../../styles/createPoll.css";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const addOption = () => setOptions([...options, ""]);

  const handleCreatePoll = () => {
    if (!question.trim() || options.some(o => !o.trim())) return;

    socket.emit("poll:create", { question, options });
    navigate("/admin/live");
  };

  return (
    <div className="page-center">
      <div className="card">
        <h2>Create a Poll</h2>

        <input
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, i) => (
          <input
            key={i}
            placeholder={`Option ${i + 1}`}
            value={opt}
            onChange={(e) => {
              const copy = [...options];
              copy[i] = e.target.value;
              setOptions(copy);
            }}
          />
        ))}

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
