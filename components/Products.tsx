import SectionHead from "./SectionHead";

const products = [
  {
    title: "Security & surveillance",
    desc: "Advanced CCTV arrays, smart security walls, analytics integration, and unified monitoring.",
    wide: true,
  },
  { title: "Networks", desc: "Enterprise switching, routing, firewall policies, and secure multi-VLAN operations." },
  { title: "PABX / IP phones", desc: "VoIP solutions, SIP trunk implementations, and scalable telecom endpoints." },
  { title: "Time & attendance", desc: "Biometric tracking, employee scheduling, and automated attendance logs." },
  { title: "Smart lock systems", desc: "Cryptographic locks, commercial access control, and secure environment permissions." },
];

export default function Products() {
  return (
    <section id="products" data-sea className="relative section-pad section-veil overflow-clip">
      <div className="container-site relative z-10">
        <SectionHead
          index="IV"
          label="Products"
          title={<>Products &amp; systems.</>}
          intro="Hardware and infrastructure we supply, install and support for offices of every size."
        />

        <div data-stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.title}
              className={`card glow-card group min-h-[280px] p-[clamp(26px,3vw,38px)] flex flex-col ${
                p.wide ? "lg:col-span-2 bg-[radial-gradient(120%_120%_at_100%_0%,rgba(255,255,255,0.09),transparent_55%)]" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[12px] tracking-[0.12em] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="w-10 h-10 rounded-full border border-white/15 grid place-items-center text-white/70 group-hover:bg-white group-hover:text-ink group-hover:border-white transition-colors duration-500">
                  <svg className="w-4 h-4 -rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
                </span>
              </div>
              <h3 className={`mt-auto pt-12 font-display font-semibold tracking-[-0.02em] text-white leading-tight ${p.wide ? "text-[clamp(24px,2.6vw,36px)] max-w-[16ch]" : "text-[clamp(20px,1.7vw,24px)]"}`}>
                {p.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/55 max-w-[38ch]">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
