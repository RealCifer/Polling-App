import { useEffect, useState } from "react";

const PollHistory = () => {
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/polls/history")
      .then((res) => res.json())
      .then((data) => setPolls(data));
  }, []);

  return (
    <div className="page-center">
      <div className="card">
        <h2>Poll History</h2>

        {polls.length === 0 && <p>No past polls yet.</p>}

        {polls.map((poll) => (
          <div key={poll._id} style={{ marginBottom: "16px" }}>
            <h4>{poll.question}</h4>

            {poll.options.map((opt: any, i: number) => (
              <div key={i}>
                {opt.text} — {opt.votes} votes
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PollHistory;
