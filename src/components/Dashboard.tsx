import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReplyModal from "./ReplyModal";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  contacted:boolean;
}

export default function Dashboard() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [error, setError] = useState("");

  // ✅ reply modal state
  const [open, setOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] =
    useState<ContactMessage | null>(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!token) {
      setError("Unauthorized. Please login.");
      return;
    }

    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://backend-141c.onrender.com";
      const res = await axios.get(
        `${backendUrl}/api/admin/contact`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete message
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    if (!token) return;

    try {
      setActionLoading(id);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://backend-141c.onrender.com";
      await axios.delete(
        `${backendUrl}/api/admin/contact/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch {
      alert("Failed to delete message");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div style={{ padding: "40px", color: "white", position: "relative" }}>
      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          padding: "8px 16px",
          borderRadius: 6,
          background: "#ff4d4d",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1>Welcome to Dashboard 🚀</h1>

      <h2 style={{ marginTop: 30,marginBottom:20 }}>Messages</h2>

      {/* LOADER */}
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
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

      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && messages.length === 0 && <p>No messages yet.</p>}

      {!loading && messages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "#111",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <p><strong>Name:</strong> {msg.name}</p>
              <p><strong>Email:</strong> {msg.email}</p>
              <p><strong>Message:</strong> {msg.message}</p>
              <p>
  <strong>Status:</strong>{" "}
  <span style={{ color: msg.contacted ? "#00ffcc" : "#ff4d4d" }}>
    {msg.contacted ? "Contacted" : "Pending"}
  </span>
</p>

              <p style={{ fontSize: 12, color: "#888" }}>
                {new Date(msg.created_at).toLocaleString()}
              </p>
              
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <button
onClick={() => {
  if (msg.contacted) return;
  setSelectedMessage(msg);
  setOpen(true);
}}

  disabled={msg.contacted}
  style={{
    background: msg.contacted ? "#444" : "#00ffcc",
    border: "none",
    padding: "8px 16px",
    borderRadius: 6,
    cursor: msg.contacted ? "not-allowed" : "pointer",
    opacity: msg.contacted ? 0.6 : 1,
  }}
>
  {msg.contacted ? "Replied" : "Reply"}
</button>

                  
                <button
                  onClick={() => handleDelete(msg.id)}
                  disabled={actionLoading === msg.id}
                  style={{
                    background: "#ff4d4d",
                    border: "none",
                    padding: "8px 16px",
                    borderRadius: 6,
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {actionLoading === msg.id ? "Processing..." : "Delete"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ✅ GLOBAL REPLY MODAL */}
      {selectedMessage && (
  <ReplyModal
    open={open}
    onClose={() => setOpen(false)}
    recipientEmail={selectedMessage.email}
    originalMessage={selectedMessage.message}
    contactId={selectedMessage.id} // ✅ REQUIRED
  />
)}

    </div>
  );
}
