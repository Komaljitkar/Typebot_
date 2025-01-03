import React, { useState } from "react";
import "../login/login.css";
import arrow from "../asset/arrow_back.png";
import GoogleI from "../asset/Google Icon.png";
import Triangle from "../asset/Group 2 tringle1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onBack }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const validateInputs = () => {
    const newErrors = {};

    // Username validation
    if (isSignUp && (!formData.username || formData.username.trim() === "")) {
      newErrors.username = "Username is required.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match.";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/login";

    try {
      const response = await axios.post(`http://localhost:5000${endpoint}`, formData);

      alert(response.data.message);

      // On successful login, redirect to the dashboard with username
      if (!isSignUp) {
        const { username } = response.data;
        navigate("/dashboard", { state: { username } });
      }
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="container">
      <div className="Triangle">
        <img src={Triangle} alt="triangle" />
      </div>
      <button className="back-button" onClick={onBack}>
        <img src={arrow} alt="Back" />
      </button>

      <div className="login-container">
        <form onSubmit={handleFormSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter a username"
                value={formData.username}
                onChange={handleInputChange}
                className={errors.username ? "error-border" : ""}
                required
              />
              {errors.username && (
                <span className="error-text">{errors.username}</span>
              )}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className={errors.email ? "error-border" : ""}
              required
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>
          )}
          <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
          <p style={{ textDecoration: "none", fontSize: "12px" }}> OR</p>
          <button className="google-button">
            <img src={GoogleI} alt="icon" className="Gicon" /> Sign In With Google
          </button>
        </form>
        <p>
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ color: "#1A5FFF", cursor: "pointer" }}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setIsSignUp(!isSignUp)}
                style={{ color: "#1A5FFF", cursor: "pointer" }}
              >
                Register now
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
