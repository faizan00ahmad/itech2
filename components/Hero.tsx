"use client";

import { useEffect, useState } from "react";

const PILLARS = [
  { line: "We build digital evolution.", service: "Web Development" },
  { line: "We grow brands online.", service: "Digital Marketing" },
  { line: "We engineer software that scales.", service: "Software" },
  { line: "We move business to the cloud.", service: "Cloud & IT" },
];

const ROMAN = ["I", "II", "III", "IV"];

function Line({ text }: { text: string }) {
  const words = text.split(" ");
  let n = 0;
  return (
    <>
      {words.map((word, w) => (
        <span key={w}>
          <span className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch, c) => (
              <span key={c} className="char-in" style={{ animationDelay: `${n++ * 28}ms` }}>
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % PILLARS.length), 4600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      data-sea
      className="relative isolate overflow-hidden min-h-[max(100svh,640px)] flex flex-col items-center justify-center px-6 pt-[96px] pb-[140px]"
    >
      <p className="inline-flex items-center gap-2 mb-8 px-4 h-8 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md font-mono text-[11px] tracking-[0.18em] uppercase">
        <span className="text-white">{ROMAN[i]}</span>
        <span className="text-white/40">&bull;</span>
        <span className="text-white/40">{ROMAN[PILLARS.length - 1]}</span>
        <span className="text-white font-medium ml-0.5">Pillars</span>
      </p>

      <h1
        key={i}
        aria-live="polite"
        className="max-w-[18ch] text-center font-mono font-light text-[clamp(38px,5.4vw,84px)] leading-[1.08] tracking-[-0.04em] text-white"
      >
        <Line text={PILLARS[i].line} />
      </h1>

      <p className="mt-7 max-w-[52ch] text-center font-mono text-[13px] leading-relaxed text-white/45">
        iTech Evolution &mdash; a UK-based IT solutions company for growth &amp; success.
      </p>

      <ul className="absolute left-[clamp(20px,2.6vw,50px)] bottom-[clamp(32px,6vh,60px)] hidden sm:grid gap-[22px]">
        {PILLARS.map((p, k) => (
          <li key={p.service}>
            <button
              onClick={() => setI(k)}
              className={`font-display font-bold text-[12px] tracking-[0.16em] uppercase transition-colors duration-500 cursor-pointer ${
                k === i ? "text-white" : "text-white/35 hover:text-white/70"
              }`}
            >
              {p.service}
            </button>
          </li>
        ))}
      </ul>

      <a
        href="#about"
        data-scroll-to
        aria-label="Scroll to about"
        className="hero-dot absolute left-1/2 -ml-[11px] bottom-[clamp(110px,20vh,170px)] w-[22px] h-[22px] rounded-full bg-white"
      />

      <a
        href="#contact"
        data-scroll-to
        className="absolute right-[clamp(20px,2.6vw,50px)] bottom-[clamp(32px,6vh,60px)] hidden sm:inline-flex items-center gap-3 font-display font-bold text-[12px] tracking-[0.16em] uppercase text-white/80 hover:text-white transition-colors"
      >
        Start a project
        <span className="w-9 h-9 rounded-full border border-white/25 grid place-items-center">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
        </span>
      </a>
    </section>
  );
}
