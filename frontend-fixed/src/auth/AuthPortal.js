import React, { useState } from "react";
import {
  Eye, EyeOff, Lock, User, Mail, Zap, ChevronRight, Fingerprint
} from "lucide-react";
import { loginUser, registerUser } from "../services/auth";
import "../styles/auth.css";
import logo from "../assets/LOGOMAIN.png";

const AuthPortal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const res = await loginUser(formData.username, formData.password);
        alert("✅ " + res.data.message);
        localStorage.setItem("token", res.data.tokens.access);
        console.log("Logged in user:", res.data.user);
      } else {
        if (formData.password !== formData.confirmPassword) {
          alert("❌ Passwords do not match!");
          return;
        }
        const res = await registerUser(
          formData.username,
          formData.email,
          formData.password
        );
        alert("✅ " + res.data.message + " Please login now.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("❌ " + (err.response?.data?.error || "Something went wrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="logo">
          <img src={logo} alt="ChakraX" />
          <h1>Chakra<span className="highlight">X</span></h1>
          <p>Advanced Security Platform</p>
        </div>

        <div className="tabs">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            <Lock /> Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            <User /> Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="input-group">
              <User className="input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div className="input-group">
            <Mail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-group">
            <Lock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          {!isLogin && (
            <div className="input-group">
              <Lock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          )}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              "Processing..."
            ) : (
              <>
                <Zap /> {isLogin ? "Secure Access" : "Create Account"}
                <ChevronRight />
              </>
            )}
          </button>
          {isLogin && (
            <div className="biometric">
              <Fingerprint /> Biometric Authentication
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthPortal;
