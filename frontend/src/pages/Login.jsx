import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import API from "../api/stockAPI";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await API.post("/login", {
        email,
        password,
      });

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
          <h1>StockPulse AI</h1>
          <p>AI Powered Indian Stock Market Analytics</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="input-group">
            <FaLock />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
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
            className="login-btn"
          >
            Login
          </button>

        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}