import Sidebar from "./Sidebar";
import "../styles/admin.css";

export default function AdminLayout({ children }) {
  return (
    <div className="admin-container">

      <Sidebar />

      <div className="admin-content">
        {children}
      </div>

    </div>
  );
}
