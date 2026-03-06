import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash2, FiImage } from "react-icons/fi";
import "../styles/folderItems.css";
import API from "../config/api";

export default function FolderItems() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (id) {
      fetchItems();
      fetchFolderName();
    }
  }, [id]);

  const fetchFolderName = async () => {
    try {
      const res = await axios.get(`${API}/folders`);
      const folder = res.data.find(f => f._id === id);
      if (folder) setFolderName(folder.name);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/portfolio?folderId=${id}`);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch items error:", err.response || err);
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Delete this project?")) return;
    const token = localStorage.getItem("adminToken");
    try {
      setDeletingId(itemId);
      await axios.delete(`${API}/admin/portfolio/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(items.filter(i => i._id !== itemId));
    } catch (err) {
      alert("Error deleting project");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="fi-wrapper">

      {/* Header */}
      <div className="fi-header">
        <button className="fi-back-btn" onClick={() => navigate("/admin/folders")}>
          <FiArrowLeft />
          <span>Back to Folders</span>
        </button>

        <div className="fi-title-row">
          <h2 className="fi-title">{folderName || "Folder Projects"}</h2>
          <span className="fi-count">{items.length} {items.length === 1 ? "project" : "projects"}</span>
        </div>
      </div>

      {/* Empty state */}
      {items.length === 0 && (
        <div className="fi-empty">
          <FiImage className="fi-empty-icon" />
          <p>No projects in this folder yet.</p>
        </div>
      )}

      {/* Grid */}
      <div className="fi-grid">
        {items.map(item => (
          <div key={item._id} className="fi-card">

            <div className="fi-card-image">
              <img src={item.image} alt={item.title} />
            </div>

            <div className="fi-card-body">
              <p className="fi-card-title">{item.title}</p>
              <button
                className="fi-delete-btn"
                onClick={() => handleDelete(item._id)}
                disabled={deletingId === item._id}
              >
                <FiTrash2 />
                {deletingId === item._id ? "Deleting…" : "Delete"}
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
