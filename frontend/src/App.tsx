import { Routes, Route } from "react-router-dom";

import RoleSelect from "./pages/RoleSelect";

import JoinPoll from "./pages/student/JoinPoll";
import Waiting from "./pages/student/Waiting";
import Poll from "./pages/Poll";

import CreatePoll from "./pages/admin/CreatePoll";
import LiveResults from "./pages/admin/LiveResults";

const App = () => {
  return (
    <Routes>
      {}
      <Route path="/" element={<RoleSelect />} />

      {}
      <Route path="/join" element={<JoinPoll />} />
      <Route path="/waiting" element={<Waiting />} />
      <Route path="/poll" element={<Poll />} />

      {}
      <Route path="/admin/create" element={<CreatePoll />} />
      <Route path="/admin/live" element={<LiveResults />} />
    </Routes>
  );
};

export default App;
