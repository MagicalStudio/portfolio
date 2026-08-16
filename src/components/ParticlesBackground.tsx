"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const STAR_COUNT = 150;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
    }));

    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars (very lightweight)
      stars.forEach((star) => {
        const twinkle = Math.sin(t * star.twinkleSpeed + star.twinkleOffset) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha * twinkle})`;
        ctx.fill();

        // Move star slowly downward
        star.y += star.speed * 0.2;
        if (star.y > canvas.height + 2) {
          star.y = -2;
          star.x = Math.random() * canvas.width;
        }
      });

      t++;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {/* CSS Background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #050510 0%, #080820 40%, #050515 100%)" }} />
      
      {/* CSS Orbs (Hardware Accelerated) */}
      <div style={{ position: "absolute", top: "20%", left: "70%", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 60%)", transform: "translate(-50%, -50%)", borderRadius: "50%" }} />
      <div style={{ position: "absolute", top: "70%", left: "15%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 60%)", transform: "translate(-50%, -50%)", borderRadius: "50%" }} />
      
      {/* CSS Mouse Glow - Only on desktop to save mobile battery */}
      {!isMobile && (
        <motion.div 
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
          style={{ position: "absolute", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 60%)", borderRadius: "50%", marginLeft: "-200px", marginTop: "-200px", willChange: "transform" }}
        />
      )}

      {/* Lightweight Canvas for Stars */}
      <canvas
        ref={canvasRef}
        id="particles-canvas"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.8 }}
      />
    </div>
  );
}
