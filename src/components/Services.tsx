"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Film, Sparkles, Palette, Monitor, BarChart3, Cpu, ChevronRight } from "lucide-react";
import Tilt from "react-parallax-tilt";
import { useLang } from "@/context/LangContext";
import { useState } from "react";

const services = [
  {
    icon: Film,
    en: { title: "Video Editing", tools: "Premiere Pro · CapCut · DaVinci", items: ["Short-form (Reels, TikTok, Shorts)", "Long-form YouTube editing", "Color grading & correction", "J-cuts, L-cuts, speed ramping", "Layered audio mixing"] },
    es: { title: "Edición de Video", tools: "Premiere Pro · CapCut · DaVinci", items: ["Contenido corto (Reels, TikTok, Shorts)", "Edición YouTube long-form", "Color grading y corrección", "J-cuts, L-cuts, speed ramping", "Mezcla de audio en capas"] },
    color: "#7c3aed", colorLight: "rgba(124,58,237,0.12)",
  },
  {
    icon: Sparkles,
    en: { title: "Motion Graphics", tools: "After Effects · Premiere Pro", items: ["Motion tracking & VFX", "Vox-style explainer animations", "Lower thirds & transitions", "Kinetic typography", "Logo animation & reveals"] },
    es: { title: "Motion Graphics", tools: "After Effects · Premiere Pro", items: ["Motion tracking y VFX", "Animaciones estilo Vox", "Lower thirds y transiciones", "Tipografía cinética", "Animación de logo"] },
    color: "#06b6d4", colorLight: "rgba(6,182,212,0.12)",
  },
  {
    icon: Palette,
    en: { title: "Graphic Design", tools: "Photoshop · Illustrator · InDesign", items: ["Branding & visual identity", "Thumbnails & social media", "Magazine layouts & infographics", "Print-ready assets", "Photo manipulation & retouching"] },
    es: { title: "Diseño Gráfico", tools: "Photoshop · Illustrator · InDesign", items: ["Branding e identidad visual", "Thumbnails y redes sociales", "Layouts de revista e infografías", "Activos para impresión", "Manipulación y retoque de fotos"] },
    color: "#ec4899", colorLight: "rgba(236,72,153,0.12)",
  },
  {
    icon: Monitor,
    en: { title: "UI/UX Design", tools: "Figma · Webflow · Framer", items: ["UI/UX design & prototyping", "Website & landing page design", "Webflow & Framer development", "WordPress development", "Ad creative support"] },
    es: { title: "Diseño UI/UX", tools: "Figma · Webflow · Framer", items: ["Diseño UI/UX y prototipado", "Diseño de sitios y landing pages", "Desarrollo en Webflow y Framer", "Desarrollo en WordPress", "Soporte creativo para ads"] },
    color: "#f59e0b", colorLight: "rgba(245,158,11,0.12)",
  },
  {
    icon: BarChart3,
    en: { title: "Social Media & Strategy", tools: "Canva · Analytics · AI Tools", items: ["Social media carousels", "Presentation design", "Trend research & viral strategy", "Script writing", "Content calendars"] },
    es: { title: "Redes Sociales y Estrategia", tools: "Canva · Analytics · AI Tools", items: ["Carruseles para redes sociales", "Diseño de presentaciones", "Investigación de tendencias y estrategia viral", "Escritura de guiones", "Calendarios de contenido"] },
    color: "#10b981", colorLight: "rgba(16,185,129,0.12)",
  },
  {
    icon: Cpu,
    en: { title: "AI-Powered Creative", tools: "Midjourney · Sora · Leonardo · Kling", items: ["AI image generation & editing", "AI video production", "AI voice & audio synthesis", "Creative AI workflows", "Brand differentiation with AI"] },
    es: { title: "Creatividad con IA", tools: "Midjourney · Sora · Leonardo · Kling", items: ["Generación y edición de imágenes con IA", "Producción de video con IA", "Síntesis de voz y audio con IA", "Flujos de trabajo creativos con IA", "Diferenciación de marca con IA"] },
    color: "#8b5cf6", colorLight: "rgba(139,92,246,0.12)",
  },
];

function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const { lang } = useLang();
  const Icon = svc.icon;
  const content = lang === "en" ? svc.en : svc.es;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: "easeOut" }}
    >
      <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} perspective={1100} scale={1.02} glareEnable glareMaxOpacity={0.07} glareColor={svc.color} glarePosition="all" glareBorderRadius="20px" style={{ height: "100%" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: hovered ? `linear-gradient(135deg, ${svc.colorLight}, rgba(255,255,255,0.02))` : "rgba(255,255,255,0.025)",
            border: `1px solid ${hovered ? svc.color + "45" : "rgba(255,255,255,0.07)"}`,
            borderRadius: "20px", padding: "26px 24px", height: "100%",
            transition: "all 0.35s ease", position: "relative", overflow: "hidden",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Glow blob */}
          <div style={{ position: "absolute", top: "-35px", left: "-35px", width: "110px", height: "110px", borderRadius: "50%", background: svc.color + "20", filter: "blur(28px)", opacity: hovered ? 1 : 0.35, transition: "opacity 0.4s" }} />

          {/* Icon */}
          <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: svc.colorLight, border: `1px solid ${svc.color}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "14px", transition: "transform 0.3s", transform: hovered ? "scale(1.1)" : "scale(1)" }}>
            <Icon size={22} color={svc.color} />
          </div>

          <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.05rem", fontWeight: 800, color: "#f8fafc", marginBottom: "4px" }}>{content.title}</h3>
          <p style={{ fontSize: "0.7rem", color: svc.color, fontWeight: 600, marginBottom: "16px", opacity: 0.85, letterSpacing: "0.01em" }}>{content.tools}</p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "7px" }}>
            {content.items.map((item) => (
              <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "7px", color: "rgba(255,255,255,0.58)", fontSize: "0.83rem", lineHeight: 1.45 }}>
                <ChevronRight size={13} color={svc.color} style={{ flexShrink: 0, marginTop: "2px" }} />
                {item}
              </li>
            ))}
          </ul>

          {/* Bottom accent */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2.5px", background: `linear-gradient(90deg, ${svc.color}, transparent)`, borderRadius: "0 0 20px 20px", opacity: hovered ? 1 : 0, transition: "opacity 0.35s" }} />
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();

  return (
    <section id="services" ref={ref} style={{ padding: "clamp(40px, 5vw, 60px) 24px clamp(20px, 5vw, 40px)", position: "relative" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="tag-pill" style={{ marginBottom: "14px", display: "inline-flex", gap: "6px" }}>
            <Sparkles size={11} />
            {t("What I Do", "Lo que hago")}
          </span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2rem,4vw,3.2rem)", fontWeight: 900, color: "#f8fafc", margin: "0 0 14px", letterSpacing: "-0.025em" }}>
            {t("Professional", "Servicios")}{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t("Services", "Profesionales")}
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: "520px", margin: "0 auto", lineHeight: 1.65 }}>
            {t("Sharp instinct for trends with proven retention and virality formulas applied to everything I create.", "Instinto agudo para las tendencias con fórmulas probadas de retención y viralidad aplicadas a todo lo que creo.")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {services.map((svc, i) => <ServiceCard key={svc.en.title} svc={svc} index={i} />)}
        </div>


      </div>
    </section>
  );
}
