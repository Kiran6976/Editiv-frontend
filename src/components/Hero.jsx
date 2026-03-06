import "../styles/hero.css";
import { FiPlay } from "react-icons/fi";
import { FiArrowUpRight } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { useCountUp } from "./ScrollAnimations";

/* ── Animated 3D Mesh Wave (Canvas) ── */
function MeshWave() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = 50;
    const rows = 30;

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      const spacingX = W / cols;
      const spacingY = H / rows;

      // Build grid points
      const points = [];
      for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
          const x = c * spacingX;
          const baseY = r * spacingY;

          // Wave displacement
          const wave1 = Math.sin((c * 0.15) + time * 0.8) * 18;
          const wave2 = Math.cos((r * 0.12) + time * 0.6) * 14;
          const wave3 = Math.sin((c * 0.08 + r * 0.06) + time * 0.4) * 10;
          const y = baseY + wave1 + wave2 + wave3;

          // Depth factor for perspective
          const depth = r / rows;
          const perspY = H * 0.15 + (y - H * 0.15) * (0.3 + depth * 0.7);
          const perspX = W * 0.5 + (x - W * 0.5) * (0.4 + depth * 0.6);

          row.push({ x: perspX, y: perspY, depth });
        }
        points.push(row);
      }

      // Draw wireframe
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          const alpha = 0.08 + p.depth * 0.45;
          const green = Math.floor(180 + p.depth * 75);

          ctx.strokeStyle = `rgba(0, ${green}, 136, ${alpha})`;
          ctx.lineWidth = 0.5 + p.depth * 0.8;

          // Horizontal lines
          if (c < cols - 1) {
            const next = points[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(next.x, next.y);
            ctx.stroke();
          }

          // Vertical lines
          if (r < rows - 1) {
            const below = points[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(below.x, below.y);
            ctx.stroke();
          }
        }
      }

      // Draw bright dots at intersections (only some)
      for (let r = 0; r < rows; r += 3) {
        for (let c = 0; c < cols; c += 3) {
          const p = points[r][c];
          const dotAlpha = 0.3 + p.depth * 0.6;
          const dotSize = 1 + p.depth * 2.5;

          ctx.fillStyle = `rgba(0, 255, 136, ${dotAlpha})`;
          ctx.shadowColor = "rgba(0, 255, 136, 0.6)";
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      time += 0.015;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-mesh-canvas" />;
}

/* ── Floating Dots ── */
function FloatingDots() {
  const dots = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    size: 3 + Math.random() * 8,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
    opacity: 0.2 + Math.random() * 0.5,
  }));

  return (
    <div className="floating-dots" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="float-dot"
          style={{
            left: d.left,
            top: d.top,
            width: `${d.size}px`,
            height: `${d.size}px`,
            opacity: d.opacity,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

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
      {/* Dark BG with subtle radial */}
      <div className="hero-bg" aria-hidden="true" />

      {/* Floating neon dots */}
      <FloatingDots />

      {/* 3D Mesh Wave Graphic */}
      <div className="hero-mesh-wrap" aria-hidden="true">
        <MeshWave />
        <div className="mesh-glow" />
      </div>

      {/* Abstract glow orbs */}
      <div className="hero-abstract" aria-hidden="true">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="grain" />
      </div>

      {/* ── CONTENT ── */}
      <div className="hero-content">
        {/* Badge */}
        <div className={`hero-badge ${loaded ? "animate-in" : ""}`}>
          Performance + Creative Studio
          <span className="dot" />
        </div>

        {/* Heading */}
        <h1 className={`hero-heading ${loaded ? "animate-in" : ""}`}>
          We Engineer <span className="neon">Growth</span>
          <br />
          for Modern Brands
        </h1>

        {/* CTAs */}
        <div className={`hero-actions ${loaded ? "animate-in" : ""}`}>
          <button className="btn-glass-primary" onClick={handleWhatsApp}>
            Let's Talk Growth <FiArrowUpRight />
          </button>

          <button className="btn-ghost" onClick={openShowreel} aria-label="Watch showreel">
            Watch Showreel <FiPlay className="ghost-play-icon" />
          </button>
        </div>

        {/* Stat Cards Row */}
        <div className={`hero-stat-cards ${loaded ? "animate-in" : ""}`}>
          <div className="stat-card-hero">
            <span className="stat-val">+128%</span>
            <span className="stat-lbl">Campaign Lift</span>
          </div>
          <div className="stat-card-hero">
            <span className="stat-val">1,240</span>
            <span className="stat-lbl">Leads Generated</span>
          </div>
          <div className="stat-card-hero">
            <span className="stat-val">300+</span>
            <span className="stat-lbl">Creative Output</span>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div className={`hero-bottom-bar ${loaded ? "animate-in" : ""}`}>
          <div className="bottom-metric">
            <span className="bm-num">{clientCount}+</span>
            <span className="bm-label"> Clients</span>
          </div>
          <div className="bottom-divider" />
          <div className="bottom-metric">
            <span className="bm-num">{roasCount}x</span>
            <span className="bm-label"> Avg ROAS</span>
          </div>
          <div className="bottom-divider" />
          <div className="bottom-metric">
            <span className="bm-num">₹{adSpendCount}Cr+</span>
            <span className="bm-label"> Ad Spend</span>
          </div>
        </div>
      </div>
    </section>
  );
}
