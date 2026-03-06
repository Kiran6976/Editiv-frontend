import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";
import {
  FiGrid,
  FiPlusCircle,
  FiFolderPlus,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";

const navItems = [
  { to: "/admin/dashboard", icon: FiGrid, label: "Dashboard" },
  { to: "/admin/add-portfolio", icon: FiPlusCircle, label: "Add Portfolio" },
  { to: "/admin/folders", icon: FiFolderPlus, label: "Manage Portfolio" },
  { to: "/admin/bookings", icon: FiCalendar, label: "Bookings" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <aside className="sidebar">

      {/* Brand */}
      <div className="sb-brand">
        <img src="/Editiv.png" alt="EditIV" className="sb-logo" />
        <span className="sb-tag">Admin</span>
      </div>

      {/* Nav */}
      <nav className="sb-nav">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sb-link ${isActive ? "sb-active" : ""}`}
          >
            <Icon className="sb-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button className="sb-logout" onClick={logout}>
        <FiLogOut />
        <span>Logout</span>
      </button>

    </aside>
  );
}
