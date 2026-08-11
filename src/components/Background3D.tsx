import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  baseY: number;
  z: number;
  radius: number;
  color: string;
  angle: number;
  speed: number;
  vx: number;
  vy: number;
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for interactive proximity lines
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
      isHovered: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.isHovered = true;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Particle pool setup
    const particleCount = Math.min(Math.floor((width * height) / 9000), 140);
    const colors = [
      "rgba(0, 255, 204, ",  // Cyan
      "rgba(255, 215, 0, ",  // Gold
      "rgba(168, 85, 247, ", // Purple
      "rgba(56, 189, 248, ", // Light Blue
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseY: y,
        z: Math.random() * 2 + 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    let time = 0;

    // Render loop
    const render = () => {
      time += 0.015;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 3D Sine Wave drift motion
        p.angle += p.speed;
        p.x += p.vx + Math.cos(p.angle) * 0.3;
        p.y = p.baseY + Math.sin(time + p.x * 0.003) * (20 * p.z);

        // Screen boundary wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.baseY < -20) p.baseY = height + 20;
        if (p.baseY > height + 20) p.baseY = -20;

        // Draw particle dot with glow
        const alpha = Math.min(0.8, 0.3 + (Math.sin(time + i) + 1) * 0.25);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.fill();

        // Connect nearby particles with synaptic lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${p.color}${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.shadowBlur = 0;
            ctx.stroke();
          }
        }

        // Mouse interaction connection lines
        if (mouse.isHovered) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < 160) {
            const malpha = (1 - mdist / 160) * 0.45;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 255, 204, ${malpha})`;
            ctx.lineWidth = 1.2;
            ctx.shadowBlur = 8;
            ctx.shadowColor = "rgba(0, 255, 204, 0.6)";
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Ambient Aurora Gradient Orbs */}
      <div
        style={{
          position: "absolute",
          top: "-15%",
          left: "20%",
          width: "70vw",
          height: "70vw",
          maxWidth: "800px",
          maxHeight: "800px",
          background: "radial-gradient(circle, rgba(0, 255, 204, 0.04) 0%, rgba(168, 85, 247, 0.03) 40%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "10%",
          width: "65vw",
          height: "65vw",
          maxWidth: "750px",
          maxHeight: "750px",
          background: "radial-gradient(circle, rgba(255, 215, 0, 0.03) 0%, rgba(0, 255, 204, 0.04) 50%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Interactive Synaptic Wave Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
