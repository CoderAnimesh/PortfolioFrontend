import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  // Mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 15); // center cursor
      mouseY.set(e.clientY - 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderRadius: "50%",
        border: "2px solid #00ffcc",
        backgroundColor: "rgba(0, 255, 204, 0.1)",
        pointerEvents: "none",
        zIndex: 9999,
        x: springX,
        y: springY,
        mixBlendMode: "difference",
      }}
    />
  );
}
