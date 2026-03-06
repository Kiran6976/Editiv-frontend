import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

export default function Sidebar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="sidebar">

      <h2 className="admin-logo">Admin Panel</h2>

      <Link to="/admin/dashboard">Dashboard</Link>
      <Link to="/admin/add-portfolio">Add Portfolio</Link>
      <Link to="/admin/folders">Manage Portfolio</Link>
      <Link to="/admin/bookings">📅 Bookings</Link>


      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

    </div>
  );
}
