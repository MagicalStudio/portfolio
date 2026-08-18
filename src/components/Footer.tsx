"use client";

import { useLang } from "@/context/LangContext";
import { Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const { t } = useLang();

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ position: "relative", padding: "80px 24px 40px", overflow: "hidden", background: "#06060c", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      {/* Background Glow */}
      <div style={{ position: "absolute", bottom: "-150px", left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: "800px", height: "300px", background: "radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", marginBottom: "60px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "60px" }}>
          
          {/* Brand & Bio */}
          <div>
            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "#f8fafc", margin: "0 0 16px", letterSpacing: "-0.03em" }}>
              JM <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 400 }}>|</span> <span style={{ fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>Portfolio</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", lineHeight: 1.6, maxWidth: "340px", margin: 0 }}>
              {t(
                "Turning ideas into scroll-stopping video content, motion graphics, and modern UI/UX design.",
                "Transformando ideas en contenido visual impactante, motion graphics y diseño UI/UX moderno."
              )}
            </p>
          </div>

          {/* Navigation Links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>
              {t("Explore", "Explorar")}
            </h3>
            
            <a href="#hero" style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#a78bfa"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
              {t("Home", "Inicio")}
            </a>
            <a href="#tools" style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#a78bfa"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
              {t("Tools", "Herramientas")}
            </a>
            <a href="#services" style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#a78bfa"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
              {t("Services", "Servicios")}
            </a>
            <a href="#portfolio" style={{ display: "flex", alignItems: "center", gap: "10px", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.95rem", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "#a78bfa"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}>
              {t("Work", "Trabajo")}
            </a>
          </div>
        </div>

        {/* Copyright & Credit */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "20px" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", margin: 0 }}>
            © {currentYear} Jesus Monsalve. {t("All rights reserved.", "Todos los derechos reservados.")}
          </p>

          <a 
            href="https://nexocodestudio.netlify.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              padding: "8px 16px", 
              borderRadius: "100px", 
              background: "rgba(255,255,255,0.03)", 
              border: "1px solid rgba(255,255,255,0.08)", 
              color: "rgba(255,255,255,0.5)", 
              fontSize: "0.8rem", 
              textDecoration: "none",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.3)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(124,58,237,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {t("Designed & Developed by", "Diseñado y Desarrollado por")} <strong style={{ color: "#a78bfa", fontWeight: 600 }}>Nexocode Studio</strong>
            <ExternalLink size={12} style={{ opacity: 0.7 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
