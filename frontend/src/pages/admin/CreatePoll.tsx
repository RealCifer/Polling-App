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
    <div style={styles.container}>
      <h2 style={styles.heading}>Create a Poll</h2>

      <input
        style={styles.input}
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      {options.map((opt, index) => (
        <input
          key={index}
          style={styles.input}
          placeholder={`Option ${index + 1}`}
          value={opt}
          onChange={(e) => handleOptionChange(index, e.target.value)}
        />
      ))}

      <button style={styles.addBtn} onClick={addOption}>
        + Add Option
      </button>

      <button style={styles.createBtn}>Create Poll</button>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#F2F2F2",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
  },
  heading: {
    color: "#373737",
  },
  input: {
    width: "320px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #6E6E6E",
  },
  addBtn: {
    backgroundColor: "#5767D0",
    color: "white",
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  createBtn: {
    backgroundColor: "#7765DA",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
};


export default CreatePoll;
