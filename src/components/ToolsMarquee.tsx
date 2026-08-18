"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Wrench } from "lucide-react";
import { useLang } from "@/context/LangContext";

const tools = [
  { name: "Premiere Pro", logo: "/tools/premiere.png" },
  { name: "After Effects", logo: "/tools/aftereffects.jpg" },
  { name: "Photoshop", logo: "/tools/photoshop.png" },
  { name: "Illustrator", logo: "/tools/illustrator.jpg" },
  { name: "InDesign", logo: "/tools/indesign.png" },
  { name: "CapCut", logo: "/tools/capcut.png" },
  { name: "Canva", logo: "/tools/canva.png" },
  { name: "Figma", logo: "/tools/figma.jpg" },
  { name: "Webflow", logo: "/tools/webflow.jpg" },
  { name: "Framer", logo: "/tools/framer.jpg" },
  { name: "WordPress", logo: "/tools/wordpress.png" },
];

const aiTools = [
  { name: "Midjourney", logo: "/tools/midjourney.jpg" },
  { name: "ElevenLabs", logo: "/tools/elevenlabs.png" },
  { name: "Higgsfield", logo: "/tools/higgsfield.png" },
  { name: "Kling AI", logo: "/tools/kling.png" },
  { name: "Leonardo", logo: "/tools/leonardo.png" },
  { name: "ComfyUI", logo: "/tools/comfy.png" },
  { name: "Runway", logo: "/tools/runway.jpg" },
  { name: "HeyGen", logo: "/tools/heygen.png" },
  { name: "Sora", logo: "/tools/sora.jpg" },
  { name: "Veo3", logo: "/tools/veo3.jpg" },
  { name: "Claude", logo: "/tools/claude.png" },
  { name: "Lovart", logo: "/tools/lovart.png" },
  { name: "SeedAI", logo: "/tools/seedai.png" },
  { name: "Nano Banana", logo: "/tools/nanobanana.jpg" },
];

function ToolLogo({ tool, isSmall = false }: { tool: { name: string; logo: string }, isSmall?: boolean }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: isSmall ? "10px" : "16px", padding: isSmall ? "8px 16px" : "12px 24px", background: "transparent", border: "1px solid transparent", borderRadius: isSmall ? "14px" : "18px", flexShrink: 0, whiteSpace: "nowrap", transition: "all 0.3s ease", cursor: "default" }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.04)"; el.style.borderColor = "rgba(255,255,255,0.08)"; el.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "transparent"; el.style.borderColor = "transparent"; el.style.transform = "translateY(0)"; }}
    >
      <div style={{ width: isSmall ? "32px" : "56px", height: isSmall ? "32px" : "56px", borderRadius: isSmall ? "8px" : "14px", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src={tool.logo} alt={tool.name} style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.15)" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
      </div>
      <span style={{ color: "rgba(255,255,255,0.85)", fontSize: isSmall ? "0.9rem" : "1.2rem", fontWeight: 600, fontFamily: "'Outfit',sans-serif", letterSpacing: "0.01em" }}>{tool.name}</span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, isSmall = false }: { items: typeof tools; reverse?: boolean, isSmall?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div style={{ display: "flex", overflow: "hidden", maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
      <div className={reverse ? "animate-marquee-reverse" : "animate-marquee"} style={{ display: "flex", gap: "10px", paddingRight: "10px" }}>
        {doubled.map((tool, i) => <ToolLogo key={`${tool.name}-${i}`} tool={tool} isSmall={isSmall} />)}
      </div>
    </div>
  );
}

export default function ToolsMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();

  return (
    <section id="tools" ref={ref} style={{ padding: "0px 0 40px", position: "relative", overflow: "hidden" }}>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
        style={{ textAlign: "center", padding: "0 24px", marginBottom: "20px" }}
      >
        <span className="tag-pill" style={{ marginBottom: "14px", display: "inline-flex", gap: "6px" }}>
          <Wrench size={11} />
          {t("My Stack", "Mi Stack")}
        </span>
        <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 900, color: "#f8fafc", margin: "0 0 12px", letterSpacing: "-0.022em" }}>
          {t("Tools I", "Herramientas que")}{" "}
          <span style={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("master", "domino")}
          </span>
        </h2>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", maxWidth: "420px", margin: "0 auto", lineHeight: 1.6 }}>
          {t("20+ professional tools to create content that makes a difference.", "Más de 20 herramientas profesionales para crear contenido que marca la diferencia.")}
        </p>
      </motion.div>

      {/* Row label: Software */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
        style={{ display: "flex", alignItems: "center", gap: "16px", padding: "0 48px", marginBottom: "14px" }}
      >
        <div className="divider" style={{ flex: 1 }} />
        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", flexShrink: 0 }}>
          {t("Software & Design", "Software y Diseño")}
        </span>
        <div className="divider" style={{ flex: 1 }} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }} style={{ marginBottom: "14px" }}>
        <MarqueeRow items={tools} />
      </motion.div>

      {/* Row label: AI */}
      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
        style={{ display: "flex", alignItems: "center", gap: "16px", padding: "14px 48px", marginBottom: "14px" }}
      >
        <div className="divider" style={{ flex: 1 }} />
        <span style={{ color: "rgba(167,139,250,0.55)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", flexShrink: 0 }}>
          AI-Powered Tools
        </span>
        <div className="divider" style={{ flex: 1 }} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
        <MarqueeRow items={aiTools} reverse isSmall />
      </motion.div>
    </section>
  );
}
