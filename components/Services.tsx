"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import SectionHead from "./SectionHead";

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const services = [
  {
    title: "Web development",
    desc: "High-performing websites built with modern frameworks. Responsive, fast and SEO-optimised to turn visitors into customers.",
    tags: ["React", "Next.js", "WordPress", "UI/UX"],
    img: unsplash("1498050108023-c5249f4df085"),
    alt: "Laptop showing code on a developer's desk",
  },
  {
    title: "Digital marketing",
    desc: "Data-driven strategies that amplify your brand across search, social, paid and content, with analytics that prove ROI.",
    tags: ["SEO", "PPC", "Social", "Analytics"],
    img: unsplash("1460925895917-afdab827c52f"),
    alt: "Laptop displaying marketing analytics charts",
  },
  {
    title: "Software development",
    desc: "Custom software from enterprise platforms to SaaS products, delivered in agile sprints on scalable, maintainable code.",
    tags: ["Python", "Node.js", ".NET", "APIs"],
    img: unsplash("1461749280684-dccba630e2f6"),
    alt: "Monitor showing application source code",
  },
  {
    title: "Personal assistance",
    desc: "Dedicated virtual assistants and tech specialists for calendars, inboxes, research and admin automation.",
    tags: ["VA", "Admin", "Scheduling", "Support"],
    img: unsplash("1758598306663-4874b2aff114"),
    alt: "Assistant working on a laptop at a desk",
  },
  {
    title: "Cloud services",
    desc: "Seamless migration to Office 365, AWS and Azure, with security compliance, backups and ongoing cost optimisation.",
    tags: ["AWS", "Azure", "Office 365", "Security"],
    img: unsplash("1667984390538-3dea7a3fe33d"),
    alt: "3D render of a cloud computing concept",
  },
  {
    title: "IT management",
    desc: "Proactive hardware provisioning, network optimisation and maintenance that keep your business running without interruption.",
    tags: ["Networking", "Hardware", "Helpdesk"],
    img: unsplash("1558494949-ef010cbdcc31"),
    alt: "Network cables connected to a server rack",
  },
  {
    title: "App development",
    desc: "Native and cross-platform apps for iOS and Android, engineered for performance and a polished experience.",
    tags: ["iOS", "Android", "Flutter", "React Native"],
    img: unsplash("1512941937669-90a1b58e7e9c"),
    alt: "Smartphone showing a mobile app home screen",
  },
];

const PREVIEW_W = 340;
const PREVIEW_H = 230;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Services() {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: -999, y: -999 });
  const shown = useRef(false);
  shown.current = active !== null;

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = previewRef.current!;
    const cur = { ...target.current };
    let lastX = cur.x;
    let raf = 0;
    const tick = () => {
      // While hidden, sit on the cursor so the preview appears in place instead of flying in.
      const ease = shown.current ? 0.14 : 1;
      cur.x += (target.current.x - cur.x) * ease;
      cur.y += (target.current.y - cur.y) * ease;
      const tilt = Math.max(-7, Math.min(7, (cur.x - lastX) * 0.3));
      lastX = cur.x;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0) rotate(${tilt}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function follow(e: PointerEvent) {
    const flip = e.clientX + 40 + PREVIEW_W > window.innerWidth;
    target.current = {
      x: flip ? e.clientX - 40 - PREVIEW_W : e.clientX + 40,
      y: e.clientY - PREVIEW_H / 2,
    };
  }

  return (
    <section id="services" data-sea className="relative section-pad section-veil overflow-clip">
      <div className="container-site relative z-10">
        <SectionHead
          index="II"
          label="Services"
          title="The best IT solutions."
          intro="Seven disciplines under one roof, each tailored to the unique needs of your business."
          aside={`${pad(services.length)} disciplines, one team.`}
        />

        <ul
          data-stagger
          className="border-t border-white/10"
          onPointerMove={follow}
          onPointerLeave={() => setActive(null)}
        >
          {services.map((s, i) => (
            <li key={s.title} className="border-b border-white/10">
              <a
                href="#contact"
                data-scroll-to
                onPointerEnter={(e) => {
                  follow(e);
                  setActive(i);
                }}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={`group grid gap-x-8 gap-y-4 py-[clamp(28px,3.2vw,46px)] lg:grid-cols-[64px_minmax(0,1fr)_minmax(0,360px)_56px] lg:items-center outline-none transition-opacity duration-500 ${
                  active !== null && active !== i ? "lg:opacity-30" : ""
                }`}
              >
                <span className="font-mono text-[12px] tracking-[0.12em] text-white/35 lg:self-start lg:pt-4">{pad(i + 1)}</span>

                <h3 className="font-mono font-light text-[clamp(30px,3.7vw,56px)] leading-[1.04] tracking-[-0.05em] text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover:translate-x-4 lg:group-focus-visible:translate-x-4">
                  {s.title}
                </h3>

                <div className="relative lg:hidden aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                  <Image src={s.img} alt={s.alt} fill sizes="100vw" className="object-cover grayscale" />
                </div>

                <div>
                  <p className="text-[15px] leading-relaxed text-white/55">{s.desc}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <li key={t} className="tag-pill">{t}</li>
                    ))}
                  </ul>
                </div>

                <span className="hidden lg:grid w-14 h-14 rounded-full border border-white/15 place-items-center text-white/70 transition-colors duration-500 group-hover:bg-white group-hover:text-ink group-hover:border-white group-focus-visible:bg-white group-focus-visible:text-ink">
                  <svg className="w-5 h-5 -rotate-45 transition-transform duration-500 group-hover:rotate-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center justify-between gap-6 mt-[clamp(32px,4vw,52px)]">
          <p className="font-mono text-[13px] text-white/45">Need something that isn&apos;t listed?</p>
          <a
            href="#contact"
            data-scroll-to
            className="group inline-flex items-center gap-3 font-display font-bold text-[12px] tracking-[0.16em] uppercase text-white"
          >
            Tell us about it
            <span className="w-9 h-9 rounded-full border border-white/25 grid place-items-center transition-colors duration-500 group-hover:bg-white group-hover:text-ink">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
            </span>
          </a>
        </div>
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] hidden lg:block pointer-events-none will-change-transform"
        style={{ width: PREVIEW_W, height: PREVIEW_H }}
      >
        <div
          className={`relative w-full h-full rounded-2xl overflow-hidden border border-white/15 bg-[#0B0B0E] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            active !== null ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              className="absolute inset-0 transition-[clip-path] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                clipPath: i === active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                zIndex: i === active ? 2 : 1,
              }}
            >
              <Image src={s.img} alt="" fill loading="eager" sizes={`${PREVIEW_W}px`} className="object-cover grayscale-[40%]" />
            </div>
          ))}
          <span className="absolute left-3 bottom-3 z-10 label-pill !h-7 !px-3 text-white/85">
            {active !== null ? `${pad(active + 1)} / ${pad(services.length)}` : ""}
          </span>
        </div>
      </div>
    </section>
  );
}
