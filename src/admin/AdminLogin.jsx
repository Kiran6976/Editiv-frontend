import { useState } from "react";
import axios from "axios";
import "../styles/adminLogin.css";
import API from "../config/api";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/admin/login`, {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="al-wrapper">

      {/* Background glow orbs */}
      <div className="al-orb al-orb-1" />
      <div className="al-orb al-orb-2" />

      <div className="al-card">

        {/* Logo / Brand */}
        <div className="al-brand">
          <img src="/Editiv.png" alt="EditIV" className="al-logo" />
          <p className="al-brand-label">Admin Portal</p>
        </div>

        <h2 className="al-title">Welcome back</h2>
        <p className="al-subtitle">Sign in to manage your workspace</p>

        {error && (
          <div className="al-error">
            <span>⚠ {error}</span>
          </div>
        )}

        <form className="al-form" onSubmit={handleLogin}>

          <div className="al-field">
            <FiMail className="al-field-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="al-field">
            <FiLock className="al-field-icon" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? (
              <span className="al-spinner" />
            ) : (
              <>
                <FiLogIn /> Sign In
              </>
            )}
          </button>

        </form>

        <p className="al-footer">EditIV © {new Date().getFullYear()}</p>

      </div>
    </div>
  );
}
