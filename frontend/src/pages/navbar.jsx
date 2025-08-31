import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
      <a href="/" className="hover:text-[#68D391]"><Link to="/" onClick={() => setMenuOpen(false)}>
       <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">
          🌿 ManGrow
        </h1></Link></a>

      {/* Desktop Nav */}
      <nav className="hidden md:flex">
        <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
          <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
          {/* <li><Link to="#features" className="hover:text-[#68D391]">Features</Link></li> */}
          <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
          {/* <li><Link to="#users" className="hover:text-[#68D391]">Users</Link></li> */}
          <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
          <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
        </ul>
      </nav>

      {/* Mobile Hamburger */}
      <button className="md:hidden text-[#2F855A]" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 right-0 w-1/3  bg-[#d3fcc6] shadow-lg z-40 rounded-3xl">
          <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-sm text-[#1A202C]">
            <li><Link to="#about" className="hover:text-[#68D391]">About</Link></li>
            {/* <li><Link to="#features" className="hover:text-[#68D391]">Features</Link></li> */}
            <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
            {/* <li><Link to="#users" className="hover:text-[#68D391]">Users</Link></li> */}
            <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
