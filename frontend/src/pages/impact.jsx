import { Link } from "react-router-dom"; // For navigation
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Import the icons for the hamburger menu

function About() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="bg-[#FDF6E3] min-h-screen text-white"
      style={{
        backgroundImage: `url('/bg_web.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
        <a href="/" className="hover:text-[#68D391]"><Link to="/" onClick={() => setMenuOpen(false)}>
          <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">
            🌿 ManGrow
          </h1></Link></a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
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
          <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-sm text-[#1A202C]">
            <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
            <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
            <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
          </ul>
        </div>
      )}

      {/* Impact Section */}
      <section className="py-12 md:py-20 px-5 md:px-8 max-w-6xl mx-auto text-center">
        <h3 className="text-xl md:text-3xl font-bold text-white mb-4">Impact of Community Mangrove Watch 🌍</h3>
        <p className="text-sm md:text-lg leading-relaxed mb-15">
          Our initiative empowers individuals, communities, and organizations to actively protect and restore mangrove ecosystems. From reporting environmental threats to leading restoration efforts, the impact of this collective action is shaping a sustainable future for coastal communities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-10">Real-Time Monitoring</h4>
            <p>Our platform has facilitated the submission of thousands of citizen reports worldwide, helping local authorities respond to environmental threats in real-time. Community participation ensures quicker intervention and more effective protection for mangrove ecosystems.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-10">Mangrove Restoration</h4>
            <p>Thanks to the efforts of local communities and organizations, over **[X]** hectares of mangrove forests have been restored, contributing to biodiversity preservation and enhancing coastal protection against storms and floods.</p>
          </div>
        </div>

        <p className="text-sm md:text-lg leading-relaxed mt-6">
          We've also seen a significant increase in global awareness and advocacy for mangrove protection. Through educational campaigns and partnerships, we've reached over **[Y]** people, urging them to take action to preserve these vital ecosystems.
        </p>

        <p className="text-sm md:text-lg leading-relaxed mt-6">
          As we continue to grow, our mission remains focused on expanding our reach, improving our technology, and increasing global participation in mangrove conservation efforts.
        </p>
      </section>

      {/* Additional Sections */}
      <section className="py-12 md:py-20 px-5 md:px-8 max-w-6xl mx-auto text-center">
        <h3 className="text-xl md:text-3xl font-bold text-white mb-6">Community Participation 🌱</h3>
        <p className="text-sm md:text-lg leading-relaxed mb-6">
          Volunteers, students, and local communities play an active role in monitoring mangrove areas, participating in restoration drives, and reporting illegal activities. Every effort counts in sustaining these ecosystems.
        </p>

        <h3 className="text-xl md:text-3xl font-bold text-white mb-6">Education & Awareness 📚</h3>
        <p className="text-sm md:text-lg leading-relaxed mb-6">
          Our awareness campaigns educate people about the importance of mangroves, biodiversity, and climate protection. Workshops, webinars, and school programs are helping spread knowledge globally.
        </p>

        <h3 className="text-xl md:text-3xl font-bold text-white mb-6">Future Goals 🚀</h3>
        <p className="text-sm md:text-lg leading-relaxed mb-6">
          Expanding our coverage to new regions, integrating advanced monitoring technology, and increasing global volunteer participation are among our key future goals. Together, we aim to make a measurable impact on coastal sustainability.
        </p>

        <div className="mt-8">
          <Link to="https://www.worldwildlife.org/initiatives/mangroves-for-community-and-climate">
            <button className="bg-[#68D391] text-black px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#2F855A] transition duration-300">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 Community Mangrove Watch | Built with ❤ at HackOut'25 by capslock</p>
      </footer>
    </div>
  );
}

export default About;
