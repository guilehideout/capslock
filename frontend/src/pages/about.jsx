import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgImage, setBgImage] = useState("/mnt/data/bg_web.jpg"); // Using uploaded background image

  // Update background image based on screen size
  useEffect(() => {
    const handleResize = () => {
      setBgImage(window.innerWidth < 768 ? "/bg_img.jpg" : "/mnt/data/bg_web.jpg"); // Updated path for mobile
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#FDF6E3] min-h-screen text-white" style={{ backgroundImage: `url('/bg_web.jpg')` }}>
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
        <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">
          🌿 Community Mangrove Watch
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
            {/* <li><Link to="/features" className="hover:text-[#68D391]">Features</Link></li> */}
            <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
            <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
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
            <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
            {/* <li><Link to="/features" className="hover:text-[#68D391]">Features</Link></li> */}
            <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
            <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
          </ul>
        </div>
      )}

      {/* About Section */}
      <section className="py-12 md:py-20 px-5 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          About Community Mangrove Watch 🌿
        </h2>

        <p className="text-sm md:text-lg text-center mb-6">
          Community Mangrove Watch is an initiative that empowers individuals and communities to protect mangrove ecosystems through citizen-driven reporting and conservation efforts. Mangroves are crucial for coastal protection, biodiversity, and climate regulation, but they’re facing threats like deforestation and pollution.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Image 1 */}
          <div className="flex justify-center">
            <img
              src="/one.jpg"
              alt="Mangrove Ecosystem"
              className="w-full h-auto rounded-xl shadow-lg border-3 border-white"
            />
          </div>
          {/* Image 2 */}
          <div className="flex justify-center">
            <img
              src="/two.jpg"
              alt="Submerged Mangrove Roots"
              className="w-full h-auto rounded-xl shadow-lg border-3 border-white"
            />
          </div>
          {/* Image 3 */}
          <div className="flex justify-center">
            <img
              src="/third.jpg"
              alt="Mangrove Forests"
              className="w-full h-auto rounded-xl shadow-lg border-3 border-white"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <h3 className="text-lg md:text-xl font-semibold text-white">Why It Matters 🌎</h3>
          <p className="text-sm md:text-lg text-center max-w-4xl mx-auto mt-4">
            Mangroves are vital for:
            <ul className="list-disc list-inside text-center mt-2">
            <li><strong>Climate Change Mitigation</strong>: Absorb carbon and protect against storms.</li>
            <li><strong>Coastal Protection</strong>: Safeguard communities from erosion and flooding.</li>
            <li><strong>Biodiversity</strong>: Support unique species of wildlife.</li>
            </ul>

          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 Community Mangrove Watch | Built with ❤ at Hackathon</p>
      </footer>
    </div>
  );
}

export default About;
