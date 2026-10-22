"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const londonTime = () =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "numeric", minute: "2-digit", hour12: true })
    .format(new Date())
    .toUpperCase();

export default function Header({ onOpenContact }: { onOpenContact: () => void }) {
  const [navOpen, setNavOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    setTime(londonTime());
    const id = window.setInterval(() => setTime(londonTime()), 20000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const close = () => { if (mq.matches) setNavOpen(false); };
    mq.addEventListener("change", close);
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setNavOpen(false); };
    document.addEventListener("keydown", esc);
    return () => { mq.removeEventListener("change", close); document.removeEventListener("keydown", esc); };
  }, []);

  const links = [
    { href: "#about", label: "About." },
    { href: "#services", label: "Services." },
    { href: "#process", label: "Process." },
    { href: "#products", label: "Products" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      data-header
      className="fixed inset-x-0 top-0 z-50 h-[96px] transition-all duration-500 [&.is-scrolled]:h-[72px] [&.is-scrolled]:bg-black/70 [&.is-scrolled]:backdrop-blur-xl [&.is-scrolled]:border-b [&.is-scrolled]:border-white/5 [&.is-hidden]:-translate-y-full"
    >
      <div className="h-full px-[clamp(20px,2.6vw,50px)] grid grid-cols-[1fr_auto] lg:grid-cols-[1fr_auto_1fr] items-center gap-6">
        {/* Brand */}
        <a
          href="#home"
          data-scroll-to
          aria-label="iTech Evolution home"
          className="flex items-center gap-4 shrink-0 group"
        >
          <Image
            src="/logo.webp"
            alt="iTech Evolution"
            width={150}
            height={64}
            priority
            className="h-[40px] w-auto group-hover:scale-[1.04] transition-transform duration-500"
          />
          <span className="hidden xl:block font-mono text-[14px] text-white/55">IT Solutions Company.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-[clamp(28px,3.2vw,60px)]">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-scroll-to
              className="relative py-2 font-display text-[17px] font-medium text-white hover:text-white/60 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center justify-end gap-4">
          <span className="font-display font-bold text-[12px] tracking-[0.02em] uppercase text-white" suppressHydrationWarning>
            London&nbsp;&nbsp;{time}
          </span>
          <button
            onClick={onOpenContact}
            aria-label="Get a quote"
            title="Get a quote"
            className="w-8 h-8 rounded-full bg-white/10 border border-white/15 grid place-items-center text-white hover:bg-white hover:text-ink transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden justify-self-end w-12 h-12 grid place-content-center gap-[7px] rounded-full border border-white/20 bg-ink/50 backdrop-blur-lg cursor-pointer"
          aria-expanded={navOpen}
          aria-label={navOpen ? "Close menu" : "Open menu"}
          onClick={() => setNavOpen(!navOpen)}
        >
          <span
            className={`w-5 h-[1.5px] bg-white transition-transform duration-500 ${navOpen ? "translate-y-[4.25px] rotate-45" : ""}`}
          />
          <span
            className={`w-5 h-[1.5px] bg-white transition-transform duration-500 ${navOpen ? "-translate-y-[4.25px] -rotate-45" : ""}`}
          />
        </button>

        {/* Mobile overlay */}
        <div
          className={`lg:hidden fixed inset-0 z-[-1] flex flex-col justify-center px-8 pb-10 pt-24 bg-ink transition-[clip-path] duration-700 ${navOpen ? "[clip-path:circle(150%_at_calc(100%-44px)_42px)]" : "[clip-path:circle(0%_at_calc(100%-44px)_42px)]"}`}
        >
          <nav className="flex flex-col gap-1.5">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-scroll-to
                onClick={() => setNavOpen(false)}
                className="py-2 font-mono font-light text-[clamp(34px,9vw,52px)] tracking-[-0.04em] text-white hover:text-white/60 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <button
            onClick={() => { setNavOpen(false); onOpenContact(); }}
            className="btn-glow self-start mt-10 px-9 h-[56px] rounded-full font-display font-bold text-[13px] tracking-[0.2em] uppercase cursor-pointer"
          >
            <span>Get a Quote</span>
          </button>
        </div>
      </div>
    </header>
  );
}
