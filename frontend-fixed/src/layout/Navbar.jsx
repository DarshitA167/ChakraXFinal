import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

import HomeIcon from "../assets/HomeIcon.png";
import PhysicalIcon from "../assets/PhysicalIcon.png";
import MentalIcon from "../assets/MentalIcon.png";
import PasswordIcon from "../assets/PasswordIcon.png";
import CyberIcon from "../assets/CyberIcon.png";

const logos = {
  "/home": HomeIcon,
  "/physical": PhysicalIcon,
  "/mental": MentalIcon,
  "/vault": PasswordIcon,
  "/cyber": CyberIcon,
};

const Navbar = () => {
  const { pathname } = useLocation();
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src={logos[pathname] || HomeIcon}
          alt="Logo"
          className="navbar-icon"
        />
        
        <span className="navbar-title">ChakraX</span>
      </div>
      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/physical">Physical</Link>
        <Link to="/mental">Mental</Link>
        <Link to="/vault">Password</Link>
        <Link to="/cyber">Cyber</Link>
        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
