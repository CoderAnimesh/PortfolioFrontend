import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

interface ReplyModalProps {
  open: boolean;
  onClose: () => void;
  recipientEmail: string;
  originalMessage: string;
  contactId: string; // ✅ added
}

export default function ReplyModal({
  open,
  onClose,
  recipientEmail,
  originalMessage,
  contactId,
}: ReplyModalProps) {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  const token = localStorage.getItem("token"); // ✅ get token safely

  // ✅ Default professional reply (editable)
  useEffect(() => {
  setMessage(
`Hello ${originalMessage ? "" : ""},

Thank you for reaching out to us! We truly appreciate your interest and are glad to hear from you. 

We have received your message:
"${originalMessage}"

To help us assist you better, could you kindly provide the following details:
• Full Name
• Contact Number
• Project Description
• Estimated Timeline & Budget (if applicable)
• Any specific requirements or references

Once we have this information, our team will review it carefully and get back to you within 24 hours with the next steps.

We look forward to collaborating with you and bringing your vision to life!

Warm regards,
Animesh Pathak
Support Team`
  );
}, [originalMessage]);

  const handleSend = async () => {
    if (!token) {
      setStatus("Unauthorized ❌");
      return;
    }

    setSending(true);
    setStatus("");

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://backend-141c.onrender.com";
      await axios.post(
        `${backendUrl}/api/admin/reply`,
        {
          to: recipientEmail,
          message,          // ✅ correct variable
          contactId,        // ✅ send contactId
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStatus("Reply sent successfully ✅");
      setTimeout(() => {
      onClose();
      window.location.reload(); // 🔥 refresh dashboard
    }, 1200);

    } catch (err) {
      console.error(err);
      setStatus("Failed to send reply ❌");
    } finally {
      setSending(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
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
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            style={{
              background: "#111",
              padding: 30,
              borderRadius: 16,
              width: "90%",
              maxWidth: 520,
              color: "#fff",
            }}
          >
            <h3 style={{ color: "#00ffcc" }}>Reply to</h3>
            <p style={{ fontSize: 14, opacity: 0.8 }}>{recipientEmail}</p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={8}
              style={{
                width: "100%",
                marginTop: 15,
                padding: 12,
                borderRadius: 8,
                background: "#000",
                color: "#fff",
                border: "1px solid #333",
              }}
            />

            {status && (
              <p style={{ marginTop: 10, fontSize: 14 }}>{status}</p>
            )}

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button
                onClick={onClose}
                disabled={sending}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "1px solid #00ffcc",
                  background: "transparent",
                  color: "#00ffcc",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSend}
                disabled={sending}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  border: "none",
                  background: "#00ffcc",
                  color: "#000",
                  cursor: sending ? "not-allowed" : "pointer",
                }}
              >
                {sending ? "Sending..." : "Send Reply"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
