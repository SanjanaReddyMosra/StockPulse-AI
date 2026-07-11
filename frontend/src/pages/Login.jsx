import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import API from "../api/stockAPI";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

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
        "Invalid Email or Password"
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">

          <h1>📈 StockPulse AI</h1>

          <p>
            AI Powered Indian Stock Market Analytics
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="input-group">

            <FaEnvelope className="input-icon" />

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

            <FaLock className="input-icon" />

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
            >

              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}

            </button>

          </div>

          {error && (

            <div className="error">

              {error}

            </div>

          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >

            {loading
              ? "Signing In..."
              : "Login"}

          </button>

        </form>

        <div className="login-footer">

          <p>

            Don't have an account?

            <Link to="/register">

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}