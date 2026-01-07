import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePoll from "./pages/admin/CreatePoll";
import LiveResults from "./pages/admin/LiveResults";
import PollHistory from "./pages/admin/PollHistory";
import JoinPoll from "./pages/student/JoinPoll";
import AnswerPoll from "./pages/student/AnswerPoll";
import PollResult from "./pages/student/PollResult";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinPoll />} />
        <Route path="/admin/create" element={<CreatePoll />} />
        <Route path="/admin/live" element={<LiveResults />} />
        <Route path="/admin/history" element={<PollHistory />} />
        <Route path="/poll" element={<AnswerPoll />} />
        <Route path="/result" element={<PollResult />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
