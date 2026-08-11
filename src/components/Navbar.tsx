import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, FileText } from "lucide-react";

interface NavLink {
  name: string;
  id: string;
}

const links: NavLink[] = [
  { name: "Home", id: "hero" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Timeline", id: "timeline" },
  { name: "Contact", id: "footer" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      // ScrollSpy active section detection
      const sections = links.map((l) => document.getElementById(l.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(links[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: "fixed",
        top: 20,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        padding: "0 20px",
        pointerEvents: "none",
      }}
    >
      <nav
        style={{
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 1050,
          background: scrolled
            ? "rgba(13, 17, 23, 0.85)"
            : "rgba(13, 17, 23, 0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 40,
          padding: "10px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: scrolled
            ? "0 15px 35px -10px rgba(0, 255, 204, 0.15)"
            : "0 10px 30px rgba(0,0,0,0.5)",
          transition: "all 0.3s ease",
        }}
      >
        {/* LOGO */}
        <div
          onClick={() => handleClick("hero")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#00ffcc",
              boxShadow: "0 0 12px #00ffcc",
            }}
          />
          <span
            style={{
              fontSize: "1.15rem",
              fontWeight: 800,
              background: "linear-gradient(90deg, #fff 0%, #00ffcc 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-0.02em",
            }}
          >
            Animesh Pathak
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <div
          className="desktop-menu"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {links.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                style={{
                  position: "relative",
                  background: "transparent",
                  border: "none",
                  padding: "8px 16px",
                  fontSize: "0.88rem",
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? "#00ffcc" : "#94a3b8",
                  cursor: "pointer",
                  transition: "color 0.2s ease",
                }}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 12,
                      right: 12,
                      height: 2,
                      background: "#00ffcc",
                      borderRadius: 2,
                      boxShadow: "0 0 8px #00ffcc",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div
          className="desktop-menu"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <a
            href="/Animesh_Resume.pdf"
            download
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 20,
              fontSize: "0.82rem",
              fontWeight: 600,
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              color: "#f3f4f6",
              transition: "all 0.2s ease",
            }}
          >
            <FileText size={14} color="#00ffcc" /> Resume
          </a>

          <button
            onClick={handleLogin}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 18px",
              borderRadius: 20,
              background: "linear-gradient(135deg, #00ffcc 0%, #00bfa6 100%)",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.85rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(0, 255, 204, 0.3)",
            }}
          >
            <LogIn size={14} /> Login
          </button>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="hamburger"
          style={{
            display: "none",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "50%",
            width: 40,
            height: 40,
            padding: 0,
            alignItems: "center",
            justifyContent: "center",
            color: "#00ffcc",
          }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* MOBILE OVERLAY DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "absolute",
              top: 70,
              left: 20,
              right: 20,
              background: "rgba(13, 17, 23, 0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(0, 255, 204, 0.2)",
              borderRadius: 24,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              pointerEvents: "auto",
            }}
          >
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => handleClick(link.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: activeSection === link.id ? "#00ffcc" : "#e2e8f0",
                  textAlign: "left",
                  fontSize: "1.05rem",
                  fontWeight: activeSection === link.id ? 700 : 500,
                  padding: "8px 12px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                {link.name}
              </button>
            ))}
            <div
              style={{
                height: 1,
                background: "rgba(255, 255, 255, 0.1)",
                margin: "4px 0",
              }}
            />
            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 16,
                background: "linear-gradient(135deg, #00ffcc 0%, #00bfa6 100%)",
                color: "#000",
                fontWeight: 700,
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <LogIn size={18} /> Login to Dashboard
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
