"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsMarquee from "@/components/ToolsMarquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  useEffect(() => {
    const path = window.location.pathname.replace('/', '').toLowerCase();
    if (['portfolio', 'services', 'tools', 'home'].includes(path)) {
      setTimeout(() => {
        const el = document.getElementById(path);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    }
  }, []);

  return (
    <main className="relative min-h-screen">
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <ToolsMarquee />
      <Services />
      <Portfolio />
      <Footer />
    </main>
  );
}
