import { useEffect, useState } from "react";
import "../styles/navbar.css";
import { FiBriefcase, FiBarChart2, FiDollarSign, FiGrid, FiMail } from "react-icons/fi";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-glass" : ""}`}>
      <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src="/Editiv.png" alt="EditIV Logo" />
      </div>


      <ul className="nav-links">
        <li onClick={() => scrollTo("portfolio")}><FiBriefcase /> Portfolio</li>
        <li onClick={() => scrollTo("results")}><FiBarChart2 /> Results</li>
        <li onClick={() => scrollTo("services")}><FiGrid /> Services</li>
        <li onClick={() => scrollTo("pricing")}><FiDollarSign /> Pricing</li>
        <li onClick={() => scrollTo("contact")}><FiMail /> Contact</li>
      </ul>
    </nav>
  );
}
