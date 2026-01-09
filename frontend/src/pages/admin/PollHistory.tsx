import { useEffect, useState } from "react";

const PollHistory = () => {
  const [polls, setPolls] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/polls/history")
      .then(res => res.json())
      .then(data => setPolls(data));
  }, []);

  return (
    <div className="poll-history-page">
      <h2>Poll History</h2>

      {polls.map(poll => (
        <div key={poll._id} className="poll-card">
          <h3>{poll.question}</h3>

          {poll.options.map((opt: any, i: number) => (
            <div key={i}>
              {opt.text} — {opt.votes} votes
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PollHistory;
