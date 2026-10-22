const row1 = [
  "Web development",
  "Digital marketing",
  "Software engineering",
  "Cloud services",
  "IT management",
  "App development",
  "Cyber security",
  "Personal assistance",
];

const row2 = ["React", "Next.js", "Node.js", "Python", "AWS", "Azure", "WordPress", "Flutter", "AI / ML", "SEO", "DevOps"];

function Track({ items, small, reverse }: { items: string[]; small?: boolean; reverse?: boolean }) {
  const content = items.map((t, i) => (
    <span key={i} className="inline-flex items-center">
      <span
        className={`whitespace-nowrap font-mono ${
          small
            ? "text-[clamp(13px,1.3vw,17px)] tracking-[0.2em] uppercase text-white/35"
            : "font-light text-[clamp(34px,5.2vw,76px)] tracking-[-0.045em] text-white"
        }`}
      >
        {t}
      </span>
      <i
        className={`not-italic rounded-full bg-white ${
          small ? "w-1 h-1 mx-[clamp(18px,2.4vw,36px)] opacity-40" : "w-[clamp(8px,0.8vw,12px)] h-[clamp(8px,0.8vw,12px)] mx-[clamp(22px,3vw,48px)]"
        }`}
      />
    </span>
  ));

  return (
    <div className="flex w-max animate-marquee" style={reverse ? { animationDirection: "reverse", animationDuration: "45s" } : undefined}>
      <div className="flex items-center">{content}</div>
      <div className="flex items-center" aria-hidden="true">{content}</div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      className="relative py-[clamp(36px,5vw,64px)] overflow-hidden border-y border-white/[0.08] bg-black/75 backdrop-blur-[2px]"
      aria-label="Capabilities"
    >
      <Track items={row1} />
      <div className="mt-[clamp(18px,2.4vw,30px)]">
        <Track items={row2} small reverse />
      </div>
    </section>
  );
}
