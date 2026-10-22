import SectionHead from "./SectionHead";

const steps = [
  { title: "Discovery call", desc: "We understand your business needs, current architecture, challenges, and performance targets." },
  { title: "Consultation & strategy", desc: "Deep technical discussion addressing deployment mechanisms and custom solution paths." },
  { title: "Proof of value", desc: "Detailed verification mapping how our integrations address security protocols and operational gains." },
  { title: "Proposal & agreement", desc: "A granular roadmap itemising resources, milestones, deliverables, SLAs, and timelines." },
  { title: "Build & communicate", desc: "Continuous progress updates, environment testing, and structured integration sprints." },
  { title: "Delivery & support", desc: "Comprehensive audits, handoff validation, client sign-off, and long-term priority support." },
];

export default function Process() {
  return (
    <section id="process" data-sea className="relative section-pad section-veil overflow-clip">
      <div className="container-site">
        <SectionHead
          index="III"
          label="Process"
          title="How it works."
          intro="Six clear stages from first conversation to long-term support, so you always know what happens next."
        />

        <div className="grid gap-5">
          {steps.map((s, i) => (
            <article
              key={s.title}
              data-stack-card
              className="stack-card-sticky relative grid gap-6 md:grid-cols-[minmax(140px,220px)_1fr_auto] md:items-center p-[clamp(28px,4vw,52px)] rounded-[28px] bg-[#0B0B0E] border border-white/[0.09] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className="font-mono font-light text-[clamp(44px,6vw,92px)] leading-none tracking-[-0.06em] text-white/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display font-semibold text-[clamp(22px,2.3vw,32px)] tracking-[-0.02em] text-white mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="max-w-[56ch] text-[clamp(15px,1.1vw,16px)] leading-relaxed text-white/55">{s.desc}</p>
              </div>
              <span className="hidden md:block font-mono text-[11px] tracking-[0.18em] uppercase text-white/35">
                Step {i + 1} / {steps.length}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
