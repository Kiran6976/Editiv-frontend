import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/admin.css";

import API from "../config/api";


export default function FolderItems() {

  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (id) {
      fetchItems();
    }
  }, [id]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/portfolio?folderId=${id}`);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch items error:", err.response || err);
    }
  };


  const handleDelete = async (itemId) => {

    const token = localStorage.getItem("adminToken");

    await axios.delete(
      `${API}/admin/portfolio/${itemId}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setItems(items.filter(i => i._id !== itemId));
  };

  return (
    <div>

      <h2 className="section-title">Folder Projects</h2>

      <div className="folder-grid">

        {items.map(item => (
          <div key={item._id} className="folder-card">

            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>

            <button
              className="logout-btn"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}
