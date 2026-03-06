import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import PortfolioModal from "../components/PortfolioModal";   // ✅ added
import "../styles/portfolioGallery.css";

import API from "../config/api";


export default function PortfolioFolder() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);   // ✅ added

  useEffect(() => {
    fetchItems();
  }, [id]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/portfolio?folderId=${id}`);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch projects error:", err);
    }
  };

  return (
    <section className="portfolio-section">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back to folders
      </button>

      <div className="project-grid">

        {items.map(item => (

          <div
            key={item._id}
            className="project-card"
            onClick={() => setSelectedItem(item)}   // ✅ open modal
          >

            <img src={item.image} alt={item.title} />

            <h4>{item.title}</h4>

          </div>

        ))}

      </div>

      {/* ✅ Modal */}
      {selectedItem && (
        <PortfolioModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

    </section>
  );
}
