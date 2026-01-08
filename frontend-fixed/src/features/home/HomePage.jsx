import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";

import PhysicalIcon from "../../assets/PhysicalIcon.png";
import MentalIcon from "../../assets/MentalIcon.png";
import PasswordIcon from "../../assets/PasswordIcon.png";
import CyberIcon from "../../assets/CyberIcon.png";

const tiles = [
  {
    title: "Physical Security",
    description: "Scan and analyze your health symptoms using smart tools.",
    icon: PhysicalIcon,
    link: "/physical",
  },
  {
    title: "Mental Health",
    description: "Take quizzes and detect early signs of stress or burnout.",
    icon: MentalIcon,
    link: "/mental",
  },
  {
    title: "Password Vault",
    description: "Secure and manage your passwords with biometrics.",
    icon: PasswordIcon,
    link: "/vault",
  },
  {
    title: "Cyber Threats",
    description: "Check email breaches, phishing, and more with one scan.",
    icon: CyberIcon,
    link: "/cyber",
  },
];

const Home = () => {
  return (
    <div className="home-container">
  <h1 className="dashboard-title">
    Welcome to <span className="highlight">ChakraX</span>
  </h1>
  <p className="dashboard-subtitle">Your all-in-one security dashboard</p>

  <div className="tile-grid">
    <Link to="/physical" className="tile">
      <img src={PhysicalIcon} alt="Physical Section" className="tile-icon" />
      <h3>Physical Section</h3>
      <p>Boost your physical resilience with posture analysis, body scan, and personalized suggestions.</p>
    </Link>

    <Link to="/mental" className="tile">
      <img src={MentalIcon} alt="Mental Section" className="tile-icon" />
      <h3>Mental Section</h3>
      <p>Take mind-bending quizzes, AI support, and get early stress or burnout alerts.</p>
    </Link>

    <Link to="/cyber" className="tile">
      <img src={CyberIcon} alt="Email Security Section" className="tile-icon" />
      <h3>Email Security</h3>
      <p>Scan your email for data breaches, phishing links, and suspicious domains.</p>
    </Link>

    <Link to="/vault" className="tile">
      <img src={PasswordIcon} alt="Password Security Section" className="tile-icon" />
      <h3>Password Security</h3>
      <p>Secure your credentials with biometric vaults, strength meters, and anti-shoulder-surfing.</p>
    </Link>
  </div>

  <div className="author-section">
    <p>
      Crafted by <span className="author-name"><h1> Darshit   J.   Ayar </h1> </span>  
      
      

      Cybersecurity Enthusiast, Future Unicorn Startup Builder , and AstroLover 🌌

    </p>
  </div>
</div>

  );
};

export default Home;
