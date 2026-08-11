import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Award, Briefcase, Calendar, CheckCircle2, Rocket, Users, Code } from "lucide-react";

interface TimelineItem {
  year: string;
  badge: string;
  title: string;
  role: string;
  description: string;
  highlights: string[];
  techStack: string[];
  icon: React.ReactNode;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: "2026",
    badge: "Full Stack Mastery",
    title: "Mastered Full Stack (MERN)",
    role: "MongoDB, Express, React & Node.js",
    description: "Mastered full-stack web development using the MERN stack, engineering production-ready web applications, RESTful APIs, and scalable backend services.",
    highlights: [
      "Built end-to-end scalable web applications using React, Node.js, Express, and MongoDB.",
      "Implemented secure JWT authentication, state management, and optimized database queries.",
      "Architected modern UI/UX components with seamless responsive layouts and real-time backend integrations.",
    ],
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "MERN Stack", "REST APIs"],
    icon: <Code size={18} color="#00ffcc" />,
  },
  {
    year: "2026",
    badge: "Community & Leadership",
    title: "GDG Prayagraj Volunteer",
    role: "Google Developer Groups Prayagraj Volunteer",
    description: "Selected as a volunteer for Google Developer Groups (GDG), organizing tech workshops, developer meetups, and community hackathons.",
    highlights: [
      "Engaged with the global developer ecosystem and facilitated tech community meetups.",
      "Mentored peers on modern full-stack web technologies and open-source development.",
      "Co-organized technical workshops on web engineering and modern developer tools.",
    ],
    techStack: ["Google Developer Groups", "Community", "Open Source", "Leadership"],
    icon: <Rocket size={18} color="#00ffcc" />,
  },
  {
    year: "2025",
    badge: "Founder & Lead",
    title: "Founded 'Quantum Quirk' Coding Club",
    role: "Centre of Computer Education & Training (CCET)",
    description: "Founded Quantum Quirk — the official coding club of Centre of Computer Education and Training (CCET), University of Allahabad.",
    highlights: [
      "Established an active student coding community focused on web development and problem solving.",
      "Organized peer programming sessions, hackathons, and developer workshops across CCET.",
      "Fostered a collaborative culture of continuous learning and hands-on project creation.",
    ],
    techStack: ["Quantum Quirk", "CCET", "University of Allahabad", "Leadership", "Mentorship"],
    icon: <Users size={18} color="#ffd700" />,
  },
  {
    year: "2024 - 2027",
    badge: "Higher Education",
    title: "Bachelor of Computer Applications (BCA)",
    role: "Centre of Computer Education & Training, University of Allahabad",
    description: "Pursuing BCA degree at CCET, University of Allahabad, specializing in computer science fundamentals, full-stack software development, and modern web architectures.",
    highlights: [
      "Studying Data Structures, Algorithms, Database Management Systems, and Software Engineering.",
      "Architecting full-stack web applications, 3D graphics canvas implementations, and APIs.",
      "Maintaining active academic engagement alongside leadership in university student tech activities.",
    ],
    techStack: ["BCA", "University of Allahabad", "CCET", "Full Stack Dev", "Data Structures"],
    icon: <Briefcase size={18} color="#c084fc" />,
  },
  {
    year: "2024",
    badge: "Senior Secondary",
    title: "Completed Class 12 (PCM & CS)",
    role: "Physics, Chemistry, Mathematics & Computer Science",
    description: "Completed Class 12 with a core focus on Physics, Chemistry, Mathematics (PCM), and Computer Science (CS), laying strong analytical and coding foundations.",
    highlights: [
      "Mastered core concepts in Mathematics, Physics, and Computer Science.",
      "Developed early programming and logic building skills with C++ and Object-Oriented Programming.",
      "Graduated with distinction preparing for higher education in computer applications.",
    ],
    techStack: ["PCM", "Computer Science", "C++", "Mathematics", "Logic & Algorithms"],
    icon: <Award size={18} color="#60a5fa" />,
  },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setLineHeight(rect.height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section id="timeline" ref={containerRef} style={{ position: "relative", overflow: "hidden" }}>
      {/* Glow Orbs */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          right: "-10%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(0, 255, 204, 0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div style={{ textTransform: "uppercase" }}>
          <span className="pro-badge pro-badge-purple">
            <Calendar size={14} /> My Journey
          </span>
        </div>
        <h2 className="pro-section-title" style={{ marginTop: 12 }}>
          Academic & Leadership Timeline
        </h2>
        <p className="pro-section-subtitle">
          A chronological milestone overview of my education at University of Allahabad, community leadership with Quantum Quirk & GDG, and academic accomplishments.
        </p>

        {/* Timeline Scroll Container */}
        <div ref={ref} style={{ position: "relative", marginTop: 60, paddingBottom: 40 }}>
          {/* Static Background Beam Line */}
          <div
            className="timeline-line-bg"
            style={{
              position: "absolute",
              top: 0,
              width: 3,
              height: lineHeight > 0 ? lineHeight : "100%",
              background: "rgba(255, 255, 255, 0.08)",
              borderRadius: 3,
            }}
          />

          {/* Animated Glowing Fill Beam Line */}
          <motion.div
            className="timeline-line-fill"
            style={{
              position: "absolute",
              top: 0,
              width: 3,
              height: heightTransform,
              opacity: opacityTransform,
              background: "linear-gradient(to bottom, #00ffcc 0%, #a855f7 50%, #ffd700 100%)",
              borderRadius: 3,
              boxShadow: "0 0 15px rgba(0, 255, 204, 0.6)",
            }}
          />

          {/* Timeline Nodes & Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 60 }}>
            {TIMELINE_ITEMS.map((item, index) => {
              return (
                <motion.div
                  key={item.year + item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="timeline-grid"
                >
                  {/* Sticky Node Indicator */}
                  <div
                    className="timeline-node"
                    style={{
                      position: "relative",
                      zIndex: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: "rgba(13, 17, 23, 0.9)",
                      border: "2px solid rgba(0, 255, 204, 0.4)",
                      boxShadow: "0 0 20px rgba(0, 255, 204, 0.2)",
                    }}
                  >
                    {item.icon}
                  </div>

                  {/* Pro Timeline Card */}
                  <div className="pro-glass-card" style={{ padding: 32, textAlign: "left" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 12 }}>
                      <div>
                        <span className="pro-badge" style={{ fontSize: "0.75rem", marginBottom: 8 }}>
                          {item.badge}
                        </span>
                        <h3 style={{ fontSize: "1.45rem", fontWeight: 700, color: "#fff", marginTop: 4 }}>
                          {item.title}
                        </h3>
                        <p style={{ color: "#00ffcc", fontSize: "0.95rem", fontWeight: 600, marginTop: 2 }}>
                          {item.role}
                        </p>
                      </div>

                      <div
                        style={{
                          padding: "6px 14px",
                          borderRadius: 20,
                          background: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.08)",
                          color: "#ffd700",
                          fontSize: "0.85rem",
                          fontWeight: 700,
                          letterSpacing: "0.03em",
                        }}
                      >
                        {item.year}
                      </div>
                    </div>

                    <p style={{ color: "#94a3b8", fontSize: "0.98rem", lineHeight: 1.6, marginBottom: 20 }}>
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                      {item.highlights.map((h, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <CheckCircle2 size={16} color="#00ffcc" style={{ marginTop: 3, flexShrink: 0 }} />
                          <span style={{ color: "#cbd5e1", fontSize: "0.92rem", lineHeight: 1.5 }}>
                            {h}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack / Tag Badges */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      {item.techStack.map((tech) => (
                        <span
                          key={tech}
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: 20,
                            background: "rgba(0, 255, 204, 0.06)",
                            border: "1px solid rgba(0, 255, 204, 0.2)",
                            color: "#a5f3fc",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 768px) {
          #timeline div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          #timeline div[style*="left: 28px"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
