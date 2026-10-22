import type { ReactNode } from "react";

export default function SectionHead({
  index,
  label,
  title,
  intro,
  aside,
}: {
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end mb-[clamp(56px,7vw,96px)]">
      <div className="max-w-[900px]">
        <p className="label-pill mb-7">
          <span className="text-white">{index}</span>
          <span className="text-white/30">&bull;</span>
          <span className="text-white/60">{label}</span>
        </p>
        <h2 data-reveal className="font-mono font-light text-[clamp(36px,5.4vw,80px)] leading-[1.05] tracking-[-0.045em] text-white">
          {title}
        </h2>
        {intro && (
          <p data-reveal className="mt-7 max-w-[56ch] text-[clamp(15px,1.15vw,17px)] leading-relaxed text-white/55">
            {intro}
          </p>
        )}
      </div>
      {aside && (
        <p data-reveal className="max-w-[32ch] font-mono text-[13px] leading-relaxed text-white/45 lg:text-right">
          {aside}
        </p>
      )}
    </header>
  );
}
