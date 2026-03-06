import "../styles/founderSection.css";
import { FaLinkedinIn, FaYoutube, FaInstagram } from "react-icons/fa";


export default function FounderSection() {
  return (
    <section className="founder-section">

      <div className="founder-wrapper">

        {/* IMAGE STACK */}
        <div className="founder-image-stack">

          <div className="stack glow"></div>
          <div className="stack layer"></div>

          <img
            src="/founder.png"
            alt="Founder"
            className="founder-img"
          />

          <div className="social-badge">
            Ayushman Pandita <br />
            <span>400,000+</span>
          </div>

        </div>

        {/* CONTENT */}
        <div className="founder-content">

          <p className="founder-small">Meet The Founder</p>

          <h2>Ayushman Pandita</h2>

          <h4>250,000+ Youtube | 150,000+ Instagram</h4>

          <p>
            As an entrepreneur and content creator, Ayushman has a passion for
            creating exceptional content that resonates with audiences. His journey
            began in February 2021 when he started making finance videos on YouTube.
          </p>

          <p>
            After his success on YouTube, he launched Instagram in August 2022 and
            scaled to 1 lakh followers in under 4 months. He holds a BTech in
            Computer Science and previously worked at HSBC and BharatPe.
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
