import SectionHead from "./SectionHead";

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-6 h-6",
};

const pillars = [
  {
    title: "User experience",
    desc: "Digital experiences that resonate profoundly with your target audience.",
    svg: <svg {...icon}><path d="M4 4l7 17 2.5-7.5L21 11z" /></svg>,
  },
  {
    title: "Quick support",
    desc: "Dedicated technical response teams, ready around the clock to assist you.",
    svg: <svg {...icon}><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1.5" /><rect x="17" y="14" width="4" height="6" rx="1.5" /></svg>,
  },
  {
    title: "Transparency",
    desc: "Full visibility, keeping you aligned on critical paths and project progress.",
    svg: <svg {...icon}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    title: "Full-stack team",
    desc: "End-to-end front-end and back-end design and engineering mastery.",
    svg: <svg {...icon}><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  },
];

export default function About() {
  return (
    <section id="about" data-sea className="relative section-pad section-veil overflow-clip">
      <div className="container-site">
        <SectionHead
          index="I"
          label="About"
          title={<>We build &amp; grow business.</>}
          aside="Empowering businesses with cutting-edge technology solutions."
        />

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-[clamp(40px,5vw,80px)] items-start">
          <div data-slide-left className="space-y-7">
            <p className="font-mono font-light text-[clamp(21px,2vw,30px)] leading-[1.4] tracking-[-0.03em] text-white">
              At iTech Evolution, we empower your business with technology that drives growth and efficiency.
            </p>
            <p className="max-w-[54ch] text-[16px] leading-relaxed text-white/55">
              We offer comprehensive services designed to address your unique challenges and unlock new
              opportunities. Our approach is fully client-centric: we integrate your feedback and keep you
              actively involved throughout the cycle.
            </p>
            <ul className="flex flex-wrap gap-x-10 border-t border-white/10">
              {[
                { v: "200+", l: "Projects delivered" },
                { v: "50+", l: "Clients worldwide" },
                { v: "08", l: "Service areas" },
              ].map((s) => (
                <li key={s.l} className="pt-7">
                  <strong className="block font-mono font-light text-[clamp(30px,3vw,44px)] leading-none tracking-[-0.05em] text-white">{s.v}</strong>
                  <span className="block mt-2.5 font-mono text-[11px] tracking-[0.18em] uppercase text-white/40">{s.l}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-stagger className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => (
              <article key={p.title} className="card glow-card p-[clamp(26px,3vw,36px)] min-h-[240px] flex flex-col">
                <div className="flex items-start justify-between">
                  <span className="w-12 h-12 rounded-full border border-white/15 grid place-items-center text-white">{p.svg}</span>
                  <span className="font-mono text-[12px] text-white/30">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-auto pt-10 font-display font-semibold text-[20px] tracking-[-0.01em] text-white">{p.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/55">{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
