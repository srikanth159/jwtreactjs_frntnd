// Navbar.js
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common["Authorization"] = ""; // Remove token from headers
        navigate("/");  // Redirect to login page
    };

    return (
        <nav>
            <h2>Navbar</h2>
            {/* You can add other navigation links here */}
            <button onClick={handleLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
