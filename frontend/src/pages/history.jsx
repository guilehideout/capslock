import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

function Reports() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [reports, setReports] = useState([
    // Sample data; replace with backend fetch
    { id: 1, name: "Mangrove Degradation", location: "Goa", status: "Pending", date: "2025-08-15" },
    { id: 2, name: "Illegal Logging", location: "Andaman", status: "Validated", date: "2025-08-12" },
    { id: 3, name: "Waste Dumping", location: "Mumbai", status: "Pending", date: "2025-08-10" },
  ]);

  return (
    <div className="bg-[#FDF6E3] min-h-screen text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 md:px-6 py-3 shadow-md bg-[#FDF6E3] fixed top-0 w-full z-50">
        <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-[#68D391]">
          <h1 className="text-lg md:text-2xl font-bold text-[#2F855A]">🌿 ManGrow</h1>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex space-x-6 font-medium text-sm md:text-base text-[#1A202C]">
            <li><Link to="/about" className="hover:text-[#68D391]">About</Link></li>
            <li><Link to="/impact" className="hover:text-[#68D391]">Impact</Link></li>
            <li><Link to="/reports" className="hover:text-[#68D391]">Reports</Link></li>
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
            <li><Link to="/reports" className="hover:text-[#68D391]">Reports</Link></li>
            <li><Link to="/login" className="hover:text-[#68D391]">Login</Link></li>
            <li><Link to="/signup" className="hover:text-[#68D391]">Signup</Link></li>
          </ul>
        </div>
      )}

      {/* Reports Section */}
      <section className="py-12 md:py-20 px-5 md:px-8 max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-4xl font-bold text-[#2F855A] mb-8 text-center">Submitted Reports</h3>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl shadow-lg text-black">
            <thead className="bg-[#68D391] text-white">
              <tr>
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Report Name</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{report.id}</td>
                  <td className="py-2 px-4">{report.name}</td>
                  <td className="py-2 px-4">{report.location}</td>
                  <td className="py-2 px-4">{report.status}</td>
                  <td className="py-2 px-4">{report.date}</td>
                  <td className="py-2 px-4">
                    {report.status === "Pending" && (
                      <button className="bg-[#68D391] text-black px-3 py-1 rounded-lg hover:bg-[#2F855A] transition duration-300">
                        Validate
                      </button>
                    )}
                    {report.status === "Validated" && (
                      <span className="text-green-700 font-semibold">Validated</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
        <p>© 2025 Community Mangrove Watch | Built with ❤ at HackOut'25 by capslock</p>
      </footer>
    </div>
  );
}

export default Reports;
