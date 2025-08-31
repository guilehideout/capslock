import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";


export default function Leaderboard() {

    // const navigate = useNavigate();

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         navigate("/login"); // redirect if not logged in
    //     }
    // }, [navigate]);

    const [leaders] = useState([
        { name: "Alice Johnson", points: 520, rank: 1 },
        { name: "Michael Chen", points: 480, rank: 2 },
        { name: "Sophia Lee", points: 450, rank: 3 },
        { name: "John Doe", points: 400, rank: 4 },
        { name: "Emma Davis", points: 370, rank: 5 },
    ]);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-200 py-20 px-5">
            <h2
                className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-10"
                data-aos="fade-up"
            >
                🏆 Leaderboard
            </h2>
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                <ul>
                    {leaders.map((leader, index) => (
                        <li
                            key={index}
                            className="flex justify-between items-center px-6 py-4 border-b hover:bg-green-50 transition"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <span className="font-medium text-gray-700">{leader.rank}. {leader.name}</span>
                            <span className="font-bold text-green-700">{leader.points} pts</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
