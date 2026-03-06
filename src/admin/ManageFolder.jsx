import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/managePortfolio.css";
import { FiTrash2 } from "react-icons/fi";


import API from "../config/api";


export default function ManageFolders() {

  const [folders, setFolders] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [editFolder, setEditFolder] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders();
  }, []);

  // ================= FETCH FOLDERS + PROJECT COUNT =================

  const fetchFolders = async () => {
    try {
      const foldersRes = await axios.get(`${API}/folders`);
      const portfolioRes = await axios.get(`${API}/portfolio`);

      const foldersData = foldersRes.data;
      const portfolioData = portfolioRes.data;

      const updatedFolders = foldersData.map(folder => {
        const count = portfolioData.filter(
          item => String(item.folderId) === String(folder._id)
        ).length;

        return {
          ...folder,
          projectCount: count
        };
      });

      setFolders(updatedFolders);

    } catch (err) {
      console.error("Fetch folders error:", err);
    }
  };

  // ================= DELETE FOLDER =================

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this folder and all projects?")) return;

    const token = localStorage.getItem("adminToken");

    try {
      await axios.delete(`${API}/admin/folder/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setFolders(prev => prev.filter(f => f._id !== id));

    } catch (err) {
      alert("Error deleting folder");
    }
  };

  // ================= EDIT HANDLERS =================

  const openEditModal = (folder) => {
    setEditFolder(folder);
    setNewName(folder.name);
    setNewImage(null);
    setShowEdit(true);
  };

  const handleUpdateFolder = async () => {

    const token = localStorage.getItem("adminToken");

    const formData = new FormData();
    formData.append("name", newName);
    if (newImage) formData.append("image", newImage);

    try {
      await axios.put(
        `${API}/admin/folder/${editFolder._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setShowEdit(false);
      fetchFolders();

    } catch (err) {
      alert("Error updating folder");
    }
  };

  // ================= UI =================

  return (
    <div className="manage-wrapper">

      <div className="manage-header">
        <h2 className="manage-title">Manage Portfolio</h2>
        <p className="manage-sub">Click a folder to view and manage its projects</p>
      </div>

      <div className="folder-grid">

        {folders.map(folder => (

          <div key={folder._id} className="folder-card">

            {/* IMAGE + EDIT + COUNT PILL */}
            <div className="folder-image-box">

              <img
                src={folder.coverImage || folder.image}
                alt={folder.name}
                onClick={() => navigate(`/admin/folder/${folder._id}`)}
              />

              <button
                className="edit-folder-btn"
                onClick={() => openEditModal(folder)}
              >
                ✎
              </button>

              <span className="folder-count-pill">
                {folder.projectCount} {folder.projectCount === 1 ? "Project" : "Projects"}
              </span>

            </div>

            {/* INFO ROW */}
            <div className="folder-info">
              <div className="folder-name">{folder.name}</div>
              <button
                className="delete-folder-btn icon-btn"
                onClick={() => handleDelete(folder._id)}
              >
                <FiTrash2 />
                Delete
              </button>
            </div>

          </div>

        ))}

      </div>


      {/* ================= EDIT MODAL ================= */}

      {showEdit && (
        <div className="edit-modal">

          <div className="edit-box">

            <h3>Edit Folder</h3>

            <input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Folder Name"
            />

            <input
              type="file"
              onChange={e => setNewImage(e.target.files[0])}
            />

            <button className="btn-main" onClick={handleUpdateFolder}>
              Update Folder
            </button>

            <button
              className="btn-cancel"
              onClick={() => setShowEdit(false)}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
