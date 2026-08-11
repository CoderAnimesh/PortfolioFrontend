import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <motion.div
        style={{
          width: 60,
          height: 60,
          border: "5px solid white",
          borderTop: "5px solid transparent",
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </motion.div>
  );
}
