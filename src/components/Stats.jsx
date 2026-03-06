import { useEffect, useState } from "react";
import "../styles/stats.css";

const statsData = [
  { label: "Views", value: 25000000 },
  { label: "Watch Time (Hours)", value: 200000 },
  { label: "Audience", value: 10000000 },
];

export default function Stats() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    statsData.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 20);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(counter);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(start);
          return updated;
        });
      }, 20);
    });
  }, []);

  const format = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M+";
    if (num >= 1000) return (num / 1000).toFixed(0) + "K+";
    return num;
  };

  return (
    <section className="stats-wrapper">
      <h2>
        Numbers that speak <span className="neon-text">louder than words</span>
      </h2>

      <div className="stats-bar glass">

  {statsData.map((stat, i) => (
    <div key={i} className="stat-box">

      <div className="stat-number">
        {format(counts[i])}
      </div>

      <div className="stat-label">
        {stat.label}
      </div>

    </div>
  ))}

</div>

    </section>
  );
}
