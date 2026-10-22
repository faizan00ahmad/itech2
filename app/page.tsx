"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import LiquidBackground from "@/components/LiquidBackground";
import CursorRing from "@/components/CursorRing";
import ScrollAnimations from "@/components/ScrollAnimations";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Products from "@/components/Products";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <SmoothScroll />
      <LiquidBackground />
      <div className="grain" aria-hidden="true" />
      <CursorRing />
      <ScrollAnimations />

      <Header onOpenContact={() => setDialogOpen(true)} />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Products />
        <CTA />
        <Contact />
      </main>

      <Footer />

      <ContactDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />

      {/* Scroll progress bar */}
      <div data-progress className="scroll-bar" />
    </>
  );
}
