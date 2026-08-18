"use client";

import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Zap, Users, Languages, ChevronDown, PlayCircle, Sparkles } from "lucide-react";
import { useLang } from "@/context/LangContext";
import dynamic from "next/dynamic";
import Image from "next/image";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const rolesEn = ["Video Editor", "Graphic Designer", "UI/UX Developer", "Motion Artist", "Content Strategist"];
const rolesEs = ["Editor de Video", "Diseñador Gráfico", "Desarrollador UI/UX", "Artista de Motion", "Estratega de Contenido"];

function TypewriterText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = texts[index % texts.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (charIndex < current.length) {
        timeout = setTimeout(() => setCharIndex((c) => c + 1), 75);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => setCharIndex((c) => c - 1), 38);
      } else {
        setIsDeleting(false);
        setIndex((i) => (i + 1) % texts.length);
      }
    }
    setDisplayed(current.slice(0, charIndex));
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, texts]);

  return (
    <span>
      <span style={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontWeight: 700 }}>
        {displayed}
      </span>
      <span className="cursor-blink" style={{ color: "#7c3aed", fontWeight: 300 }}>|</span>
    </span>
  );
}

const stats = [
  { value: "7+", en: "Years Experience", es: "Años de experiencia", icon: <Zap size={14} /> },
  { value: "100+", en: "Projects Done", es: "Proyectos", icon: <Users size={14} /> },
  { value: "EN/ES", en: "Bilingual", es: "Bilingüe", icon: <Languages size={14} /> },
];

export default function Hero() {
  const { lang, t } = useLang();

  return (
    <section id="hero" style={{ minHeight: "85vh", display: "flex", alignItems: "center", padding: "160px 24px 90px", position: "relative", overflow: "hidden" }}>

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Grid overlay */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(124,58,237,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.025) 1px, transparent 1px)", backgroundSize: "72px 72px", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", width: "100%", display: "flex", alignItems: "center", gap: "56px", position: "relative", zIndex: 1, flexWrap: "wrap" }}>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} style={{ flexShrink: 0 }}>
          <Tilt tiltMaxAngleX={11} tiltMaxAngleY={11} perspective={1100} glareEnable glareMaxOpacity={0.14} glareColor="#a78bfa" glarePosition="all" glareBorderRadius="22px" scale={1.02} style={{ width: "clamp(230px, 26vw, 310px)" }}>
            <div style={{ position: "relative", padding: "5px", borderRadius: "22px", background: "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(6,182,212,0.1))", boxShadow: "0 0 50px rgba(124,58,237,0.28), 0 0 100px rgba(124,58,237,0.1)" }}>

              {/* Animated border */}
              <div style={{ position: "absolute", inset: 0, borderRadius: "22px", background: "linear-gradient(135deg, rgba(124,58,237,0.9), rgba(6,182,212,0.8), rgba(139,92,246,0.6))", padding: "1.5px", WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude" }} />

              {/* Available badge */}
              <div style={{ position: "absolute", top: "14px", right: "14px", zIndex: 10, display: "flex", alignItems: "center", gap: "5px", background: "rgba(5,5,16,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(74,222,128,0.35)", borderRadius: "100px", padding: "4px 11px", fontSize: "0.7rem", fontWeight: 600, color: "#4ade80" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse-glow 2s ease-in-out infinite" }} />
                {t("Available", "Disponible")}
              </div>

              {/* Photo */}
              <div style={{ borderRadius: "18px", overflow: "hidden", aspectRatio: "3/4", background: "rgba(10,10,26,0.5)", position: "relative" }}>
                <Image 
                  src="/profile.png" 
                  alt="Jesus Monsalve" 
                  fill 
                  priority
                  style={{ objectFit: "cover", objectPosition: "top center" }} 
                />
              </div>

              {/* Experience badge */}
              <div style={{ position: "absolute", bottom: "14px", left: "14px", right: "14px", background: "rgba(5,5,16,0.92)", backdropFilter: "blur(16px)", border: "1px solid rgba(124,58,237,0.22)", borderRadius: "12px", padding: "10px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Zap size={16} color="white" fill="white" />
                </div>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", fontWeight: 400 }}>{t("Experience", "Experiencia")}</div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "#f8fafc" }}>7+ {t("Years", "Años")}</div>
                </div>
              </div>
            </div>
          </Tilt>
        </motion.div>

        {/* Right Content */}
        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }} style={{ flex: 1, minWidth: "280px" }}>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}>
            <span className="tag-pill" style={{ marginBottom: "18px", display: "inline-flex", gap: "6px" }}>
              <Zap size={11} />
              {t("Freelancer · Remote · Available Worldwide", "Freelancer · Remoto · Disponible Globalmente")}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }}
            style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2.8rem,5vw,5rem)", fontWeight: 900, lineHeight: 1.04, color: "#f8fafc", margin: "0 0 14px", letterSpacing: "-0.025em" }}
          >
            Jesus Monsalve
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.62, duration: 0.6 }}
            style={{ fontSize: "clamp(1.1rem,2.2vw,1.5rem)", fontWeight: 500, marginBottom: "28px", minHeight: "2.2em", color: "rgba(255,255,255,0.85)" }}
          >
            <TypewriterText texts={lang === "en" ? rolesEn : rolesEs} />
          </motion.div>

          {/* 2-column bio (Glassmorphism Speech Bubble) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.6 }}>
            <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} perspective={1500} scale={1.01} glareEnable={false} style={{ marginBottom: "36px", width: "100%" }}>
              <div style={{ position: "relative" }}>
                {/* Main Bubble Body */}
                <div 
                  style={{ 
                    borderRadius: "32px", 
                    padding: "36px 40px", 
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    borderTop: "1.5px solid rgba(255,255,255,0.4)",
                    borderLeft: "1.5px solid rgba(255,255,255,0.25)",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.4), inset 0 8px 24px rgba(255,255,255,0.2), inset 0 -8px 24px rgba(0,0,0,0.15)",
                    position: "relative",
                    zIndex: 2
                  }}
                >
                  {/* Glossy reflection overlay */}
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 100%)", borderRadius: "32px 32px 0 0", pointerEvents: "none" }} />
                  
                  {/* Bright Glare Highlight (Top edge) */}
                  <div style={{ position: "absolute", top: "-1px", left: "12%", width: "80px", height: "3px", background: "radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, transparent 70%)", borderRadius: "10px", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", top: "-10px", left: "12%", width: "130px", height: "20px", background: "radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 70%)", filter: "blur(6px)", pointerEvents: "none" }} />

                  {/* Right Edge Highlight */}
                  <div style={{ position: "absolute", top: "20%", right: "-1px", width: "2px", height: "60px", background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.5), transparent)", pointerEvents: "none" }} />

                  <div className="hero-bio-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px 32px", position: "relative", zIndex: 1 }}>
                    <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.65, fontSize: "1.05rem", fontWeight: 400, margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.25)" }}>
                      {t(
                        "I turn ideas into scroll-stopping video content — precision color grading, seamless J/L-cuts, motion tracking, dynamic speed ramping, and layered audio mixing.",
                        "Convierto ideas en contenido visual impactante — color grading de precisión, J/L-cuts, motion tracking, speed ramping dinámico y mezcla de audio en capas."
                      )}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.9)", lineHeight: 1.65, fontSize: "1.05rem", fontWeight: 400, margin: 0, textShadow: "0 2px 10px rgba(0,0,0,0.25)" }}>
                      {t(
                        "I craft bold, modern graphic design that demands attention. Bilingual (EN/ES), detail-oriented, and comfortable working independently with remote teams across time zones.",
                        "Creo diseño gráfico moderno y audaz que exige atención. Bilingüe (EN/ES), orientado al detalle y cómodo trabajando de forma independiente con equipos remotos."
                      )}
                    </p>
                  </div>
                </div>

                {/* Speech Bubble Tail (Smooth left-pointing curve) */}
                <div 
                  style={{
                    position: "absolute",
                    bottom: "-17px",
                    left: "32px",
                    width: "24px",
                    height: "18px",
                    zIndex: 3
                  }} 
                >
                  {/* Blurred glass shape */}
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    clipPath: "path('M 8 0 Q 4 9 0 18 Q 12 12 24 0 Z')"
                  }} />
                  {/* Glossy stroke edges */}
                  <svg width="24" height="18" viewBox="0 0 24 18" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                    <path d="M 8 0 Q 4 9 0 18" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
                    <path d="M 0 18 Q 12 12 24 0" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                    {/* Tiny line to hide the seam with the main bubble */}
                    <line x1="8" y1="0" x2="24" y2="0" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </Tilt>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.82, duration: 0.6 }}
            style={{ display: "flex", gap: "28px", flexWrap: "wrap", marginBottom: "32px" }}
          >
            {stats.map((s) => (
              <div key={s.en} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.75rem", fontWeight: 900, background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1.1 }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", fontWeight: 500, marginTop: "3px" }}>{lang === "en" ? s.en : s.es}</div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.92, duration: 0.6 }}
            style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "10px" }}
          >
            <motion.a href="#portfolio" whileHover={{ scale: 1.04, boxShadow: "0 8px 40px rgba(124,58,237,0.55)" }} whileTap={{ scale: 0.97 }}
              style={{ padding: "15px 32px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", color: "#fff", textDecoration: "none", borderRadius: "100px", fontWeight: 700, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "10px", fontFamily: "'Outfit',sans-serif", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              {/* Shimmer effect */}
              <div style={{ position: "absolute", top: 0, left: "-100%", width: "50%", height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 3s infinite" }} />
              
              <PlayCircle size={18} fill="#fff" color="#7c3aed" />
              {t("Explore Portfolio", "Explorar Portafolio")}
            </motion.a>

            <motion.a href="#services" whileHover={{ scale: 1.04, background: "rgba(255,255,255,0.06)", borderColor: "rgba(124,58,237,0.3)" }} whileTap={{ scale: 0.97 }}
              style={{ padding: "15px 32px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.9)", textDecoration: "none", borderRadius: "100px", fontWeight: 600, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "10px", backdropFilter: "blur(12px)", fontFamily: "'Outfit',sans-serif", transition: "all 0.3s ease" }}
            >
              <Sparkles size={16} color="#06b6d4" />
              {t("My Services", "Mis Servicios")}
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 0.8 }}
        style={{ position: "absolute", bottom: "30px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", letterSpacing: "0.12em", fontWeight: 500 }}
      >
        <span>SCROLL</span>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={16} color="rgba(124,58,237,0.6)" />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 640px) { .hero-bio-grid { grid-template-columns: 1fr !important; } }
        @keyframes shimmer { 0% { left: -100%; } 100% { left: 200%; } }
      `}</style>
    </section>
  );
}
