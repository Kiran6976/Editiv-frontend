import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/addPortfolio.css";

import API from "../config/api";


export default function AddPortfolio() {
  const token = localStorage.getItem("adminToken");

  const [folders, setFolders] = useState([]);
  const [showCreateFolder, setShowCreateFolder] = useState(false);

  // portfolio form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [folderId, setFolderId] = useState("");
  const [image, setImage] = useState(null);

  // ✅ preview URL for portfolio image
  const [imagePreview, setImagePreview] = useState("");

  // folder form
  const [folderName, setFolderName] = useState("");
  const [folderImage, setFolderImage] = useState(null);

  // ✅ preview URL for folder image
  const [folderPreview, setFolderPreview] = useState("");

  // ✅ loading states
  const [uploading, setUploading] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);

  // =========================
  // Fetch folders
  // =========================
  const fetchFolders = async () => {
    try {
      const res = await axios.get(`${API}/folders`);
      setFolders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  // =========================
  // ✅ Handle file changes (with preview)
  // =========================
  const handlePortfolioImageChange = (e) => {
    const file = e.target.files?.[0];
    setImage(file || null);

    // clear old preview
    if (imagePreview) URL.revokeObjectURL(imagePreview);

    if (!file) {
      setImagePreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setImagePreview(url);
  };

  const handleFolderImageChange = (e) => {
    const file = e.target.files?.[0];
    setFolderImage(file || null);

    // clear old preview
    if (folderPreview) URL.revokeObjectURL(folderPreview);

    if (!file) {
      setFolderPreview("");
      return;
    }

    const url = URL.createObjectURL(file);
    setFolderPreview(url);
  };

  // ✅ cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (folderPreview) URL.revokeObjectURL(folderPreview);
    };
  }, [imagePreview, folderPreview]);

  // =========================
  // Create folder
  // =========================
  const handleCreateFolder = async () => {
    if (!folderName || !folderImage) {
      alert("Folder name & thumbnail required");
      return;
    }

    const formData = new FormData();
    formData.append("name", folderName);
    formData.append("image", folderImage);

    try {
      setCreatingFolder(true);

      const res = await axios.post(`${API}/admin/folder`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // add new folder in dropdown
      setFolders((prev) => [res.data, ...prev]);

      // auto select
      setFolderId(res.data._id);

      // reset + hide
      setFolderName("");
      setFolderImage(null);

      if (folderPreview) URL.revokeObjectURL(folderPreview);
      setFolderPreview("");

      setShowCreateFolder(false);
    } catch (err) {
      console.error(err.response);
      alert(err.response?.data?.error || "Error");
    } finally {
      setCreatingFolder(false);
    }
  };

  // =========================
  // Upload portfolio
  // =========================
  const handleUploadPortfolio = async () => {
    if (!title || !folderId || !image) {
      alert("Title, Folder & Image required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("folderId", folderId);
    formData.append("image", image);

    try {
      setUploading(true);

      await axios.post(`${API}/admin/portfolio`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Portfolio Uploaded!");

      setTitle("");
      setDescription("");
      setImage(null);

      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImagePreview("");
    } catch (err) {
      alert(err.response?.data?.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="add-portfolio-container">
      <h2 className="section-title">Add Portfolio</h2>

      <div className="portfolio-box">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={folderId} onChange={(e) => setFolderId(e.target.value)}>
          <option value="">Select Folder</option>
          {folders.map((folder) => (
            <option key={folder._id} value={folder._id}>
              {folder.name}
            </option>
          ))}
        </select>

        <span
          className="create-folder-toggle"
          onClick={() => setShowCreateFolder(!showCreateFolder)}
        >
          + Create New Folder
        </span>

        {/* CREATE FOLDER SECTION */}
        {showCreateFolder && (
          <div className="create-folder-box">
            <input
              type="text"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFolderImageChange}
            />

            {/* ✅ Folder image preview */}
            {folderPreview && (
              <div className="image-preview">
                <img src={folderPreview} alt="Folder Preview" />
              </div>
            )}

            <button
              className="btn-neon"
              onClick={handleCreateFolder}
              disabled={creatingFolder}
            >
              {creatingFolder ? (
                <span className="btn-loading">
                  <span className="spinner" />
                  Creating...
                </span>
              ) : (
                "Create Folder"
              )}
            </button>
          </div>
        )}

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handlePortfolioImageChange}
        />

        {/* ✅ Portfolio image preview */}
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Portfolio Preview" />
          </div>
        )}

        <button
          className="btn-main"
          onClick={handleUploadPortfolio}
          disabled={uploading}
        >
          {uploading ? (
            <span className="btn-loading">
              <span className="spinner" />
              Uploading...
            </span>
          ) : (
            "Upload Portfolio"
          )}
        </button>
      </div>
    </div>
  );
}
