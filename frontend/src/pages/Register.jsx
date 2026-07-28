import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import API from "../api/stockAPI";
import "../styles/register.css";

function Rule({ ok, text }) {
  return (
    <div className="rule">
      {ok ? (
        <FaCheckCircle className="green" />
      ) : (
        <FaTimesCircle className="red" />
      )}

      <span>{text}</span>
    </div>
  );
}

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const checks = {
    length: password.length >= 6 && password.length <= 12,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[@$!%*?&.#_-]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;

  const strengthLabel = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Excellent",
  ][strength];

  const strengthPercentage = (strength / 5) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{6,12}$/;

    if (!passwordRegex.test(password)) {
      setError(
        "Password must be 6-12 characters and include uppercase, lowercase, number and special character."
      );
      return;
    }

    try {
      const response = await API.post("/register", {
        name,
        email,
        password,
      });

      setSuccess(
        response.data.message ||
          "Registration Successful! Redirecting..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-logo">
          <h1>📈 StockPulse AI</h1>
          <p>Create Your Account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaEnvelope className="input-icon" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-strength">
            <div className="strength-bar">
              <div
                className={`strength-fill level-${strength}`}
                style={{
                  width: `${strengthPercentage}%`,
                }}
              ></div>
            </div>

            <p>
              Password Strength :
              <strong> {strengthLabel}</strong>
            </p>
          </div>

          <div className="password-rules">
            <Rule
              ok={checks.length}
              text="6 - 12 Characters"
            />

            <Rule
              ok={checks.upper}
              text="Uppercase Letter"
            />

            <Rule
              ok={checks.lower}
              text="Lowercase Letter"
            />

            <Rule
              ok={checks.number}
              text="One Number"
            />

            <Rule
              ok={checks.special}
              text="Special Character"
            />
          </div>

          {error && (
            <div className="error">
              {error}
            </div>
          )}

          {success && (
            <div className="success">
              {success}
            </div>
          )}

          <button
            className="register-btn"
            disabled={strength < 5}
          >
            {strength < 5
              ? "Complete Password Requirements"
              : "Create Account"}
          </button>
        </form>

        <div className="register-footer">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
