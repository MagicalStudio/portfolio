"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film, PenTool, Globe2, TrendingUp, Clock, Briefcase } from "lucide-react";
import { useLang } from "@/context/LangContext";

const highlightsEn = [
  { icon: Film, label: "Video & Motion", desc: "Precision color grading, J/L-cuts, speed ramping, layered audio mixing" },
  { icon: PenTool, label: "Graphic Design", desc: "Bold, modern visual design — branding, print, thumbnails, infographics" },
  { icon: Globe2, label: "UI/UX & Web", desc: "Figma, Webflow, Framer & WordPress — design to deployment" },
  { icon: TrendingUp, label: "Strategy", desc: "Trend research, viral formulas, content calendars & scripts" },
];
const highlightsEs = [
  { icon: Film, label: "Video y Motion", desc: "Color grading de precisión, J/L-cuts, speed ramping, mezcla de audio" },
  { icon: PenTool, label: "Diseño Gráfico", desc: "Diseño visual moderno y audaz — branding, impresión, thumbnails" },
  { icon: Globe2, label: "UI/UX y Web", desc: "Figma, Webflow, Framer y WordPress — del diseño al despliegue" },
  { icon: TrendingUp, label: "Estrategia", desc: "Investigación de tendencias, fórmulas virales y calendarios de contenido" },
];

const timelineEn = [
  { period: "2017 — Present", title: "Freelance Creative Director", icon: Briefcase, desc: "Serving clients globally across video production, graphic design, UI/UX, and social media strategy." },
  { period: "2020 — Present", title: "UI/UX & Web Development", icon: Globe2, desc: "Designing and building landing pages, portfolios, and web apps using Figma, Webflow, Framer & WordPress." },
  { period: "2019 — Present", title: "AI-Powered Content Creator", icon: TrendingUp, desc: "Early adopter of AI tools for creative production — Midjourney, Runway, Kling, ElevenLabs & more." },
];
const timelineEs = [
  { period: "2017 — Presente", title: "Director Creativo Freelance", icon: Briefcase, desc: "Sirviendo a clientes globalmente en producción de video, diseño gráfico, UI/UX y estrategia de redes sociales." },
  { period: "2020 — Presente", title: "UI/UX y Desarrollo Web", icon: Globe2, desc: "Diseñando y construyendo landing pages, portafolios y aplicaciones web en Figma, Webflow, Framer y WordPress." },
  { period: "2019 — Presente", title: "Creador de Contenido con IA", icon: TrendingUp, desc: "Adoptador temprano de herramientas de IA — Midjourney, Runway, Kling, ElevenLabs y más." },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useLang();

  const highlights = lang === "en" ? highlightsEn : highlightsEs;
  const timeline = lang === "en" ? timelineEn : timelineEs;

  return (
    <section id="about" ref={ref} style={{ padding: "100px 24px", position: "relative" }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", left: "-150px", top: "50%", transform: "translateY(-50%)", width: "350px", height: "350px", borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "60px" }}>
          <span className="tag-pill" style={{ marginBottom: "14px", display: "inline-flex", gap: "6px" }}>
            <Clock size={11} />
            {t("About Me", "Sobre mí")}
          </span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#f8fafc", margin: "0 0 14px", letterSpacing: "-0.025em", maxWidth: "600px" }}>
            {t("Shaped by", "Formado por")}{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t("instinct & precision", "instinto y precisión")}
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.52)", fontSize: "1rem", maxWidth: "640px", lineHeight: 1.72 }}>
            {t(
              "I'm shaped by a sharp instinct for spotting daily trends and applying proven retention and virality formulas across everything I create. Bilingual (English/Spanish), detail-oriented, and comfortable working independently and asynchronously with remote teams across time zones.",
              "Estoy formado por un agudo instinto para detectar tendencias diarias y aplicar fórmulas probadas de retención y viralidad en todo lo que creo. Bilingüe (inglés/español), orientado al detalle y cómodo trabajando de forma independiente con equipos remotos en diferentes zonas horarias."
            )}
          </p>
        </motion.div>

        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>

          {/* Highlight cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div key={h.label}
                  initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="glass"
                  style={{ borderRadius: "16px", padding: "18px 22px", display: "flex", alignItems: "flex-start", gap: "14px", transition: "all 0.3s ease" }}
                  whileHover={{ x: 5, background: "rgba(124,58,237,0.06)", borderColor: "rgba(124,58,237,0.2)" } as never}
                >
                  <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color="#a78bfa" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.93rem", color: "#f8fafc", marginBottom: "3px" }}>{h.label}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.47)", lineHeight: 1.5 }}>{h.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Timeline */}
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "16px", top: "8px", bottom: "8px", width: "1px", background: "linear-gradient(to bottom, rgba(124,58,237,0.6), rgba(6,182,212,0.5), transparent)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "30px", paddingLeft: "46px" }}>
              {timeline.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div key={item.title}
                    initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.15 + 0.2 }}
                    style={{ position: "relative" }}
                  >
                    {/* Dot */}
                    <div style={{ position: "absolute", left: "-38px", top: "4px", width: "14px", height: "14px", borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", boxShadow: "0 0 14px rgba(124,58,237,0.55)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={7} color="white" />
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "rgba(124,58,237,0.8)", fontWeight: 600, letterSpacing: "0.04em" }}>{item.period}</span>
                    <h3 style={{ fontWeight: 700, fontSize: "0.97rem", color: "#f8fafc", margin: "4px 0 7px" }}>{item.title}</h3>
                    <p style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.6 }}>{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
