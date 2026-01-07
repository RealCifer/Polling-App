import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoleSelect from "./pages/RoleSelect";
import JoinPoll from "./pages/student/JoinPoll";
import CreatePoll from "./pages/admin/CreatePoll";
import LiveResults from "./pages/admin/LiveResults";
import PollHistory from "./pages/admin/PollHistory";
import AnswerPoll from "./pages/student/AnswerPoll";
import PollResult from "./pages/student/PollResult";
import Waiting from "./pages/student/Waiting";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {}
        <Route path="/" element={<RoleSelect />} />

        {}
        <Route path="/waiting" element={<Waiting />} />
        <Route path="/join" element={<JoinPoll />} />
        <Route path="/poll" element={<AnswerPoll />} />
        <Route path="/result" element={<PollResult />} />

        {}
        <Route path="/admin/create" element={<CreatePoll />} />
        <Route path="/admin/live" element={<LiveResults />} />
        <Route path="/admin/history" element={<PollHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
