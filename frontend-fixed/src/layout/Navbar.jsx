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
    <nav className="navbar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: '#0f0f23' }}>
      <div className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img
          src={logos[pathname] || HomeIcon}
          alt="Logo"
          className="navbar-icon"
          style={{ height: '50px', width: '50px', objectFit: 'contain' }}
        />
        <span className="navbar-title" style={{ color: '#00f9ff', fontSize: '1.4rem', fontWeight: 'bold' }}>ChakraX</span>
      </div>
      <div className="navbar-links" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/home" style={{ color: '#e0e0e0', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
        <Link to="/physical" style={{ color: '#e0e0e0', textDecoration: 'none', fontWeight: '500' }}>Physical</Link>
        <Link to="/mental" style={{ color: '#e0e0e0', textDecoration: 'none', fontWeight: '500' }}>Mental</Link>
        <Link to="/vault" style={{ color: '#e0e0e0', textDecoration: 'none', fontWeight: '500' }}>Password</Link>
        <Link to="/cyber" style={{ color: '#e0e0e0', textDecoration: 'none', fontWeight: '500' }}>Cyber</Link>
        <button className="logout-btn" onClick={logout} style={{ marginLeft: '10px' }}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
