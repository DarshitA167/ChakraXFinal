// layout/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/layout.css";
import HomeIcon from "../assets/HomeIcon.png";
import PhysicalIcon from "../assets/PhysicalIcon.png";
import MentalIcon from "../assets/MentalIcon.png";
import PasswordIcon from "../assets/PasswordIcon.png";
import CyberIcon from "../assets/CyberIcon.png";

const logos = {
  "/": HomeIcon,
  "/physical": PhysicalIcon,
  "/mental": MentalIcon,
  "/password": PasswordIcon,
  "/cyber": CyberIcon,
};

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="navbar">
      <img src={logos[currentPath] || HomeIcon} alt="Logo" />
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/physical">Physical</Link>
        <Link to="/mental">Mental</Link>
        <Link to="/password">Password</Link>
        <Link to="/cyber">Cyber</Link>
      </div>
    </nav>
  );
};

export default Navbar;
