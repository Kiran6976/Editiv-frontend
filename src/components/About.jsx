import "../styles/about.css";
import ScrollReveal, { useScrollReveal, useCountUp } from "./ScrollAnimations";

export default function About() {
  const [statsRef, statsVisible] = useScrollReveal({ threshold: 0.3 });

  const yearsCount = useCountUp(2, statsVisible, 1500);
  const brandsCount = useCountUp(50, statsVisible, 2000);
  const storiesCount = useCountUp(100, statsVisible, 2200);

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* LEFT: Text */}
        <ScrollReveal animation="fade-right" className="about-text">
          <p className="about-section-label">
            <span className="neon-text">ABOUT US</span>
          </p>

          <h2 className="about-heading">Our Story</h2>

          <p className="about-para">
            Editiv Agency started with one simple belief: <br />
            <strong>Good marketing should feel natural, not forced.</strong>
          </p>

          <p className="about-para">
            Over the last <strong>2+ years</strong>, we've partnered with{" "}
            <strong>50+ clients</strong>, helping them grow through design,
            video, and smart digital marketing. We blend creativity with data to
            deliver work that looks good <strong>and</strong> works well.
          </p>

          <h3 className="about-subheading">What Drives Us</h3>

          <p className="about-para">
            We are driven by ideas that stand out, visuals that speak, and
            strategies that bring real results. For us, marketing isn't noise —
            it's storytelling with intent.
          </p>
        </ScrollReveal>

        {/* RIGHT: Image */}
        <ScrollReveal animation="fade-left" delay={200} className="about-image">
          <img src="/About .avif" alt="About Editiv Agency" />
        </ScrollReveal>
      </div>

      {/* Stats */}
      <div className="about-stats" ref={statsRef}>
        <div className={`stat-card ${statsVisible ? "stat-animate" : ""}`} style={{ transitionDelay: "0ms" }}>
          <h3 className="stat-number neon-text">{yearsCount}+</h3>
          <p className="stat-label">Years of Impact</p>
        </div>

        <div className={`stat-card ${statsVisible ? "stat-animate" : ""}`} style={{ transitionDelay: "150ms" }}>
          <h3 className="stat-number neon-text">{brandsCount}+</h3>
          <p className="stat-label">Brands Powered</p>
        </div>

        <div className={`stat-card ${statsVisible ? "stat-animate" : ""}`} style={{ transitionDelay: "300ms" }}>
          <h3 className="stat-number neon-text">{storiesCount}+</h3>
          <p className="stat-label">Countless Stories Told</p>
        </div>
      </div>
    </section>
  );
}
