"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  Film, Sparkles, PlayCircle, Layers, Image as ImageIcon, Wand2, Monitor, Cpu,
  ChevronRight, ChevronLeft, Play, ExternalLink, Smartphone, Eye, X, Loader2
} from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

type MediaItem = { src: string; type: "video" | "image"; label: string; color: string };

import { useLang } from "@/context/LangContext";

const categories = [
  {
    id: 1,
    icon: Film,
    en: { title: "Commercial / Short Content", desc: "High-impact short-form videos crafted for maximum retention — Reels, TikToks, and YouTube Shorts with precision color grading, dynamic speed ramping, and scroll-stopping hooks." },
    es: { title: "Contenido Comercial / Corto", desc: "Videos cortos de alto impacto para máxima retención — Reels, TikToks y YouTube Shorts con color grading preciso, speed ramping dinámico y ganchos que detienen el scroll." },
    tools: ["Adobe Premiere", "After Effects", "CapCut"],
    color: "#7c3aed",
    colorLight: "rgba(124,58,237,0.12)",
    gradient: "linear-gradient(135deg, #3b0764, #6d28d9)",
    cardCount: 4,
    cards: [
      { label: "Magical Edition", videoSrc: "/short-content/magical-edition.mp4" },
      { label: "Talking Head", videoSrc: "/short-content/talking-head-2.mov" },
      { label: "Empresa Fantasma", videoSrc: "/short-content/empresa-fantasma.mp4" },
      { label: "Influencer Fútbol", videoSrc: "/short-content/influencer-futbol.mov" },
    ],
    cardLabels: ["Magical Edition", "Talking Head", "Empresa Fantasma", "Influencer Fútbol"],
  },
  {
    id: 2,
    icon: Smartphone,
    en: { title: "Reels / Shorts Covers", desc: "Eye-catching custom covers for Reels and Shorts designed to grab attention instantly in feeds, driving higher tap-through rates and maximizing viewership." },
    es: { title: "Portadas para Reels / Shorts", desc: "Portadas personalizadas y llamativas para Reels y Shorts diseñadas para captar atención instantáneamente en los feeds, aumentando la tasa de clics y maximizando visualizaciones." },
    tools: ["Photoshop", "Illustrator", "AI Software"],
    color: "#10b981",
    colorLight: "rgba(16,185,129,0.12)",
    gradient: "linear-gradient(135deg, #064e3b, #059669)",
    cardCount: 3,
    cards: [
      { label: "Mr Beast Style", imageSrc: "/reels-covers/mr-beast.jpg" },
      { label: "Growth Strategy", imageSrc: "/reels-covers/growth-strategue.jpg" },
      { label: "TikTok Viral", imageSrc: "/reels-covers/tiktok.jpg" },
    ],
    cardLabels: ["Podcast Clip", "Vlog Cover", "Tutorial Short"],
  },
  {
    id: 3,
    icon: Sparkles,
    en: { title: "Vox Style Motion Graphics Explainer", desc: "Documentary-style motion graphics and explainer animations that simplify complex ideas — kinetic typography, illustrated characters, and data-driven storytelling." },
    es: { title: "Motion Graphics Estilo Vox", desc: "Animaciones explicativas estilo documental que simplifican ideas complejas — tipografía cinética, personajes ilustrados y storytelling basado en datos." },
    tools: ["After Effects", "Illustrator"],
    color: "#06b6d4",
    colorLight: "rgba(6,182,212,0.12)",
    gradient: "linear-gradient(135deg, #0c4a6e, #0891b2)",
    cardCount: 5,
    cards: [
      { label: "Wealthiest Edit", videoSrc: "/ai-content/ai-1.mp4" },
      { label: "Custom PNG Edit", videoSrc: "/ai-content/ai-8.mp4" },
      { label: "Vox Example 3", videoSrc: "/vox-style/Vox Example 3.mp4" },
      { label: "Vox Example 4", videoSrc: "/vox-style/Vox example 4.mp4" },
      { label: "Vox Example 5", videoSrc: "/vox-style/Vox example 5.mp4" },
    ],
    cardLabels: ["Wealthiest Edit", "Custom PNG Edit", "Vox Example 3", "Vox Example 4", "Vox Example 5"],
  },
  {
    id: 4,
    icon: PlayCircle,
    en: { title: "YouTube Long-Form Content", desc: "Engaging long-form YouTube videos with structured narrative, smooth J/L-cuts, b-roll integration, chapter markers, end screens, and retention-optimized editing." },
    es: { title: "Contenido Long-Form de YouTube", desc: "Videos de YouTube largos y atractivos con narrativa estructurada, J/L-cuts fluidos, integración de b-roll, marcadores de capítulos y edición optimizada para retención." },
    tools: ["Adobe Premiere", "After Effects"],
    color: "#ef4444",
    colorLight: "rgba(239,68,68,0.12)",
    gradient: "linear-gradient(135deg, #7f1d1d, #dc2626)",
    cardCount: 2,
    cards: [
      { label: "Dr. de la Alimentación", videoSrc: "/youtube-longform/podcast-edit.mov" },
      { label: "Best Podcast Setup", videoSrc: "/youtube-longform/youtube-video-2.mov" }
    ],
    cardLabels: ["Interview", "Vlog Edit", "Review", "Tutorial", "Podcast", "Documentary"],
  },
  {
    id: 5,
    icon: Eye,
    en: { title: "YouTube Thumbnails", desc: "High-CTR custom YouTube thumbnails optimized for clicks — striking visuals, vibrant color grading, compelling text layouts, and AI-enhanced imagery." },
    es: { title: "Miniaturas de YouTube", desc: "Miniaturas personalizadas de YouTube con alto CTR optimizadas para clics — visuales impactantes, color grading vibrante, textos persuasivos e imágenes mejoradas con IA." },
    tools: ["Photoshop", "Illustrator", "AI Software"],
    color: "#f97316",
    colorLight: "rgba(249,115,22,0.12)",
    gradient: "linear-gradient(135deg, #7c2d12, #ea580c)",
    cardCount: 8,
    cards: [
      { label: "Legendary Riffs", imageSrc: "/youtube-thumbnails/1.jpg" },
      { label: "Neighborhood Battle", imageSrc: "/youtube-thumbnails/2.jpg" },
      { label: "Pay Taxes Legally", imageSrc: "/youtube-thumbnails/3.jpg" },
      { label: "Ketogenic Diet", imageSrc: "/youtube-thumbnails/4.jpg" },
      { label: "LinkedIn Design", imageSrc: "/youtube-thumbnails/5.jpg" },
      { label: "PC Building Sim", imageSrc: "/youtube-thumbnails/6.jpg" },
      { label: "Thumbnail Masterclass", imageSrc: "/youtube-thumbnails/7.jpg" },
      { label: "Zuck vs Musk", imageSrc: "/youtube-thumbnails/8.jpg" },
    ],
    cardLabels: ["Legendary Riffs", "Neighborhood Battle", "Pay Taxes Legally", "Ketogenic Diet", "LinkedIn Design", "PC Building Sim", "Thumbnail Masterclass", "Zuck vs Musk"],
  },
  {
    id: 6,
    icon: Layers,
    en: { title: "Animated Motion Flyer", desc: "Eye-catching animated flyers and promotional assets with fluid motion design — social-ready animations that combine bold typography, particle effects, and brand identity." },
    es: { title: "Flyer Animado", desc: "Flyers animados y activos promocionales con diseño de movimiento fluido — animaciones listas para redes que combinan tipografía audaz, efectos de partículas e identidad de marca." },
    tools: ["After Effects", "Photoshop", "Illustrator"],
    color: "#f59e0b",
    colorLight: "rgba(245,158,11,0.12)",
    gradient: "linear-gradient(135deg, #78350f, #d97706)",
    cardCount: 5,
    cards: [
      { label: "MMA Promo", videoSrc: "/motion-graphics/mma-motion-flyer.mp4" },
      { label: "Wine Ad", videoSrc: "/motion-graphics/wine-animated-flyer.mp4" },
      { label: "Burger Promo", videoSrc: "/motion-graphics/burger-motion-flyer.mp4" },
      { label: "Gianfri Flyer", videoSrc: "/motion-graphics/flyer-1.mp4" },
      { label: "Pink Flyer", videoSrc: "/motion-graphics/flyer-2.mp4" },
    ],
    cardLabels: ["Event Flyer", "Promo Loop", "Sale Ad", "Gianfri Flyer", "Pink Flyer"],
  },
  {
    id: 7,
    icon: ImageIcon,
    en: { title: "Social Media Graphics — Print, Carousels & Posters", desc: "Bold, print-ready visual assets across all formats — Instagram carousels, LinkedIn posts, poster design, magazine layouts, infographics, and branded presentation templates." },
    es: { title: "Gráficas para Redes — Impresos, Carruseles y Pósters", desc: "Activos visuales audaces y listos para imprimir en todos los formatos — carruseles de Instagram, posts de LinkedIn, diseño de pósters, layouts de revistas, infografías y plantillas de presentación." },
    tools: ["Photoshop", "Illustrator", "InDesign"],
    color: "#ec4899",
    colorLight: "rgba(236,72,153,0.12)",
    gradient: "linear-gradient(135deg, #831843, #db2777)",
    cardCount: 4,
    cards: [
      { label: "Design 1", imageSrc: "/social-media/a1.jpg" },
      { label: "Design 2", imageSrc: "/social-media/a2.jpg" },
      { label: "Design 3", imageSrc: "/social-media/a3.jpg" },
      { label: "Design 4", imageSrc: "/social-media/a4.jpg" },
    ],
    cardLabels: ["Carousel", "Magazine", "Infographic", "Poster"],
  },
  {
    id: 8,
    icon: Wand2,
    en: { title: "Image Manipulation & Retouching", desc: "Professional photo retouching, compositing, and creative image manipulation — seamless background removal, skin retouching, creative composites, and commercial-grade image enhancement." },
    es: { title: "Manipulación y Retoque de Imagen", desc: "Retoque fotográfico profesional, composición y manipulación creativa de imágenes — eliminación de fondo perfecta, retoque de piel, composiciones creativas y mejora de imagen de nivel comercial." },
    tools: ["Photoshop"],
    color: "#14b8a6",
    colorLight: "rgba(20,184,166,0.12)",
    gradient: "linear-gradient(135deg, #042f2e, #0d9488)",
    cardCount: 14,
    cards: [
      { label: "Creative Edit", imageSrc: "/photo-manipulation/54be83c4-5fba-46f4-ad35-5e547dbc77ff.JPG.jpeg" },
      { label: "Photo Retouch", imageSrc: "/photo-manipulation/7cdd2279-90ba-4dda-9c78-6fcca98acd06.JPG.jpeg" },
      { label: "Composite", imageSrc: "/photo-manipulation/9968c4b5-2913-4cb3-a137-46c9b7f62c0a.JPG.jpeg" },
      { label: "Digital Art", imageSrc: "/photo-manipulation/9d0036e7-9b84-415c-a081-687c3157a8a5.JPG.jpeg" },
      { label: "Color Grade", imageSrc: "/photo-manipulation/IMG_3039.JPG.jpeg" },
      { label: "Studio Edit", imageSrc: "/photo-manipulation/IMG_3040.JPG.jpeg" },
      { label: "Fantasy Art", imageSrc: "/photo-manipulation/IMG_3042.JPG.jpeg" },
      { label: "VFX Composite", imageSrc: "/photo-manipulation/IMG_3043.JPG.jpeg" },
      { label: "Manipulation", imageSrc: "/photo-manipulation/IMG_3044.JPG.jpeg" },
      { label: "Concept Art", imageSrc: "/photo-manipulation/IMG_3045.PNG" },
      { label: "Portrait Retouch", imageSrc: "/photo-manipulation/IMG_3067.JPG.jpeg" },
      { label: "Matte Painting", imageSrc: "/photo-manipulation/af9d760c-5386-4f18-af40-cd2809d0bf77.JPG.jpeg" },
      { label: "Poster Design", imageSrc: "/photo-manipulation/bb15a112-40d7-4e7d-9ecf-4ad9fe420aeb.JPG.jpeg" },
      { label: "Creative Ads", imageSrc: "/photo-manipulation/f5369e50-cc5b-40c7-9972-55e285592095.JPG.jpeg" },
    ],
    cardLabels: ["Portrait", "Product Shot", "Composite", "Background FX", "Skin Retouch", "Color Grade"],
  },
  {
    id: 9,
    icon: Monitor,
    en: { title: "UI/UX Web Design", desc: "User-centered interfaces built with precision — from Figma prototypes to fully deployed websites in Webflow, Framer, and WordPress. Responsive, accessible, and conversion-optimized." },
    es: { title: "Diseño UI/UX Web", desc: "Interfaces centradas en el usuario construidas con precisión — desde prototipos en Figma hasta sitios web completamente desplegados en Webflow, Framer y WordPress. Responsivos, accesibles y optimizados para conversión." },
    tools: ["Figma", "Webflow", "Framer", "Vercel", "GitHub", "WordPress"],
    color: "#8b5cf6",
    colorLight: "rgba(99,102,241,0.12)",
    gradient: "linear-gradient(135deg, #1e1b4b, #4338ca)",
    cardCount: 6,
    cards: [
      { label: "Agency Web", imageSrc: "/ui-ux/agency.jpg" },
      { label: "Courses Web", imageSrc: "/ui-ux/courses.jpg" },
      { label: "E-Commerce Web", imageSrc: "/ui-ux/ecommerce.jpg" },
      { label: "Event Web", imageSrc: "/ui-ux/event.jpg" },
      { label: "Food Web", imageSrc: "/ui-ux/food.jpg" },
      { label: "NGO Web", imageSrc: "/ui-ux/ngo.jpg" },
    ],
    cardLabels: ["Landing Page", "App Design", "Dashboard UI", "E-commerce", "SaaS Website", "Design System"],
  },
  {
    id: 10,
    icon: Cpu,
    en: { title: "AI-Enhanced Content", desc: "Cutting-edge AI-powered creative production — from AI video generation and voice synthesis to AI-assisted image creation, leveraging the most powerful tools available today." },
    es: { title: "Contenido Mejorado con IA", desc: "Producción creativa de vanguardia impulsada por IA — desde generación de video con IA y síntesis de voz hasta creación de imágenes asistida por IA, aprovechando las herramientas más potentes disponibles hoy." },
    tools: ["Runway", "Kling AI", "Sora", "Veo3", "HeyGen", "ElevenLabs", "Midjourney", "Leonardo", "Nano Banana", "Higgsfield", "Lovart", "ComfyUI", "Claude"],
    color: "#a78bfa",
    colorLight: "rgba(167,139,250,0.12)",
    gradient: "linear-gradient(135deg, #1e1b4b, #4f46e5)",
    cardCount: 12,
    cards: [
      { label: "AI Living Moment", videoSrc: "/ai-content/ai-2.mp4" },
      { label: "AI Background Replacement VFX", videoSrc: "/ai-content/ai-12.mp4" },
      { label: "AI Clone Avatar", videoSrc: "/ai-content/ai-14.mp4" },
      { label: "Man Vs Monster", videoSrc: "/ai-content/ai-9.mp4" },
      { label: "Children Talking", videoSrc: "/ai-content/ai-3.mp4" },
      { label: "Messi Guitarra", videoSrc: "/ai-content/ai-7.mp4" },
      { label: "AI Characters", videoSrc: "/ai-content/ai-11.mp4" },
      { label: "Sal Stewart AI", videoSrc: "/ai-content/ai-13.mp4" },
      { label: "Gatos Podcast AI", videoSrc: "/ai-content/ai-6.mp4" },
      { label: "Skydiving AI", videoSrc: "/ai-content/ai-4.mp4", orientation: "horizontal" },
      { label: "Gato Hielo", videoSrc: "/ai-content/ai-5.mp4", orientation: "horizontal" },
      { label: "SpongeCat", videoSrc: "/ai-content/ai-10.mp4", orientation: "horizontal" },
    ],
    cardLabels: ["AI Living Moment", "AI Background Replacement VFX", "AI Clone Avatar", "Man Vs Monster", "Children Talking", "Messi Guitarra", "AI Characters", "Sal Stewart AI", "Gatos Podcast AI", "Skydiving AI", "Gato Hielo", "SpongeCat"],
  },
];

function ExampleCard({
  label,
  index,
  color,
  gradient,
  videoSrc,
  imageSrc,
  onSelect,
  width = 200,
  height = 150,
}: {
  label: string;
  index: number;
  color: string;
  gradient: string;
  videoSrc?: string;
  imageSrc?: string;
  onSelect?: () => void;
  width?: number;
  height?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const hasMedia = !!(videoSrc || imageSrc);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track visibility per-card for aggressive performance optimization
  // margin "600px" starts downloading just before it enters the screen
  const cardInView = useInView(cardRef, { once: true, margin: "600px" });

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
      style={{
        flexShrink: 0,
        width: `${width}px`,
        borderRadius: "14px",
        overflow: "hidden",
        border: `1px solid ${hovered ? color + "50" : "rgba(255,255,255,0.08)"}`,
        cursor: onSelect ? "pointer" : "default",
        transition: "border-color 0.3s ease",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      {/* Card visual */}
      <div
        style={{
          height: `${height}px`,
          background: hasMedia ? "#0a0a0a" : gradient,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorations — only show when no real media */}
        {!hasMedia && (
          <>
            <div style={{ position: "absolute", inset: 0, opacity: 0.4, backgroundImage: "radial-gradient(ellipse at 20% 20%, rgba(255,255,255,0.2) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(0,0,0,0.3) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
            <div style={{ position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)", width: "80px", height: "80px", borderRadius: "50%", background: color + "40", filter: "blur(20px)" }} />
          </>
        )}

        {cardInView && hasMedia && !loaded && (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
              <Loader2 size={24} color={color} style={{ opacity: 0.5 }} />
            </motion.div>
          </div>
        )}

        {cardInView && videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onContextMenu={(e) => e.preventDefault()}
            controlsList="nodownload"
            disablePictureInPicture
            onLoadedData={() => setLoaded(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, display: "block", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease", zIndex: 2 }}
          />
        ) : cardInView && imageSrc ? (
          <Image
            src={imageSrc}
            alt={label}
            fill
            loading="lazy"
            onContextMenu={(e) => e.preventDefault()}
            draggable={false}
            onLoad={() => setLoaded(true)}
            style={{ objectFit: "cover", objectPosition: "center", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease", zIndex: 2 }}
            sizes="(max-width: 768px) 300px, 400px"
            quality={75}
          />
        ) : null}

        {/* Play icon overlay on hover */}
        {onSelect && (
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)", zIndex: 3 }}
          >
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", border: `1.5px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ExternalLink size={16} color={color} />
            </div>
          </motion.div>
        )}

        {/* Index number */}
        <div style={{ position: "absolute", top: "10px", left: "12px", fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.05em", zIndex: 4, textShadow: "0 1px 6px rgba(0,0,0,0.9)" }}>
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Card label */}
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", fontFamily: "'Outfit',sans-serif" }}>{label}</div>
      </div>
    </motion.div>
  );
}

function CategoryRow({ cat, index, onSelectMedia }: { cat: typeof categories[0]; index: number; onSelectMedia: (media: MediaItem) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const Icon = cat.icon;
  const content = lang === "en" ? cat.en : cat.es;

  let cardWidth = 280;
  let cardHeight = 180;
  
  if ([1, 2, 3, 6, 10].includes(cat.id)) {
    // Vertical videos/images (TikToks, Reels, Flyers, AI, Vox)
    cardWidth = 220;
    cardHeight = 360;
  } else if ([4, 5].includes(cat.id)) {
    // Standard horizontal (YouTube)
    cardWidth = 320;
    cardHeight = 180;
  } else if (cat.id === 7 || cat.id === 9) {
    // Social Media Carousels and UI/UX Web (wide but not too huge)
    cardWidth = 360;
    cardHeight = 220;
  } else {
    // Mixed (Manipulations)
    cardWidth = 280;
    cardHeight = 200;
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = cardWidth * 1.5;
      scrollRef.current.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
    }
  };



  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.05, ease: "easeOut" }}
      style={{ marginBottom: "64px" }}
    >
      {/* Category header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "18px", marginBottom: "20px", flexWrap: "wrap" }}>
        {/* Icon + number */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
          <div style={{ width: "48px", height: "48px", borderRadius: "13px", background: cat.colorLight, border: `1px solid ${cat.color}35`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={22} color={cat.color} />
          </div>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: cat.color, letterSpacing: "0.06em", opacity: 0.7 }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ maxWidth: "680px" }}>
            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(1.05rem,1.8vw,1.25rem)", color: "#f8fafc", margin: "0 0 5px", letterSpacing: "-0.01em" }}>
              {content.title}
            </h3>

            {/* Tools */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: "6px" }}>
              {cat.tools.map((tool) => (
               <span key={tool} style={{ fontSize: "0.68rem", color: cat.color, fontWeight: 600, padding: "2px 8px", background: cat.colorLight, border: `1px solid ${cat.color}25`, borderRadius: "6px" }}>
                  {tool}
                </span>
              ))}
            </div>

            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
              {content.desc}
            </p>
          </div>
          
          {/* Scroll Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${cat.color}30`, borderColor: cat.color }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("left")}
              style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.12)", borderTop: "1px solid rgba(255,255,255,0.25)", borderLeft: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f8fafc", cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: `0 8px 20px ${cat.color}30`, borderColor: cat.color }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("right")}
              style={{ width: "42px", height: "42px", borderRadius: "12px", background: "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.12)", borderTop: "1px solid rgba(255,255,255,0.25)", borderLeft: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f8fafc", cursor: "pointer", boxShadow: "0 6px 16px rgba(0,0,0,0.5), inset 0 2px 8px rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Horizontal scroll cards */}
      <div style={{ position: "relative" }}>
        {/* Fade mask right */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(90deg, transparent, rgba(5,5,16,0.95))", zIndex: 2, pointerEvents: "none" }} />

        <div
          ref={scrollRef}
          style={{
            display: "flex",
            gap: "14px",
            alignItems: "center",
            overflowX: "auto",
            paddingBottom: "12px",
            paddingRight: "80px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className="hide-scrollbar"
        >
          {((cat as any).cards || cat.cardLabels.map((l: string) => ({ label: l }))).map((card: any, i: number) => {
            let dynamicWidth = cardWidth;
            let dynamicHeight = cardHeight;
            if (card.orientation === "horizontal") {
              dynamicWidth = 320;
              dynamicHeight = 180;
            }
            return (
              <ExampleCard
                key={card.label}
                label={card.label}
                index={i}
                color={cat.color}
                gradient={cat.gradient}
                videoSrc={card.videoSrc}
                imageSrc={card.imageSrc}
                width={dynamicWidth}
                height={dynamicHeight}
                onSelect={cat.id === 3 ? undefined : () => (card.videoSrc || card.imageSrc) && onSelectMedia({ 
                  src: card.videoSrc || card.imageSrc, 
                  type: card.videoSrc ? "video" : "image", 
                  label: card.label, 
                  color: cat.color 
                })}
              />
            );
          })}

          {/* "Coming Soon" card */}
          <div style={{ flexShrink: 0, width: `${cardWidth}px`, borderRadius: "14px", border: "1px dashed rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px", padding: "20px", cursor: "pointer" }}>
            <ChevronRight size={20} color="rgba(255,255,255,0.2)" />
            <span style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.2)", fontWeight: 500, textAlign: "center" }}>More coming soon</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      {index < categories.length - 1 && (
        <div style={{ marginTop: "40px", height: "1px", background: `linear-gradient(90deg, ${cat.color}40, transparent)` }} />
      )}
    </motion.div>
  );
}

export default function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLang();
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  return (
    <section id="portfolio" ref={ref} style={{ padding: "clamp(20px, 5vw, 40px) 24px", position: "relative", zIndex: selectedMedia ? 99999 : 10 }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "600px", background: "radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: "72px" }}>
          <span className="tag-pill" style={{ marginBottom: "16px", display: "inline-flex", gap: "6px" }}>
            <Play size={11} fill="currentColor" />
            {t("Selected Work", "Trabajo Seleccionado")}
          </span>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 900, color: "#f8fafc", margin: "0 0 16px", letterSpacing: "-0.025em" }}>
            {t("My", "Mi")}{" "}
            <span style={{ background: "linear-gradient(135deg,#a78bfa,#06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {t("Creative Portfolio", "Portafolio Creativo")}
            </span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", maxWidth: "580px", lineHeight: 1.7 }}>
            {t(
              "7+ years of professional work across video, motion, design, and web. Each category represents a specialization built through hundreds of real-world projects.",
              "7+ años de trabajo profesional en video, motion, diseño y web. Cada categoría representa una especialización construida a través de cientos de proyectos reales."
            )}
          </p>
        </motion.div>

        {/* Category rows */}
        {categories.map((cat, i) => (
          <CategoryRow key={cat.id} cat={cat} index={i} onSelectMedia={setSelectedMedia} />
        ))}
      </div>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedMedia(null)}
            style={{ 
              position: "fixed", 
              inset: 0, 
              zIndex: 99999, 
              background: "rgba(0,0,0,0.85)", 
              backdropFilter: "blur(16px)", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              padding: "clamp(20px, 6vh, 80px) clamp(16px, 4vw, 40px)" 
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{ 
                position: "relative", 
                width: "100%", 
                maxWidth: "1200px", 
                height: "100%", 
                maxHeight: "85vh", 
                background: "rgba(10, 10, 12, 0.6)", 
                borderRadius: "24px", 
                border: `1px solid rgba(255,255,255,0.06)`, 
                overflow: "hidden", 
                boxShadow: `0 40px 100px -20px rgba(0,0,0,1), 0 0 40px ${selectedMedia.color}15`, 
                display: "flex", 
                flexDirection: "column" 
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 24px", borderBottom: `1px solid rgba(255,255,255,0.04)`, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(10px)", zIndex: 10 }}>
                <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", fontFamily: "'Outfit',sans-serif", letterSpacing: "0.01em" }}>{selectedMedia.label}</span>
                <button onClick={() => setSelectedMedia(null)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.transform = "scale(1.05)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "scale(1)"; }}>
                  <X size={18} />
                </button>
              </div>
              
              {/* Content area with blurred backdrop */}
              <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
                
                {/* Blurred background (same media) */}
                {selectedMedia.type === "video" ? (
                  <video src={selectedMedia.src} autoPlay loop muted playsInline style={{ position: "absolute", inset: "-10%", width: "120%", height: "120%", objectFit: "cover", filter: "blur(60px)", opacity: 0.4, pointerEvents: "none" }} />
                ) : (
                  <img src={selectedMedia.src} alt="" style={{ position: "absolute", inset: "-10%", width: "120%", height: "120%", objectFit: "cover", filter: "blur(60px)", opacity: 0.4, pointerEvents: "none" }} />
                )}

                {/* Foreground crisp media */}
                {selectedMedia.type === "video" ? (
                  <video 
                    src={selectedMedia.src} 
                    autoPlay 
                    loop 
                    controls 
                    controlsList="nodownload"
                    disablePictureInPicture
                    playsInline 
                    onContextMenu={(e) => e.preventDefault()}
                    style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 2 }} 
                  />
                ) : (
                  <Image src={selectedMedia.src} alt={selectedMedia.label} fill style={{ objectFit: "contain", zIndex: 2 }} sizes="100vw" quality={100} priority onContextMenu={(e) => e.preventDefault()} draggable={false} />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}
