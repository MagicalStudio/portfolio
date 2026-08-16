"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Briefcase, Camera, Send, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";

import { useLang } from "@/context/LangContext";

const contactMethods = [
  { icon: Mail, en: { label: "Email", value: "juanguevara@email.com" }, es: { label: "Email", value: "juanguevara@email.com" }, href: "mailto:juanguevara@email.com", color: "#7c3aed" },
  { icon: Briefcase, en: { label: "LinkedIn", value: "linkedin.com/in/juanguevara" }, es: { label: "LinkedIn", value: "linkedin.com/in/juanguevara" }, href: "https://linkedin.com", color: "#06b6d4" },
  { icon: Camera, en: { label: "Instagram", value: "@juanguevara.design" }, es: { label: "Instagram", value: "@juanguevara.design" }, href: "https://instagram.com", color: "#ec4899" },
];


export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang, t } = useLang();
  const [formData, setFormData] = useState({ name: "", email: "", project: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", project: "", message: "" });
  };

  const inputBase = {
    width: "100%", padding: "13px 16px", background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)", borderRadius: "11px", color: "#f8fafc",
    fontSize: "0.88rem", outline: "none", fontFamily: "'Outfit',sans-serif",
    transition: "all 0.25s ease",
  } as React.CSSProperties;

  const getFocusedStyle = (field: string) =>
    focused === field ? { borderColor: "rgba(124,58,237,0.55)", boxShadow: "0 0 0 3px rgba(124,58,237,0.1)", ...inputBase } : inputBase;

  return (
    <section id="contact" ref={ref} style={{ padding: "100px 24px", position: "relative" }}>
      <div style={{ position: "absolute", right: "-80px", bottom: "-80px", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ textAlign: "center", marginBottom: "60px" }}>
          <span className="tag-pill" style={{ marginBottom: "14px", display: "inline-flex", gap: "6px" }}>
            <MessageSquare size={11} />
            {t("Contact", "Contacto")}
          </span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 900, color: "#f8fafc", margin: "0 0 14px", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            {t("Let's create something", "Creemos algo")}{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t("great together", "increíble juntos")}
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "1rem", maxWidth: "460px", margin: "0 auto", lineHeight: 1.65 }}>
            {t("Available for freelance projects, remote collaborations, and long-term opportunities.", "Disponible para proyectos freelance, colaboraciones remotas y oportunidades a largo plazo.")}
          </p>
        </motion.div>

        <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "36px", alignItems: "start" }}>

          {/* Left: Contact info */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {contactMethods.map((m) => {
              const Icon = m.icon;
              const content = lang === "en" ? m.en : m.es;
              return (
                <motion.a key={m.en.label} href={m.href} target="_blank" rel="noopener noreferrer"
                  whileHover={{ x: 5, background: `${m.color}0d` }}
                  className="glass"
                  style={{ display: "flex", alignItems: "center", gap: "14px", padding: "16px 18px", borderRadius: "14px", textDecoration: "none", transition: "all 0.3s ease" }}
                >
                  <div style={{ width: "42px", height: "42px", borderRadius: "11px", background: `${m.color}15`, border: `1px solid ${m.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={18} color={m.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.72rem", color: m.color, fontWeight: 700, marginBottom: "2px" }}>{content.label}</div>
                    <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.68)" }}>{content.value}</div>
                  </div>
                  <ArrowRight size={14} color="rgba(255,255,255,0.2)" />
                </motion.a>
              );
            })}

            {/* Availability */}
            <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.5 }}
              style={{ marginTop: "6px", padding: "18px", background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.18)", borderRadius: "14px" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80", animation: "pulse-glow 2s ease-in-out infinite" }} />
                <span style={{ color: "#4ade80", fontWeight: 700, fontSize: "0.83rem" }}>{t("Available Now", "Disponible Ahora")}</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem", lineHeight: 1.55, margin: 0 }}>
                {t("Accepting video, design, and web projects. 100% remote, English & Spanish.", "Acepto proyectos de video, diseño y web. 100% remoto, inglés y español.")}
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="glass" style={{ borderRadius: "22px", padding: "32px" }}
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: "center", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}
              >
                <CheckCircle size={48} color="#4ade80" />
                <h3 style={{ color: "#f8fafc", fontWeight: 700, fontSize: "1.15rem", fontFamily: "'Outfit',sans-serif" }}>
                  {t("Message Sent!", "¡Mensaje enviado!")}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.88rem" }}>
                  {t("I'll get back to you soon. Thank you!", "Te responderé pronto. ¡Gracias!")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", color: "rgba(255,255,255,0.4)", marginBottom: "7px", fontWeight: 600, letterSpacing: "0.04em" }}>{t("NAME *", "NOMBRE *")}</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={t("Your name", "Tu nombre")} style={getFocusedStyle("name")} onFocus={() => setFocused("name")} onBlur={() => setFocused("")} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.74rem", color: "rgba(255,255,255,0.4)", marginBottom: "7px", fontWeight: 600, letterSpacing: "0.04em" }}>EMAIL *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" style={getFocusedStyle("email")} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.74rem", color: "rgba(255,255,255,0.4)", marginBottom: "7px", fontWeight: 600, letterSpacing: "0.04em" }}>{t("PROJECT TYPE", "TIPO DE PROYECTO")}</label>
                  <select value={formData.project} onChange={(e) => setFormData({ ...formData, project: e.target.value })} style={{ ...inputBase, cursor: "pointer" }} onFocus={() => setFocused("project")} onBlur={() => setFocused("")}>
                    <option value="" style={{ background: "#0a0a1a" }}>{t("Select a service", "Selecciona un servicio")}</option>
                    <option value="video" style={{ background: "#0a0a1a" }}>Video Editing</option>
                    <option value="motion" style={{ background: "#0a0a1a" }}>Motion Graphics</option>
                    <option value="graphic" style={{ background: "#0a0a1a" }}>Graphic Design</option>
                    <option value="uiux" style={{ background: "#0a0a1a" }}>UI/UX & Web Design</option>
                    <option value="social" style={{ background: "#0a0a1a" }}>Social Media Strategy</option>
                    <option value="ai" style={{ background: "#0a0a1a" }}>AI-Enhanced Content</option>
                    <option value="other" style={{ background: "#0a0a1a" }}>Other</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.74rem", color: "rgba(255,255,255,0.4)", marginBottom: "7px", fontWeight: 600, letterSpacing: "0.04em" }}>{t("TELL ME ABOUT YOUR PROJECT *", "CUÉNTAME TU PROYECTO *")}</label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={t("Describe your project, timeline, and approximate budget...", "Describe tu proyecto, timeline y presupuesto aproximado...")} style={{ ...getFocusedStyle("message"), resize: "vertical", minHeight: "105px" }} onFocus={() => setFocused("message")} onBlur={() => setFocused("")} />
                </div>

                <motion.button type="submit" whileHover={{ scale: 1.02, boxShadow: "0 8px 40px rgba(124,58,237,0.5)" }} whileTap={{ scale: 0.98 }}
                  style={{ padding: "15px 30px", background: "linear-gradient(135deg,#7c3aed,#06b6d4)", color: "#fff", border: "none", borderRadius: "11px", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", fontFamily: "'Outfit',sans-serif", boxShadow: "0 4px 24px rgba(124,58,237,0.35)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                >
                  <Send size={15} />
                  {t("Send Message", "Enviar mensaje")}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>


      </div>

      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;}.form-row{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
