import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import API from "../api/stockAPI";
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await API.post("/register", {
        name,
        email,
        password,
      });

      navigate("/login");

    } catch (err) {

      setError(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Registration failed"
      );
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-logo">
          <h1>StockPulse AI</h1>
          <p>Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <FaUser />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <div className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
};

export default Register;