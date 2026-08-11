import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import profileImg from "/img.jpg";
import LiquidEther from "./LiquidEther";
import { Music, Pause, Play, Download, Code, Cpu, Globe, ArrowDownRight } from "lucide-react";

export default function Hero() {
  const [showAlert, setShowAlert] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [playing, setPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // MOBILE ALERT
  useEffect(() => {
    if (window.innerWidth <= 768) {
      setShowAlert(true);
    }

    const audio = audioRef.current;
    if (audio) {
      audio.loop = true;
      audio.volume = 0.3;
      audio.muted = true;
      audio.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setPlaying(false);
      });
    }
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.muted = false;
      audio.play().catch(() => console.log("Play blocked"));
      setPlaying(true);
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(120px, 15vh, 160px) clamp(20px, 6vw, 80px) 80px",
        }}
      >
        {/* ⚡ LIQUID ETHER CANVAS BACKGROUND */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <LiquidEther />
        </div>

        {/* 🎵 BACKGROUND AUDIO PLAYER */}
        <audio ref={audioRef} src="/tech-background.mp3" loop autoPlay />

        {/* 🎵 MUSIC FLOATING CONTROL BUTTON */}
        <motion.button
          onClick={toggleMusic}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            position: "absolute",
            top: 100,
            right: 30,
            zIndex: 20,
            padding: "10px 18px",
            borderRadius: 30,
            border: "1px solid rgba(0, 255, 204, 0.3)",
            background: "rgba(13, 17, 23, 0.75)",
            backdropFilter: "blur(12px)",
            color: "#00ffcc",
            fontWeight: 600,
            fontSize: "0.85rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 0 20px rgba(0, 255, 204, 0.15)",
          }}
        >
          <Music size={16} />
          {playing ? "Pause Music" : "Play Music"}
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </motion.button>

        {/* MAIN HERO CONTENT GRID */}
        <div
          className="hero-content hero-grid"
          style={{
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* LEFT COLUMN: INTRO TEXT & CTA */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Badge */}
            <div style={{ marginBottom: 20 }}>
              <span className="pro-badge pro-badge-gold" style={{ display: "inline-flex", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ffd700", boxShadow: "0 0 8px #ffd700" }} />
                Available for Freelance & Full-time
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Hi, I'm{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00ffcc 0%, #a5f3fc 50%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Animesh Pathak
              </span>
            </h1>

            <h2
              style={{
                marginTop: 18,
                fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                fontWeight: 600,
                color: "#cbd5e1",
                display: "flex",
                alignItems: "center",
                gap: 10,
                flexWrap: "wrap",
              }}
            >
              Full Stack Developer <span style={{ color: "#00ffcc" }}>•</span> 3D Web Specialist
            </h2>

            <p
              style={{
                marginTop: 20,
                fontSize: "1.08rem",
                lineHeight: 1.7,
                color: "#94a3b8",
                maxWidth: 540,
              }}
            >
              I architect high-performance, animated, and scalable digital products — combining creative 3D shaders with robust backend systems.
            </p>

            {/* Action Buttons */}
            <div
              className="hero-cta-group"
              style={{
                marginTop: 36,
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px 28px",
                  borderRadius: 30,
                  background: "linear-gradient(135deg, #00ffcc 0%, #00bfa6 100%)",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 0 30px rgba(0, 255, 204, 0.4)",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Explore Selected Works <ArrowDownRight size={18} />
              </motion.button>

              <motion.a
                href="/Animesh_Resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: "14px 28px",
                  borderRadius: 30,
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  color: "#ffffff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  backdropFilter: "blur(12px)",
                  textDecoration: "none",
                }}
              >
                <Download size={18} color="#00ffcc" /> Download CV
              </motion.a>
            </div>

            {/* Quick Tech Highlights Pills */}
            <div style={{ marginTop: 45, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: "0.82rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Core Stack:
              </span>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["React 19", "Three.js", "TypeScript", "Node.js", "PostgreSQL"].map((tech) => (
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

          {/* RIGHT COLUMN: HOLOGRAPHIC PROFILE FRAME */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Holographic Glowing Outer Rings */}
            <div
              style={{
                position: "absolute",
                width: "350px",
                height: "350px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(0, 255, 204, 0.2) 0%, rgba(168, 85, 247, 0.15) 50%, transparent 70%)",
                filter: "blur(20px)",
                zIndex: 0,
              }}
            />

            {/* Profile Container */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <motion.img
                src={profileImg}
                alt="Animesh Pathak"
                loading="eager"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="hero-image"
                style={{
                  width: "clamp(260px, 30vw, 340px)",
                  height: "clamp(260px, 30vw, 340px)",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid rgba(0, 255, 204, 0.8)",
                  boxShadow: "0 0 60px rgba(0, 255, 204, 0.4), inset 0 0 20px rgba(0, 255, 204, 0.2)",
                }}
              />

              {/* Floating Stat Badge Left */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  bottom: 20,
                  left: -30,
                  background: "rgba(13, 17, 23, 0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(0, 255, 204, 0.3)",
                  borderRadius: 16,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <Code size={20} color="#00ffcc" />
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>100% Modern</div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>React 19 & WebGL</div>
                </div>
              </motion.div>

              {/* Floating Stat Badge Right */}
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 20,
                  right: -20,
                  background: "rgba(13, 17, 23, 0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(168, 85, 247, 0.3)",
                  borderRadius: 16,
                  padding: "10px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                }}
              >
                <Cpu size={20} color="#c084fc" />
                <div>
                  <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>Scalable</div>
                  <div style={{ fontSize: "0.72rem", color: "#94a3b8" }}>Microservices & APIs</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MOBILE EXPERIENCE ALERT MODAL */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.8)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 25 }}
              style={{
                background: "rgba(13, 17, 23, 0.95)",
                border: "1px solid rgba(0, 255, 204, 0.3)",
                borderRadius: 24,
                padding: 30,
                maxWidth: 340,
                textAlign: "center",
                boxShadow: "0 0 50px rgba(0,255,204,0.3)",
              }}
            >
              <div style={{ marginBottom: 12 }}>
                <Globe size={36} color="#00ffcc" style={{ margin: "0 auto" }} />
              </div>

              <h3 style={{ color: "#00ffcc", marginBottom: 10, fontSize: "1.25rem", fontWeight: 700 }}>
                Enhanced View Available 💻
              </h3>

              {!showHelp ? (
                <>
                  <p style={{ fontSize: "0.9rem", color: "#cbd5e1", lineHeight: 1.5 }}>
                    For maximum 3D visual fidelity and liquid shader animations, desktop view is recommended.
                  </p>

                  <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
                    <button
                      onClick={() => setShowHelp(true)}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: 20,
                        border: "none",
                        background: "#00ffcc",
                        color: "#000",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Guide Me
                    </button>
                    <button
                      onClick={() => setShowAlert(false)}
                      style={{
                        flex: 1,
                        padding: "10px 16px",
                        borderRadius: 20,
                        border: "1px solid rgba(0, 255, 204, 0.3)",
                        background: "transparent",
                        color: "#00ffcc",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.6 }}>
                    👉 Tap <b>⋮</b> in your browser menu<br />
                    👉 Enable <b>Desktop site</b> mode
                  </p>

                  <button
                    onClick={() => setShowAlert(false)}
                    style={{
                      width: "100%",
                      padding: "10px 16px",
                      borderRadius: 20,
                      border: "none",
                      background: "#00ffcc",
                      color: "#000",
                      fontWeight: 700,
                      marginTop: 20,
                      cursor: "pointer",
                    }}
                  >
                    Got it 👍
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
