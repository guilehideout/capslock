import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { useSpring, animated } from "@react-spring/web"; // For animated counters
import { Trophy, Star, X } from "lucide-react"; 

export default function MainPage() {
  const [user, setUser] = useState({
    name: "John Doe",
    points: 150,
    rank: 5,
    role: "Volunteer",
    email: "john@example.com"
  });

  const [bgImage, setBgImage] = useState("/bg_dev.jpg"); 
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setBgImage(window.innerWidth < 768 ? "/bg_img.jpg" : "/bg_web.jpg");
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    AOS.init({
      duration: 1200,
      once: true,
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rankProps = useSpring({ from: { number: 0 }, number: user.rank, delay: 200 });
  const pointsProps = useSpring({ from: { number: 0 }, number: user.points, delay: 400 });

  return (
    <div
      className="min-h-screen text-[#1A202C]"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed", // Keep image stuck
      }}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
        <a href="/user-dash" className="hover:text-[#68D391]"><Link to="/user-dash">
          <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">
            🌿 ManGrow
          </h1>
        </Link></a>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><Link to="/report" className="hover:text-[#68D391]">Report</Link></li>
            <li><Link to="/leaderboard" className="hover:text-[#68D391]">Leaderboard</Link></li>
            <li><Link to="/alerts" className="hover:text-[#68D391]">Alerts</Link></li>
            <li><button onClick={() => setProfileOpen(true)} className="hover:text-[#68D391]">Profile</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-32 px-4 md:py-40 text-white">
        <h2 className="text-3xl md:text-5xl font-bold mb-4" data-aos="fade-up">
          Welcome Back, {user.name}
        </h2>
        <p className="max-w-xl md:max-w-2xl mx-auto text-base md:text-lg mb-6" data-aos="fade-up" data-aos-delay="200">
          You are helping us protect mangroves and empower communities. Keep up the great work!
        </p>
        <Link to="/report">
          <button className="bg-[#68D391] text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#2F855A]" data-aos="fade-up" data-aos-delay="400">
            Start Reporting
          </button>
        </Link>
      </section>

      {/* Key Features Section */}
      <section className="py-12 md:py-20 px-5 md:px-8 w-full mx-auto bg-[#FDF6E3]/90">
        <h3 className="text-xl md:text-3xl font-bold text-center text-[#2F855A] mb-4 md:mb-8" data-aos="fade-up">
          Key Features
        </h3>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="p-5 bg-[#FDF6E3]/90 rounded-2xl shadow hover:shadow-lg text-[#1A202C]" data-aos="fade-up">
            <h4 className="text-base md:text-xl font-semibold text-[#2F855A] mb-2">📱 Report Incidents</h4>
            <p className="text-sm md:text-base">Easily report mangrove incidents directly from your mobile.</p>
            <Link to="/report">
              <button className="bg-[#68D391] text-black px-4 py-2 rounded-xl mt-4 hover:bg-[#2F855A]">Report Now</button>
            </Link>
          </div>
          <div className="p-5 bg-[#FDF6E3]/90 rounded-2xl shadow hover:shadow-lg text-[#1A202C]" data-aos="fade-up" data-aos-delay="200">
            <h4 className="text-base md:text-xl font-semibold text-[#2F855A] mb-2">🏆 Leaderboard</h4>
            <p className="text-sm md:text-base">See how you rank among the top contributors protecting mangroves.</p>
            <Link to="/leaderboard">
              <button className="bg-[#68D391] text-black px-4 py-2 rounded-xl mt-4 hover:bg-[#2F855A]">View Leaderboard</button>
            </Link>
          </div>
          <div className="p-5 bg-[#FDF6E3]/90 rounded-2xl shadow hover:shadow-lg text-[#1A202C]" data-aos="fade-up" data-aos-delay="400">
            <h4 className="text-base md:text-xl font-semibold text-[#2F855A] mb-2">🚨 Alerts</h4>
            <p className="text-sm md:text-base">Get notified about urgent mangrove protection activities.</p>
            <Link to="/alerts">
              <button className="bg-[#68D391] text-black px-4 py-2 rounded-xl mt-4 hover:bg-[#2F855A]">Check Alerts</button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Stats Section */}
      <section className="bg-gradient-to-b from-[#039b4f] to-[#4cd8ee] text-white py-16 px-5 md:px-8">
        <div className="max-w-6xl mx-auto text-center" data-aos="fade-up">
          <h3 className="text-xl md:text-3xl font-bold mb-10">Your Stats</h3>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white/10 p-10 rounded-2xl shadow-lg backdrop-blur-md hover:scale-105 transition-transform" data-aos="zoom-in">
              <Trophy className="mx-auto text-yellow-300 w-12 h-12 mb-4" />
              <h4 className="text-2xl font-semibold mb-2">Rank</h4>
              <animated.p className="text-5xl font-extrabold">{rankProps.number.to((n) => n.toFixed(0))}</animated.p>
            </div>
            <div className="bg-white/10 p-10 rounded-2xl shadow-lg backdrop-blur-md hover:scale-105 transition-transform" data-aos="zoom-in" data-aos-delay="200">
              <Star className="mx-auto text-yellow-400 w-12 h-12 mb-4" />
              <h4 className="text-2xl font-semibold mb-2">Points</h4>
              <animated.p className="text-5xl font-extrabold">{pointsProps.number.to((n) => n.toFixed(0))}</animated.p>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Sidebar */}
      {profileOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={() => setProfileOpen(false)}>
          <div className="h-full w-80 bg-white shadow-xl p-6 transform transition-all duration-300 ease-in-out" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-lg font-semibold text-green-700">Profile</h2>
              <button onClick={() => setProfileOpen(false)}><X size={24} className="text-gray-600 hover:text-gray-900" /></button>
            </div>
            <div className="flex flex-col items-center">
              <img src="./image.png" alt="profile" className="w-24 h-24 rounded-full object-cover border-2 border-green-500 shadow-md" />
              <h3 className="mt-3 text-xl font-bold">{user.name}</h3>
              <p className="text-sm text-gray-500">{user.role}</p>
              <div className="mt-6 space-y-3 text-gray-700 text-sm text-start">
                <p>📧 {user.email}</p>
                <p>🌍 Mangrove Project Member</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 Community Mangrove Watch | Built with ❤ at HackOut'25 by capslock</p>
      </footer>
    </div>
  );
}
