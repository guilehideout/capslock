import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function ReportForm() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [bgImage, setBgImage] = useState("/bg_web.jpg");
  const [menuOpen, setMenuOpen] = useState(false);

  // Update background image based on screen size
  useEffect(() => {
    const handleResize = () => {
      setBgImage(window.innerWidth < 768 ? "/bg_img.jpg" : "/bg_web.jpg");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("description", description);
      formData.append("location", location);

      const res = await fetch("http://localhost:8000/api/v1/report", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();
      console.log(data); // { code: 2000, data: publicUrl, message: "Image uploaded successfully" }

      alert("Report submitted successfully!");
      // Reset form
      setImage(null);
      setDescription("");
      setLocation("");
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
            {/* <li><a href="/about" className="hover:text-[#68D391]">About</a></li> */}
            {/* <li><a href="#features" className="hover:text-[#68D391]">Features</a></li> */}
            {/* <li><a href="/impact" className="hover:text-[#68D391]">Impact</a></li> */}
            {/* <li><a href="#users" className="hover:text-[#68D391]">Users</a></li> */}
            {/* <li><a href="/report" className="hover:text-[#68D391]">Report</a></li> */}
            {/* <li><a href="/login" className="hover:text-[#68D391]">Login</a></li> */}
            {/* <li><a href="/signup" className="hover:text-[#68D391]">Signup</a></li> */}
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        {/* <button className="md:hidden text-[#2F855A]" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button> */}
      </header>

      {/* Mobile Menu */}
      {/* {menuOpen && ( */}
        {/* <div className="md:hidden fixed top-14 right-0 w-1/3 bg-[#d3fcc6] shadow-lg z-40 rounded-3xl"> */}
          {/* <ul className="flex flex-col items-center space-y-4 py-6 font-medium text-sm text-[#1A202C] justify-end"> */}
            {/* <li><a href="/about" className="hover:text-[#68D391]">About</a></li> */}
            {/* <li><a href="#features" className="hover:text-[#68D391]">Features</a></li> */}
            {/* <li><a href="/impact" className="hover:text-[#68D391]">Impact</a></li> */}
            {/* <li><a href="#users" className="hover:text-[#68D391]">Users</a></li> */}
            {/* <li><a href="/report" className="hover:text-[#68D391]">Report</a></li> */}
            {/* <li><a href="/login" className="hover:text-[#68D391]">Login</a></li> */}
            {/* <li><a href="/signup" className="hover:text-[#68D391]">Signup</a></li> */}
          {/* </ul> */}
        {/* </div> */}
    //  

      {/* Report Form Section */}
      <div
        className="flex items-center justify-center min-h-screen bg-cover bg-center p-4"
        style={{ backgroundImage: `url('${bgImage}')` }}
      >
        <div className="bg-white/90 shadow-xl rounded-2xl p-6 sm:p-8 md:p-10 w-full max-w-sm sm:max-w-md border border-green-100">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 text-center mb-6">
            🌱 Submit Mangrove Report
          </h1>

          {error && <p className="text-red-600 text-xs sm:text-sm text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe the incident..."
              ></textarea>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter location or coordinates"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl shadow hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#2F855A] text-white text-center py-5 mt-12 text-xs md:text-sm">
       <p>© 2025 Community Mangrove Watch | Built with ❤ at HackOut'25 by capslock</p>
      </footer>
    </div>
  );
}

export default ReportForm;
