import { useEffect, useRef } from "react";
import "../styles/logoslider.css";

const logos = [
  "/logos/logo1.png",
  "/logos/logo2.jpg",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.jpg",
  "/logos/logo6.jpg",
  "/logos/logo7.png",
  "/logos/logo8.png",
  "/logos/logo9.png",
  "/logos/logo10.png",
  "/logos/logo11.png",
  "/logos/logo12.png",
  "/logos/logo13.jpg",
];

/* ── Particle Canvas ── */
function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* Build particles */
    const COUNT = 80;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.6 + Math.random() * 2.2,        // radius 0.6–2.8 px
      speedY: -(0.08 + Math.random() * 0.22),    // slow upward drift
      speedX: (Math.random() - 0.5) * 0.12,     // gentle lateral drift
      opacity: 0.15 + Math.random() * 0.55,
      pulse: Math.random() * Math.PI * 2,       // phase offset for twinkle
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        /* twinkle */
        p.pulse += 0.012;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        /* glow */
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.5);
        grd.addColorStop(0, `rgba(0,255,148,${alpha})`);
        grd.addColorStop(1, `rgba(0,255,148,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        /* core dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,255,148,${Math.min(alpha + 0.2, 1)})`;
        ctx.fill();

        /* drift */
        p.y += p.speedY;
        p.x += p.speedX;

        /* wrap — re-enter from bottom when off top */
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="logo-particle-canvas" />;
}

export default function LogoSlider() {
  return (
    <section className="logo-wrapper">
      {/* Particle background */}
      <ParticleBackground />

      {/* Content */}
      <div className="logo-content">
        <h2>
          Brands That <span className="neon-text">Trust Us</span>
        </h2>

        <div className="logo-slider">
          <div className="logo-track">
            {[...logos, ...logos].map((logo, i) => (
              <img key={i} src={logo} alt="brand" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
