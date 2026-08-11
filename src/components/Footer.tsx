import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, MapPin, Send, ArrowUp, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import axios from "axios";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);
    setLoading(true);

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://backend-141c.onrender.com";
      await axios.post(`${backendUrl}/api/contact`, {
        name,
        email,
        message,
      });

      setStatus({ type: "success", text: "Thank you! Your message has been sent successfully." });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus({ type: "error", text: "Failed to send message. Please try again or reach out via email." });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      style={{
        position: "relative",
        background: "linear-gradient(180deg, #030303 0%, #080c14 100%)",
        padding: "120px 20px 40px",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(circle, rgba(0, 255, 204, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* LOADER OVERLAY */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              style={{
                width: 60,
                height: 60,
                border: "4px solid rgba(255, 255, 255, 0.1)",
                borderTop: "4px solid #00ffcc",
                borderRadius: "50%",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: 60,
            alignItems: "flex-start",
            marginBottom: 80,
          }}
        >
          {/* LEFT COLUMN: CONTACT INFO & SOCIALS */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ textAlign: "left" }}
          >
            <span className="pro-badge pro-badge-gold" style={{ marginBottom: 16 }}>
              <Sparkles size={14} /> Get in Touch
            </span>

            <h2
              style={{
                fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                background: "linear-gradient(135deg, #ffffff 0%, #ffd700 50%, #00ffcc 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 16,
              }}
            >
              Let’s Build Something Amazing
            </h2>

            <p style={{ color: "#94a3b8", fontSize: "1.05rem", lineHeight: 1.6, marginBottom: 36, maxWidth: 480 }}>
              Have a project in mind, an opportunity to discuss, or just want to connect? Send a message and let's start a conversation.
            </p>

            {/* Quick Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              <div
                className="pro-glass-card"
                style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}
              >
                <div style={{ padding: 10, borderRadius: 12, background: "rgba(0, 255, 204, 0.1)", color: "#00ffcc" }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Location</div>
                  <div style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>Prayagraj, Uttar Pradesh, India</div>
                </div>
              </div>

              <div
                className="pro-glass-card"
                style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}
              >
                <div style={{ padding: 10, borderRadius: 12, background: "rgba(255, 215, 0, 0.1)", color: "#ffd700" }}>
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase" }}>Direct Mail</div>
                  <div style={{ fontSize: "0.95rem", color: "#fff", fontWeight: 600 }}>Available via Contact Form</div>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div>
              <div style={{ fontSize: "0.85rem", color: "#64748b", fontWeight: 600, textTransform: "uppercase", marginBottom: 14 }}>
                Connect on Socials
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                {[
                  { icon: <Github size={20} />, href: "https://github.com/CoderAnimesh", label: "GitHub" },
                  { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/animesh-pathak-175052335?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", label: "LinkedIn" },
                  { icon: <Instagram size={20} />, href: "https://www.instagram.com/animes.h.pathak?igsh=MWFlOG1lZHpmd3FiZA==", label: "Instagram" },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      background: "rgba(255, 255, 255, 0.05)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="pro-glass-card"
            style={{
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 20,
              textAlign: "left",
            }}
          >
            <h3 style={{ fontSize: "1.6rem", fontWeight: 700, color: "#fff" }}>Send a Message</h3>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Ajay Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>
                Your Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. ajay@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.85rem", color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>
                Project Message
              </label>
              <textarea
                rows={4}
                placeholder="Tell me about your project or inquiry..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{ width: "100%", resize: "vertical" }}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              style={{
                marginTop: 8,
                padding: "14px 28px",
                borderRadius: 14,
                background: "linear-gradient(135deg, #00ffcc 0%, #00bfa6 100%)",
                color: "#000",
                fontWeight: 700,
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 0 25px rgba(0, 255, 204, 0.3)",
              }}
            >
              <Send size={18} /> Send Message
            </motion.button>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: "0.9rem",
                  background: status.type === "success" ? "rgba(0, 255, 204, 0.1)" : "rgba(239, 68, 68, 0.1)",
                  border: status.type === "success" ? "1px solid rgba(0, 255, 204, 0.3)" : "1px solid rgba(239, 68, 68, 0.3)",
                  color: status.type === "success" ? "#00ffcc" : "#f87171",
                }}
              >
                {status.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                {status.text}
              </motion.div>
            )}
          </motion.form>
        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP BAR */}
        <div
          style={{
            paddingTop: 30,
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div style={{ color: "#64748b", fontSize: "0.88rem" }}>
            © {new Date().getFullYear()} <span style={{ color: "#00ffcc", fontWeight: 600 }}>Animesh Pathak</span>. Built with React 19, Three.js & Framer Motion.
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: "10px 18px",
              borderRadius: 30,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#00ffcc",
              fontWeight: 600,
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
              cursor: "pointer",
            }}
          >
            Back to Top <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
