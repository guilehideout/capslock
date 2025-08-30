import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Parallax } from "react-parallax";

export default function HomePage() {
  const [bgImage, setBgImage] = useState("/bg_web.jpg");
  const [user, setUser] = useState(null); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  // Update background image based on screen size
  useEffect(() => {
    const handleResize = () => {
      setBgImage(window.innerWidth < 768 ? "/bg_img.jpg" : "/bg_web.jpg");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user data after login
  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch("http://localhost:8000/api/v1/users/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      setUser(data.data); // Assuming the data contains user info

      // Set score and past reports
      setScore(data.data.score);  // Example for score tracking
      setReports(data.data.reports); // Example for past reports
    };

    fetchUser();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Handle submitting a report
  const handleSubmitReport = () => {
    navigate("/report");
  };

  return (
    <div className="bg-[#FDF6E3] min-h-screen text-[#1A202C]">
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
        <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">
          🌿 Community Mangrove Watch
        </h1>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-[#2F855A]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><Link to="#leaderboard" className="hover:text-[#68D391]">Leaderboard</Link></li>
            <li><Link to="#profile" className="hover:text-[#68D391]">Profile</Link></li>
            <li><Link to="/report" className="hover:text-[#68D391]" onClick={() => setMenuOpen(false)}>Submit Report</Link></li>
            <li><button className="hover:text-[#68D391]" onClick={handleLogout}>Logout</button></li>
          </ul>
        </nav>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 right-0 w-1/3 bg-[#d3fcc6] shadow-lg z-40 rounded-3xl">
          <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-sm text-[#1A202C] justify-end">
            <li><a href="#leaderboard" onClick={() => setMenuOpen(false)}>Leaderboard</a></li>
            <li><a href="#profile" onClick={() => setMenuOpen(false)}>Profile</a></li>
            <li><a href="/report" onClick={() => setMenuOpen(false)}>Submit Report</a></li>
            <li><a href="" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      )}

      {/* Hero Section */}
      <Parallax blur={0} bgImage={bgImage} bgImageAlt="Mangroves" strength={400}>
        <section className="text-center py-32 px-4 md:py-40 text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Protecting Mangroves, Empowering Communities
          </h2>
          <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-lg mb-6">
            A participatory monitoring system where communities, NGOs, and authorities safeguard mangrove forests with AI validation and gamified participation.
          </p>
          <button className="bg-[#68D391] text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#2F855A]" onClick={handleSubmitReport}>
            Submit Report
          </button>
        </section>
      </Parallax>

      {/* Leaderboard Section */}
      <section id="leaderboard" className="py-12 md:py-20 px-5 md:px-8 max-w-5xl mx-auto">
        <h3 className="text-xl md:text-3xl font-bold text-center text-[#2F855A] mb-4 md:mb-8">Leaderboard</h3>
        <div className="space-y-4">
          {/* Example Leaderboard */}
          <div className="flex justify-between items-center">
            <p className="text-sm md:text-base font-semibold">User 1</p>
            <p className="text-sm md:text-base font-semibold">1500 points</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm md:text-base font-semibold">User 2</p>
            <p className="text-sm md:text-base font-semibold">1400 points</p>
          </div>
          {/* Add more users dynamically as needed */}
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-12 md:py-20 px-5 md:px-8 max-w-5xl mx-auto">
        <h3 className="text-xl md:text-3xl font-bold text-center text-[#2F855A] mb-4 md:mb-8">Your Profile</h3>
        {user && (
          <div className="text-center">
            <p className="text-sm md:text-base mb-2">Welcome, {user.name}!</p>
            <p className="text-sm md:text-base mb-2">Your current score: {score}</p>
            <p className="text-sm md:text-base">You have submitted {reports.length} reports.</p>
          </div>
        )}
      </section>

      {/* Additional Content to Make the Page Scrollable */}
      <section className="py-12 md:py-20 px-5 md:px-8 max-w-5xl mx-auto">
        <h3 className="text-xl md:text-3xl font-bold text-center text-[#2F855A] mb-4 md:mb-8">
          Why Mangroves Matter
        </h3>
        <p className="text-sm md:text-lg leading-relaxed text-center">
          Mangrove forests act as critical buffers between land and sea, protecting coastal areas from erosion and storm surges. They also support a wide range of biodiversity and act as vital carbon sinks, absorbing more carbon per hectare than terrestrial forests.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 Community Mangrove Watch | Built with ❤ at Hackathon</p>
      </footer>
    </div>
  );
}
