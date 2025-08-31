import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

function About() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bgImage, setBgImage] = useState("/bg_web.jpg");
  const [isMobile, setIsMobile] = useState(false);
  const [bgOffset, setBgOffset] = useState(0); // For parallax

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setBgImage("/bg_img.jpg");
        setIsMobile(true);
      } else {
        setBgImage("/bg_web.jpg");
        setIsMobile(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax effect
  useEffect(() => {
    if (!isMobile) {
      const handleScroll = () => {
        setBgOffset(window.scrollY * 0.5); // Adjust 0.5 for slower background scroll
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  const sections = [
    {
      title: "About Community ManGrow",
      text: "Community Mangrove Watch is an initiative that empowers individuals and communities to protect mangrove ecosystems through citizen-driven reporting and conservation efforts. Mangroves are crucial for coastal protection, biodiversity, and climate regulation, but they’re facing threats like deforestation and pollution.",
      image: "/one.jpg",
    },
    {
      title: "Why It Matters",
      text: (
        <>
          Mangroves are vital for:
          <ul className="list-disc list-inside mt-2">
            <li><strong>Climate Change Mitigation</strong>: Absorb carbon and protect against storms.</li>
            <li><strong>Coastal Protection</strong>: Safeguard communities from erosion and flooding.</li>
            <li><strong>Biodiversity</strong>: Support unique species of wildlife.</li>
          </ul>
        </>
      ),
      image: "/two.jpg",
    },
    {
      title: "Join the Community",
      text: "Get involved in protecting mangroves. Participate in reporting, conservation activities, and awareness programs to make a tangible impact.",
      image: "/third.jpg",
    },
  ];

  return (
    <div
      className="min-h-screen text-white"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: `center ${bgOffset}px`,
        backgroundAttachment: isMobile ? "scroll" : "fixed", // Parallax on desktop only
      }}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-opacity-80 bg-[#FDF6E3] fixed top-0 w-full z-50 backdrop-blur-sm">
        <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#68D391]">
          <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">🌿 ManGrow</h1>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
            <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
            <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
          </ul>
        </nav>

        <button className="md:hidden text-[#2F855A]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 right-0 w-2/3 bg-[#d3fcc6] shadow-lg z-40 rounded-3xl">
          <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-sm text-[#1A202C]">
            <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
            <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
            <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
          </ul>
        </div>
      )}

      {/* Sections */}
      <main className="pt-28">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className={`flex flex-col md:flex-row items-center my-16 px-5 md:px-16 ${
              idx % 2 === 0 ? "" : "md:flex-row-reverse"
            }`}
          >
            {/* Image */}
            <div
              className="md:w-1/2 mb-6 md:mb-0"
              data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-auto rounded-xl shadow-lg border-3 border-white"
              />
            </div>

            {/* Text */}
            <div
              className="md:w-1/2 md:pl-10 md:pr-10 text-center md:text-left"
              data-aos={idx % 2 === 0 ? "fade-left" : "fade-right"}
            >
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              <p className="text-base md:text-lg">{section.text}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="bg-[#2F855A] bg-opacity-90 text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 ManGrow | Built with ❤ at HackOut'25 by capslock</p>
      </footer>
    </div>
  );
}

export default About;
