import "../styles/founderSection.css";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";


export default function FounderSection() {
  return (
    <section className="founder-section">

      <div className="founder-wrapper">

        {/* IMAGE */}
        <div className="founder-image-stack">

          <img
            src="/parthiv.png?v=2"
            alt="Parthiv Chakraborty"
            className="founder-img"
          />

        </div>

        {/* CONTENT */}
        <div className="founder-content">

          <p className="founder-small">Meet The Founder</p>

          <h2 className="neon-text" style={{ display: 'inline-block' }}>Parthiv Chakraborty</h2>
          <br /><br />
          <p>
            As an entrepreneur and content creator, Parthiv has a passion for
            creating exceptional content that resonates with audiences.
          </p>

          <p>
            With a strong background in digital media and social growth, he leads
            the Editiv team to deliver results-driven creative services.
          </p>

        </div>

      </div>

      {/* ================= FOOTER PART ================= */}

      <div className="contact-footer-box">

        <p className="contact-small">CONTACT US</p>

        <h2 className="contact-title">Let’s connect</h2>

        <div className="contact-buttons">

          <a href="#" className="contact-btn primary">
            Book Call
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="contact-btn secondary"
          >
            Chat On Whatsapp
          </a>

        </div>

        <div className="footer-strip">

          <div className="social-icons">
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedinIn />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
              <FaYoutube />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>

          <p className="footer-copy">
            EditIV © {new Date().getFullYear()}. All Rights Reserved.
          </p>

        </div>

      </div>

    </section>
  );
}
