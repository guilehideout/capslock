import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Parallax } from "react-parallax";
import { Menu, X } from "lucide-react";

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgImage, setBgImage] = useState("/bg_web.jpg");

  useEffect(() => {
    const handleResize = () => {
      setBgImage(window.innerWidth < 768 ? "/bg_img.jpg" : "/bg_web.jpg");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-[#FDF6E3] min-h-screen text-[#1A202C]">
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
        <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">
          🌿 Community Mangrove Watch
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><a href="#about" className="hover:text-[#68D391]">About</a></li>
            <li><a href="#features" className="hover:text-[#68D391]">Features</a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/impact" onClick={() => setMenuOpen(false)}>Impact</Link></a></li>
            <li><a href="#users" className="hover:text-[#68D391]">Users</a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/report" onClick={() => setMenuOpen(false)}>Report</Link></a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></a></li>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-[#2F855A]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 right-0 w-1/3  bg-[#d3fcc6] shadow-lg z-40 rounded-3xl">
          <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-sm text-[#1A202C] justify-end">
            <li><a href="#about" className="hover:text-[#68D391]">About</a></li>
            <li><a href="#features" className="hover:text-[#68D391]">Features</a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/impact" onClick={() => setMenuOpen(false)}>Impact</Link></a></li>
            <li><a href="#users" className="hover:text-[#68D391]">Users</a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/report" onClick={() => setMenuOpen(false)}>Report</Link></a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></a></li>
            <li><a href="" className="hover:text-[#68D391]"><Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link></a></li>
            <li></li>
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
            A participatory monitoring system where communities, NGOs, and authorities
            safeguard mangrove forests with AI validation and gamified participation.
          </p>
          <a href="https://tinyurl.com/hbr6ysmt">
          <button className="bg-[#68D391] text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#2F855A] onClick-co">
            Learn More
          </button>
          </a>
        </section>
      </Parallax>

      {/* About Section */}
      <section id="about" className="py-12 md:py-20 px-5 md:px-8 max-w-5xl mx-auto">
        <h3 className="text-xl md:text-3xl font-bold text-center text-[#2F855A] mb-4 md:mb-8">
          About the Project
        </h3>
        <p className="text-sm md:text-lg leading-relaxed text-center">
          Mangroves protect coasts, biodiversity, and store carbon. But threats like illegal cutting
          and pollution endanger them. Community Mangrove Watch empowers citizens and
          authorities to take swift conservation action.
        </p>
      </section>

      {/* Features Section */}
      <Parallax blur={0} bgImage={bgImage} bgImageAlt="Features" strength={300}>
        <section id="features" className="py-16 md:py-20 px-5 md:px-8 text-white">
          <h3 className="text-xl md:text-3xl font-bold text-center mb-6 md:mb-12">
            Key Features
          </h3>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="p-5 bg-[#FDF6E3]/90 rounded-2xl shadow hover:shadow-lg text-[#1A202C]">
              <h4 className="text-base md:text-xl font-semibold text-[#2F855A] mb-2">📱 Easy Reporting</h4>
              <p className="text-sm md:text-base">Communities report incidents via mobile apps or SMS with geotagged photos.</p>
            </div>
            <div className="p-5 bg-[#FDF6E3]/90 rounded-2xl shadow hover:shadow-lg text-[#1A202C]">
              <h4 className="text-base md:text-xl font-semibold text-[#2F855A] mb-2">🛰 AI + Satellite Validation</h4>
              <p className="text-sm md:text-base">AI cross-checks reports with satellite data to reduce false alarms.</p>
            </div>
            <div className="p-5 bg-[#FDF6E3]/90 rounded-2xl shadow hover:shadow-lg text-[#1A202C]">
              <h4 className="text-base md:text-xl font-semibold text-[#2F855A] mb-2">🏆 Gamified Participation</h4>
              <p className="text-sm md:text-base">Users earn points, badges, and leaderboard rankings for participation.</p>
            </div>
          </div>
        </section>
      </Parallax>

      {/* Additional Content to Make the Page Scrollable */}
<section className="py-12 md:py-20 px-5 md:px-8 max-w-5xl mx-auto">
  <h3 className="text-xl md:text-3xl font-bold text-center text-[#2F855A] mb-4 md:mb-8">
    Why Mangroves Matter
  </h3>
  <p className="text-sm md:text-lg leading-relaxed text-center">
    Mangrove forests act as critical buffers between land and sea, protecting coastal areas
    from erosion and storm surges. They also support a wide range of biodiversity and act as
    vital carbon sinks, absorbing more carbon per hectare than terrestrial forests.
  </p>
</section>
<Parallax blur={0} bgImage={bgImage} bgImageAlt="Features" strength={300}>
<section className="py-12 md:py-20 px-5 md:px-8 max-w-5xl mx-auto " >
  <h3 className="text-xl md:text-3xl font-bold text-center text-white mb-4 md:mb-8">
    How We Involve the Community
  </h3>
  <p className="text-sm md:text-lg leading-relaxed text-center text-white">
    Our platform encourages communities to get involved in protecting mangroves by reporting
    incidents, participating in conservation efforts, and getting rewarded for their actions.
    This participatory approach ensures that local people have a voice in the management
    and preservation of these critical ecosystems.
  </p>
</section>
</Parallax>




      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 Community Mangrove Watch | Built with ❤ at Hackathon</p>
      </footer>
    </div>
  );
}