"use client";

import { motion } from "framer-motion";

// Each blob cycles through multiple background colors via keyframes
const blobs = [
  {
    style: { width: "900px", height: "900px", top: "-200px", left: "-150px" },
    colors: [
      "radial-gradient(circle at center, rgba(109,40,217,0.7) 0%, rgba(124,58,237,0.35) 35%, transparent 70%)",
      "radial-gradient(circle at center, rgba(139,92,246,0.75) 0%, rgba(167,139,250,0.3) 35%, transparent 70%)",
      "radial-gradient(circle at center, rgba(79,70,229,0.65) 0%, rgba(99,102,241,0.3) 35%, transparent 70%)",
      "radial-gradient(circle at center, rgba(109,40,217,0.7) 0%, rgba(124,58,237,0.35) 35%, transparent 70%)",
    ],
    animate: { x: [0, 120, -60, 80, 0], y: [0, 80, -50, 30, 0], scale: [1, 1.15, 0.9, 1.08, 1] },
    duration: 14,
  },
  {
    style: { width: "750px", height: "750px", top: "5%", right: "-120px" },
    colors: [
      "radial-gradient(circle at center, rgba(6,182,212,0.6) 0%, rgba(8,145,178,0.25) 45%, transparent 70%)",
      "radial-gradient(circle at center, rgba(34,211,238,0.65) 0%, rgba(6,182,212,0.3) 45%, transparent 70%)",
      "radial-gradient(circle at center, rgba(14,165,233,0.55) 0%, rgba(2,132,199,0.25) 45%, transparent 70%)",
      "radial-gradient(circle at center, rgba(6,182,212,0.6) 0%, rgba(8,145,178,0.25) 45%, transparent 70%)",
    ],
    animate: { x: [0, -90, 50, -70, 0], y: [0, 100, -60, 40, 0], scale: [1, 0.88, 1.12, 0.95, 1] },
    duration: 16,
  },
  {
    style: { width: "650px", height: "650px", bottom: "-80px", left: "15%" },
    colors: [
      "radial-gradient(circle at center, rgba(168,85,247,0.55) 0%, rgba(139,92,246,0.25) 50%, transparent 70%)",
      "radial-gradient(circle at center, rgba(192,132,252,0.6) 0%, rgba(168,85,247,0.3) 50%, transparent 70%)",
      "radial-gradient(circle at center, rgba(124,58,237,0.5) 0%, rgba(109,40,217,0.2) 50%, transparent 70%)",
      "radial-gradient(circle at center, rgba(168,85,247,0.55) 0%, rgba(139,92,246,0.25) 50%, transparent 70%)",
    ],
    animate: { x: [0, 70, -100, 50, 0], y: [0, -60, 80, -40, 0], scale: [1, 1.18, 0.92, 1.1, 1] },
    duration: 18,
  },
  {
    style: { width: "550px", height: "550px", top: "25%", left: "30%" },
    colors: [
      "radial-gradient(circle at center, rgba(236,72,153,0.35) 0%, rgba(244,114,182,0.15) 55%, transparent 70%)",
      "radial-gradient(circle at center, rgba(251,113,133,0.4) 0%, rgba(253,164,175,0.18) 55%, transparent 70%)",
      "radial-gradient(circle at center, rgba(217,70,239,0.38) 0%, rgba(232,121,249,0.15) 55%, transparent 70%)",
      "radial-gradient(circle at center, rgba(236,72,153,0.35) 0%, rgba(244,114,182,0.15) 55%, transparent 70%)",
    ],
    animate: { x: [0, -70, 40, -50, 0], y: [0, -90, 60, -30, 0], scale: [1, 1.1, 0.93, 1.05, 1] },
    duration: 12,
  },
  {
    style: { width: "850px", height: "850px", bottom: "-200px", right: "-80px" },
    colors: [
      "radial-gradient(circle at center, rgba(79,70,229,0.45) 0%, rgba(67,56,202,0.2) 50%, transparent 70%)",
      "radial-gradient(circle at center, rgba(99,102,241,0.5) 0%, rgba(79,70,229,0.22) 50%, transparent 70%)",
      "radial-gradient(circle at center, rgba(55,48,163,0.4) 0%, rgba(49,46,129,0.18) 50%, transparent 70%)",
      "radial-gradient(circle at center, rgba(79,70,229,0.45) 0%, rgba(67,56,202,0.2) 50%, transparent 70%)",
    ],
    animate: { x: [0, 50, -80, 30, 0], y: [0, -100, 40, -60, 0], scale: [1, 0.94, 1.08, 0.97, 1] },
    duration: 20,
  },
];

export default function HeroDecoration() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Aurora blobs — animate position AND background color */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={{
            ...blob.animate,
            background: blob.colors,
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
          style={{
            position: "absolute",
            borderRadius: "50%",
            filter: "blur(90px)",
            background: blob.colors[0],
            ...blob.style,
          }}
        />
      ))}

      {/* Bottom fade — smooth transition into next section */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "220px",
        background: "linear-gradient(to bottom, transparent 0%, rgba(5,5,16,0.7) 50%, #050510 100%)",
        pointerEvents: "none",
        zIndex: 10,
      }} />

      {/* Subtle grain texture for premium feel */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.045 }}>
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* Very subtle radial vignette overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(5,5,16,0.6) 100%)",
      }} />

      {/* Subtle dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(167,139,250,0.12) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />
    </div>
  );
}
