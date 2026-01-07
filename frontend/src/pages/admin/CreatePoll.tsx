import { useState } from "react";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  return (
    <div className="create-poll-container">
      <div className="create-poll-card">
        <h2 className="create-poll-title">Create a Poll</h2>

        <input
          className="create-poll-input"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, index) => (
          <input
            key={index}
            className="create-poll-input"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}

        <button className="create-poll-add" onClick={addOption}>
          + Add Option
        </button>

        <button className="create-poll-submit">
          Create Poll
        </button>
      </div>
    </div>
  );
};

export default CreatePoll;
