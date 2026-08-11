import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // loader state

  const handleLogin = async () => {
    setError("");
    setLoading(true); // start loader

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://backend-141c.onrender.com";
      const res = await axios.post(
        `${backendUrl}/api/auth/login`,
        { email, password }
      );

      // save token
      localStorage.setItem("token", res.data.token);

      setLoading(false); // stop loader
      navigate("/dashboard"); // redirect
    } catch (err: any) {
      setLoading(false); // stop loader
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      {/* FULL SCREEN LOADER */}
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
                width: 80,
                height: 80,
                border: "6px solid #222",
                borderTop: "6px solid #00ffcc",
                borderRadius: "50%",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOGIN PAGE */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0a0a0a, #111)",
          color: "white",
          padding: 20,
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{
            background: "#0b0b0b",
            padding: 40,
            borderRadius: 20,
            boxShadow: "0 0 60px rgba(0,255,204,0.5)",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: 30 }}>Login</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #333",
                background: "#111",
                color: "white",
              }}
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              disabled={loading}
              style={{
                padding: 12,
                borderRadius: 8,
                border: "none",
                background: "#00ffcc",
                color: "black",
                fontWeight: "bold",
                cursor: loading ? "not-allowed" : "pointer",
                marginTop: 10,
                opacity: loading ? 0.6 : 1,
              }}
            >
              Login
            </motion.button>
          </div>

          {error && (
            <p style={{ color: "red", marginTop: 15, textAlign: "center" }}>
              {error}
            </p>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
