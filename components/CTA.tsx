export default function CTA() {
  return (
    <section data-sea className="relative isolate overflow-hidden min-h-[80svh] flex items-center section-pad">
      <div className="container-site relative z-10 text-center grid justify-items-center">
        <p className="label-pill mb-8 text-white">
          <span className="eyebrow-dot" />
          Next step
        </p>
        <h2 data-scale className="max-w-[16ch] font-mono font-light text-[clamp(40px,6.6vw,104px)] leading-[1.04] tracking-[-0.05em] text-white">
          Ready to evolve your{" "}
          <em className="not-italic text-white/45">business?</em>
        </h2>
        <p data-reveal className="max-w-[56ch] mt-9 mb-12 text-[clamp(16px,1.3vw,19px)] leading-relaxed text-white/65">
          Tell us where you want to go. We&apos;ll map the clearest route there, from the first call to launch day
          and beyond.
        </p>
        <a
          href="#contact"
          data-scroll-to
          data-reveal
          className="btn-glow inline-flex items-center gap-3.5 h-[64px] px-11 rounded-full font-display font-bold text-[14px] tracking-[0.16em] uppercase cursor-pointer"
        >
          <span>Get a free quote</span>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>
        </a>
      </div>
    </section>
  );
}
