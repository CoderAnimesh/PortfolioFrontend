import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { Cpu, Layers, Server, Wrench } from "lucide-react";

interface SkillItem {
  name: string;
  value: number;
  category: "frontend" | "backend" | "database" | "tools";
  level: "Expert" | "Advanced" | "Proficient";
}

const SKILLS_DATA: SkillItem[] = [
  // Frontend & 3D
  { name: "React 19", value: 92, category: "frontend", level: "Expert" },
  { name: "TypeScript", value: 88, category: "frontend", level: "Advanced" },
  { name: "JavaScript ES6+", value: 90, category: "frontend", level: "Expert" },
  { name: "Three.js / R3F", value: 84, category: "frontend", level: "Advanced" },
  { name: "Framer Motion", value: 91, category: "frontend", level: "Expert" },
  { name: "HTML5 / CSS3", value: 95, category: "frontend", level: "Expert" },

  // Backend & Cloud
  { name: "Node.js", value: 86, category: "backend", level: "Advanced" },
  { name: "Express.js", value: 85, category: "backend", level: "Advanced" },
  { name: "RESTful APIs", value: 90, category: "backend", level: "Expert" },
  { name: "JWT Auth", value: 88, category: "backend", level: "Advanced" },

  // Database & Security
  { name: "PostgreSQL", value: 82, category: "database", level: "Advanced" },
  { name: "MongoDB", value: 80, category: "database", level: "Proficient" },

  // DevOps & Tools
  { name: "Git & GitHub", value: 92, category: "tools", level: "Expert" },
  { name: "Docker", value: 78, category: "tools", level: "Proficient" },
  { name: "Linux / Terminal", value: 82, category: "tools", level: "Advanced" },
  { name: "Vite / Build Tools", value: 88, category: "tools", level: "Advanced" },
];

/* 🌟 SKILL CIRCLE COMPONENT */
function SkillCircle({ value, name, level }: { value: number; name: string; level: string }) {
  const progress = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  const radius = 64;
  const strokeWidth = 9;
  const size = 160;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const safeId = name.replace(/[^a-zA-Z0-9]/g, "");

  useEffect(() => {
    const controls = animate(progress, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="pro-glass-card"
      style={{
        padding: "24px 18px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size}>
          <defs>
            <linearGradient id={`grad-${safeId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#00ffcc" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* ROTATING DASHED ORBIT */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius + 7}
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth={1.5}
            fill="none"
            strokeDasharray="5 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "50% 50%" }}
          />

          {/* Background Track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* PROGRESS RING */}
          <motion.circle
            cx={center}
            cy={center}
            r={radius}
            stroke={`url(#grad-${safeId})`}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{
              strokeDashoffset: circumference - (circumference * displayValue) / 100,
            }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            style={{
              filter: "drop-shadow(0 0 10px rgba(0, 255, 204, 0.4))",
            }}
          />

          {/* Percentage */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize="22"
            fontWeight="800"
          >
            {displayValue}%
          </text>
        </svg>
      </div>

      {/* Title & Level */}
      <h3 style={{ marginTop: 14, fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
        {name}
      </h3>
      <span
        style={{
          marginTop: 6,
          fontSize: "0.72rem",
          fontWeight: 600,
          padding: "3px 10px",
          borderRadius: 20,
          background: "rgba(0, 255, 204, 0.08)",
          border: "1px solid rgba(0, 255, 204, 0.2)",
          color: "#00ffcc",
          textTransform: "uppercase",
        }}
      >
        {level}
      </span>
    </motion.div>
  );
}

/* 🌟 MAIN SKILLS SECTION */
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "database" | "tools">("all");

  const filteredSkills = SKILLS_DATA.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  return (
    <section id="skills" style={{ position: "relative", overflow: "hidden" }}>
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0, 255, 204, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Title */}
        <div style={{ textTransform: "uppercase" }}>
          <span className="pro-badge pro-badge-gold">
            <Cpu size={14} /> Technical Arsenal
          </span>
        </div>
        <h2 className="pro-section-title" style={{ marginTop: 12 }}>
          Skills & Tech Matrix
        </h2>
        <p className="pro-section-subtitle">
          An interactive matrix of language proficiencies, frontend frameworks, backend runtimes, and developer tooling.
        </p>

        {/* Filter Categories */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 44,
            flexWrap: "wrap",
          }}
        >
          {[
            { id: "all", label: "All Technologies", icon: <Layers size={14} /> },
            { id: "frontend", label: "Frontend & 3D", icon: <Cpu size={14} /> },
            { id: "backend", label: "Backend Systems", icon: <Server size={14} /> },
            { id: "database", label: "Databases & Auth", icon: <Layers size={14} /> },
            { id: "tools", label: "DevOps & Tools", icon: <Wrench size={14} /> },
          ].map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 22px",
                  borderRadius: 30,
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  background: isActive
                    ? "linear-gradient(135deg, #ffd700 0%, #00ffcc 100%)"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isActive ? "#000" : "#94a3b8",
                  border: isActive ? "none" : "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: isActive ? "0 0 25px rgba(255, 215, 0, 0.3)" : "none",
                  cursor: "pointer",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Bento Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: 20,
          }}
        >
          {filteredSkills.map((skill) => (
            <SkillCircle key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
