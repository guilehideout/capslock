import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Report from "./pages/report";
import UserDash from "./pages/user-dash";
import Impact from "./pages/impact";
import About from "./pages/about";


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
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}

export default App;


