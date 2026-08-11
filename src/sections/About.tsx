import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Rocket, Lightbulb, Users, ShieldCheck, Terminal, Layers, Database } from "lucide-react";

const introText =
  "I am Animesh Pathak — a Full Stack Web Developer building high-performance, scalable, and visually compelling web applications with modern engineering practices.";

const journeyText =
  "My journey started with a deep curiosity for interactive digital experiences. Over time, I mastered frontend graphics, microservices architecture, cloud databases, and WebGL animations to engineer end-to-end production systems.";

const CORE_VALUES = [
  { icon: <Code size={20} color="#00ffcc" />, title: "Clean Architecture", desc: "Writing clean, modular, and maintainable TypeScript & React codebases." },
  { icon: <Rocket size={20} color="#ffd700" />, title: "Performance First", desc: "Optimizing Web Vitals, asset size, and server response times for instant paints." },
  { icon: <Lightbulb size={20} color="#c084fc" />, title: "Creative Graphics", desc: "Leveraging Three.js and custom shaders to craft unique 3D web experiences." },
  { icon: <Database size={20} color="#60a5fa" />, title: "Backend Systems", desc: "Engineering secure REST/GraphQL APIs with PostgreSQL, Mongo, and Node.js." },
  { icon: <ShieldCheck size={20} color="#34d399" />, title: "Security & Trust", desc: "Enforcing modern OAuth, JWT authentication, and secure HTTPS data flows." },
  { icon: <Users size={20} color="#f472b6" />, title: "User-Centric UX", desc: "Designing intuitive responsive interfaces tailored for web and mobile users." },
];

const STAT_METRICS = [
  { label: "Years Experience", value: "3+", color: "#00ffcc" },
  { label: "Repositories & Projects", value: "15+", color: "#ffd700" },
  { label: "Core Technologies", value: "12+", color: "#c084fc" },
  { label: "Code Quality Rating", value: "99%", color: "#60a5fa" },
];

export default function About() {
  const [intro, setIntro] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (intro.length < introText.length) {
      const t = setTimeout(() => {
        setIntro((prev) => prev + introText[prev.length]);
      }, 25);
      return () => clearTimeout(t);
    } else {
      setShowContent(true);
    }
  }, [intro]);

  return (
    <section id="about" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Title */}
        <div style={{ textTransform: "uppercase" }}>
          <span className="pro-badge pro-badge-purple">
            <Terminal size={14} /> Engineering Background
          </span>
        </div>
        <h2 className="pro-section-title" style={{ marginTop: 12 }}>
          About Me & Core Pillars
        </h2>
        <p className="pro-section-subtitle">
          Passionate about turning complex requirements into seamless, lightning-fast digital solutions.
        </p>

        {/* STATS METRICS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
            marginBottom: 50,
          }}
        >
          {STAT_METRICS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="pro-glass-card"
              style={{
                padding: "24px 20px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2.4rem", fontWeight: 800, color: stat.color, marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* TYPEWRITER BIO INTRO */}
        <div className="pro-glass-card" style={{ padding: "36px 40px", marginBottom: 50, textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Layers size={22} color="#00ffcc" />
            <h3 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#fff" }}>Developer Bio</h3>
          </div>

          <p style={{ fontSize: "1.15rem", lineHeight: 1.7, color: "#e2e8f0" }}>
            {intro}
            <span className="cursor">|</span>
          </p>

          <p style={{ fontSize: "1.02rem", lineHeight: 1.7, color: "#94a3b8", marginTop: 16 }}>
            {journeyText}
          </p>
        </div>

        {/* CORE ENGINEERING PILLARS */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 30 }}>
                Core Engineering Pillars
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: 24,
                }}
              >
                {CORE_VALUES.map((cv, idx) => (
                  <motion.div
                    key={cv.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                    className="pro-glass-card"
                    style={{
                      padding: 24,
                      textAlign: "left",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                    }}
                  >
                    <div
                      style={{
                        padding: 12,
                        borderRadius: 14,
                        background: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        flexShrink: 0,
                      }}
                    >
                      {cv.icon}
                    </div>
                    <div>
                      <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", marginBottom: 6 }}>
                        {cv.title}
                      </h4>
                      <p style={{ fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.5 }}>
                        {cv.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
