import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/v1/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FDF6E3] min-h-screen">
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
        <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">
          🌿 ManGrow
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><a href="#about" className="hover:text-[#68D391]">About</a></li>
            {/* <li><a href="#features" className="hover:text-[#68D391]">Features</a></li> */}
            <li><a href="/impact" className="hover:text-[#68D391]">Impact</a></li>
            {/* <li><a href="#users" className="hover:text-[#68D391]">Users</a></li> */}
            <li><a href="/login" className="hover:text-[#68D391]">Login</a></li>
            <li><a href="/signup" className="hover:text-[#68D391]">Signup</a></li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-[#2F855A]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 right-0 w-1/3 bg-[#d3fcc6] shadow-lg z-40 rounded-3xl">
          <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-sm text-[#1A202C] justify-end">
            <li><a href="#about" className="hover:text-[#68D391]">About</a></li>
            {/* <li><a href="#features" className="hover:text-[#68D391]">Features</a></li> */}
            <li><a href="/impact" className="hover:text-[#68D391]">Impact</a></li>
            {/* <li><a href="#users" className="hover:text-[#68D391]">Users</a></li> */}
            <li><a href="/login" className="hover:text-[#68D391]">Login</a></li>
            <li><a href="/signup" className="hover:text-[#68D391]">Signup</a></li>
          </ul>
        </div>
      )}

      {/* Signup Form Section */}
      <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/bg_web.jpg')" }}>
        <div className="bg-white/90 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-xs sm:max-w-sm md:max-w-md border border-green-100">
          <h1 className="text-xl sm:text-2xl font-semibold text-green-700 text-center mb-6">
            🌱 Create an Account
          </h1>

          {error && <p className="text-red-600 text-xs mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 rounded-lg shadow hover:opacity-90 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-xs sm:text-sm text-gray-600 text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 Community Mangrove Watch | Built with ❤ at HackOut'25 by capslock</p>
      </footer>
    </div>
  );
}

export default Signup;
