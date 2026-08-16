"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ToolsMarquee from "@/components/ToolsMarquee";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
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
