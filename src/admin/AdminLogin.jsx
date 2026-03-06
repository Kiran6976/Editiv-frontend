import { useState } from "react";
import axios from "axios";
import "../styles/adminLogin.css";
import API from "../config/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/admin/login`, {
        email,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);

      // later redirect to dashboard
      window.location.href = "/admin/dashboard";

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="admin-login-wrapper">

      <form className="admin-login-card glass glow" onSubmit={handleLogin}>

        <h2>Admin Login</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-neon">
          Login
        </button>

      </form>

    </div>
  );
}
