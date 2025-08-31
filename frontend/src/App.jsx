import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Report from "./pages/report";
import UserDash from "./pages/user-dash";
import Impact from "./pages/impact";
import About from "./pages/about";
import Leaderboard from "./pages/leaderboard";
import Alerts from "./pages/alerts";
import History from "./pages/history"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<Report />} />
        <Route path="/user-dash" element={<UserDash />} />  {/* User Dashboard page */}
        <Route path="/impact" element={<Impact />} />
        <Route path="/about" element={<About />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/history" element={<History/>} />
      </Routes>
    </Router>
  );
}

export default App;


