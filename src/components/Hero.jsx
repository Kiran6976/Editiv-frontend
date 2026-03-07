import { useEffect, useRef, useState } from "react";
import { FiPlay, FiArrowUpRight, FiHeart, FiMessageCircle, FiShare2, FiThumbsUp } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";
import { useCountUp } from "./ScrollAnimations";
import "../styles/hero.css";


/* ── Removed 3D Floating Elements ── */

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  // Count-up animations
  const clientCount = useCountUp(40, loaded, 2200);
  const roasCount = useCountUp(3, loaded, 1800);
  const adSpendCount = useCountUp(2, loaded, 2000);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const WHATSAPP_NUMBER = "919436452223";
    const message = "Hi Editiv Agency! I want to discuss growth for my business.";
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const openShowreel = () => {
    window.open(
      "https://www.instagram.com/reel/DSrBdItgXBA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section className={`hero ${loaded ? "hero-loaded" : ""}`} id="home">
      {/* ── BACKGROUND ── */}
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-network-bg" aria-hidden="true">
        <img src="/3d/hero_dark_crystal_bg.png" alt="" />
        {/* CSS particle nodes overlay */}
        <div className="network-nodes" />
      </div>

      {/* Abstract glow orbs */}
      <div className="hero-abstract" aria-hidden="true">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="grain" />
      </div>

      {/* ── GLASS PANEL ── */}
      <div className="hero-glass-panel">

        {/* ── CONTENT ── */}
        <div className="hero-content">
          {/* Badge */}
          <div className={`hero-badge ${loaded ? "animate-in" : ""}`}>
            Performance + Creative Studio
            <span className="dot" />
          </div>

          {/* Heading */}
          <h1 className={`hero-heading ${loaded ? "animate-in" : ""}`}>
            We Engineer <span className="neon-text">Growth</span>
            <br />
            for Modern Brands
          </h1>

          {/* CTA Buttons */}
          <div className={`hero-cta ${loaded ? "animate-in" : ""}`}>
            <a className="btn-primary" onClick={handleWhatsApp}>
              Let's Talk Growth <FiArrowUpRight className="arrow" />
            </a>
            <button className="btn-secondary" onClick={openShowreel}>
              Watch Showreel <FiPlay className="ghost-play-icon" />
            </button>
          </div>

          {/* Hero Stats Container */}
          <div className={`hero-stats-wrap ${loaded ? "animate-in" : ""}`}>
            {/* Upper boxes */}
            <div className="hero-stats-upper">
              <div className="stat-box">
                <span className="stat-val">+128%</span>
                <span className="stat-label">Campaign Lift</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">1,240</span>
                <span className="stat-label">Leads Generated</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">300+</span>
                <span className="stat-label">Creative Output</span>
              </div>
            </div>

            {/* Lower wide bar */}
            <div className={`hero-stats-lower ${loaded ? "animate-in" : ""}`}>
              <div className="bm-item">
                <span className="bm-val">
                  {clientCount}
                  <span style={{ color: "var(--neon)" }}>+</span>
                </span>
                <span className="bm-label"> Clients</span>
              </div>
              <div className="bm-divider" />
              <div className="bm-item">
                <span className="bm-val">
                  {roasCount}
                  <span style={{ color: "var(--neon)" }}>x</span>
                </span>
                <span className="bm-label"> Avg ROAS</span>
              </div>
              <div className="bm-divider" />
              <div className="bm-item">
                <span className="bm-val">
                  ₹{adSpendCount}
                  <span style={{ color: "var(--neon)" }}>Cr+</span>
                </span>
                <span className="bm-label"> Ad Spend</span>
              </div>
            </div>
          </div>
        </div> {/* End hero content */}
      </div> {/* End glass panel */}

    </section>
  );
}
