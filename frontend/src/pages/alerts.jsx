import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Alerts() {

  // const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login"); // redirect if not logged in
  //   }
  // }, [navigate]);

  const [alerts] = useState([
    { title: "Mangrove Fire Risk", message: "A fire alert was issued in Goa coast. Stay safe & report incidents.", time: "2 hrs ago" },
    { title: "Illegal Cutting", message: "Reports of illegal cutting in Sundarbans detected. Please verify.", time: "5 hrs ago" },
    { title: "Flood Warning", message: "Heavy rain expected tomorrow, possible mangrove flooding.", time: "1 day ago" },
  ]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-100 to-orange-200 py-20 px-5">
      <h2
        className="text-3xl md:text-4xl font-bold text-center text-red-700 mb-10"
        data-aos="fade-up"
      >
        🚨 Alerts
      </h2>
      <div className="max-w-3xl mx-auto space-y-5">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <h3 className="text-lg md:text-xl font-semibold text-red-700">{alert.title}</h3>
            <p className="text-gray-600 mt-2">{alert.message}</p>
            <p className="text-xs text-gray-400 mt-3">{alert.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

