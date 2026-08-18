"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Menu, X, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LangContext";

const navLinks = [
  { en: "Home", es: "Inicio", href: "#hero" },
  { en: "Tools", es: "Herramientas", href: "#tools" },
  { en: "Services", es: "Servicios", href: "#services" },
  { en: "Work", es: "Trabajo", href: "#portfolio" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(5,5,16,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "72px" }}>
          {/* Logo */}
          <motion.a href="#hero" whileHover={{ scale: 1.02 }} style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "1.35rem", background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>JM</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>|</span>
            <span style={{ fontSize: "0.8rem", fontWeight: 400, color: "rgba(255,255,255,0.55)", fontFamily: "'Outfit',sans-serif" }}>Portfolio</span>
          </motion.a>

          {/* Desktop */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "4px" }}>
            {navLinks.map((link) => (
              <motion.a key={link.href} href={link.href}
                style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.875rem", padding: "8px 14px", borderRadius: "8px", transition: "all 0.2s ease", fontFamily: "'Outfit',sans-serif" }}
                onMouseEnter={(e) => { (e.currentTarget).style.color = "#a78bfa"; (e.currentTarget).style.background = "rgba(124,58,237,0.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget).style.color = "rgba(255,255,255,0.6)"; (e.currentTarget).style.background = "transparent"; }}
              >
                {lang === "en" ? link.en : link.es}
              </motion.a>
            ))}

            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "es" : "en")}
              style={{ display: "flex", alignItems: "center", gap: "5px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "rgba(255,255,255,0.6)", padding: "7px 12px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600, fontFamily: "'Outfit',sans-serif", marginLeft: "4px", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget).style.borderColor = "rgba(124,58,237,0.4)"; (e.currentTarget).style.color = "#a78bfa"; }}
              onMouseLeave={(e) => { (e.currentTarget).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget).style.color = "rgba(255,255,255,0.6)"; }}
            >
              <Globe size={13} />
              {lang === "en" ? "ES" : "EN"}
            </button>


          </div>

          {/* Mobile */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" style={{ background: "none", border: "none", cursor: "pointer", color: "#a78bfa", padding: "6px" }}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -15, scale: 0.96 }} 
            animate={{ opacity: 1, y: 0, scale: 1 }} 
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 350, damping: 25 }}
            style={{ 
              position: "absolute", 
              top: "100%", 
              left: "16px", 
              right: "16px", 
              marginTop: "8px", 
              background: "rgba(10, 10, 16, 0.75)", 
              backdropFilter: "blur(24px)", 
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)", 
              borderRadius: "24px", 
              padding: "20px",
              boxShadow: "0 30px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.05, type: "spring", stiffness: 300, damping: 25 }}
                  whileHover={{ x: 6, backgroundColor: "rgba(255,255,255,0.04)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{ 
                    display: "flex", 
                    alignItems: "center",
                    justifyContent: "space-between",
                    color: "rgba(255,255,255,0.9)", 
                    textDecoration: "none", 
                    padding: "16px 20px", 
                    borderRadius: "16px", 
                    fontSize: "1.15rem", 
                    fontWeight: 600,
                    fontFamily: "'Outfit',sans-serif",
                    transition: "background-color 0.2s ease"
                  }}
                >
                  <span>{lang === "en" ? link.en : link.es}</span>
                  <ChevronRight size={18} color="rgba(255,255,255,0.2)" />
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.25 }}
              style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px dashed rgba(255,255,255,0.1)" }}
            >
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setLang(lang === "en" ? "es" : "en"); setTimeout(() => setMobileOpen(false), 300); }} 
                style={{ 
                  width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", 
                  padding: "16px", background: "linear-gradient(135deg, rgba(167,139,250,0.15), rgba(6,182,212,0.15))", 
                  border: "1px solid rgba(167,139,250,0.3)", borderRadius: "16px", color: "#f8fafc", 
                  cursor: "pointer", fontSize: "0.95rem", fontWeight: 700, fontFamily: "'Outfit',sans-serif",
                  boxShadow: "0 8px 20px rgba(167,139,250,0.15)"
                }}
              >
                <Globe size={18} /> {lang === "en" ? "Cambiar a Español" : "Switch to English"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
