import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [stats, setStats] = useState({ users: 0, videos: 0, categories: 0 });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login"); // Redirect to login if no token
                    return;
                }

                const headers = { Authorization: `Bearer ${token}` };

                const users = await axios.get('http://localhost:5000/api/users', { headers });
                const videos = await axios.get('http://localhost:5000/api/videos', { headers });
                const categories = await axios.get('http://localhost:5000/api/categories', { headers });

                setStats({
                    users: users.data.length,
                    videos: videos.data.length,
                    categories: categories.data.length,
                });
            } catch (err) {
                console.error("Error fetching stats:", err.response?.data || err.message);
                setError(err.response?.data?.message || "Unauthorized access");
            }
        };

        fetchStats();
    }, [navigate]);

    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Users: {stats.users}</p>
            <p>Total Videos: {stats.videos}</p>
            <p>Total Categories: {stats.categories}</p>
        </div>
        
    );
};

export default Dashboard;
