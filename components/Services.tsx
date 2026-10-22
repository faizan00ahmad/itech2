import Image from "next/image";
import SectionHead from "./SectionHead";

const svgProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-7 h-7",
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

const services = [
  {
    title: "Web design & development",
    desc: "High-performing web ecosystems built with modern frameworks. Responsive, fast, and SEO-optimised websites that convert visitors into customers.",
    tags: ["React", "Next.js", "WordPress", "UI/UX"],
    img: unsplash("1498050108023-c5249f4df085"),
    alt: "Laptop showing code on a developer's desk",
    icon: (
      <svg {...svgProps}>
        <rect x="4" y="6" width="40" height="28" rx="3" /><path d="M16 40h16M24 34v6" /><path d="M14 18l4 4-4 4M22 26h8" />
      </svg>
    ),
  },
  {
    title: "Digital marketing",
    desc: "Data-driven strategies to amplify your brand. SEO, social media, PPC, content marketing, and analytics that deliver measurable ROI.",
    tags: ["SEO", "PPC", "Social Media", "Analytics"],
    img: unsplash("1460925895917-afdab827c52f"),
    alt: "Laptop displaying marketing analytics charts",
    icon: (
      <svg {...svgProps}>
        <path d="M6 40V8M6 40h36" /><path d="M12 32l9-10 7 6 12-14" /><path d="M32 14h8v8" />
      </svg>
    ),
  },
  {
    title: "Software development",
    desc: "Custom software from enterprise platforms to SaaS products. Agile delivery with scalable architecture and clean, maintainable code.",
    tags: ["Python", "Node.js", ".NET", "APIs"],
    img: unsplash("1461749280684-dccba630e2f6"),
    alt: "Monitor showing application source code",
    icon: (
      <svg {...svgProps}>
        <path d="M8 14l16-8 16 8v20l-16 8-16-8z" /><path d="M8 14l16 8 16-8M24 22v20" />
      </svg>
    ),
  },
  {
    title: "Personal assistance",
    desc: "Dedicated virtual assistants and tech support specialists. Calendar management, email handling, research, and admin automation.",
    tags: ["VA", "Admin", "Scheduling", "Support"],
    img: unsplash("1758598306663-4874b2aff114"),
    alt: "Assistant working on a laptop at a desk",
    icon: (
      <svg {...svgProps}>
        <circle cx="24" cy="16" r="8" /><path d="M8 42c0-8.8 7.2-16 16-16s16 7.2 16 16" /><path d="M32 36l4 4 6-8" />
      </svg>
    ),
  },
  {
    title: "Cloud services",
    desc: "Seamless migration to Office 365, AWS, and Azure with security compliance, backup strategies, and ongoing cost optimisation.",
    tags: ["AWS", "Azure", "Office 365", "Security"],
    img: unsplash("1667984390538-3dea7a3fe33d"),
    alt: "3D render of a cloud computing concept",
    icon: (
      <svg {...svgProps}>
        <path d="M14 36h22a8 8 0 0 0 1-15.9A12 12 0 0 0 13.6 18 9 9 0 0 0 14 36z" /><path d="M24 24v10M20 28l4-4 4 4" />
      </svg>
    ),
  },
  {
    title: "IT management",
    desc: "Proactive hardware provisioning, network optimisation, and systems maintenance that keep your business running without interruption.",
    tags: ["Networking", "Hardware", "Maintenance", "Helpdesk"],
    img: unsplash("1558494949-ef010cbdcc31"),
    alt: "Network cables connected to a server rack",
    icon: (
      <svg {...svgProps}>
        <rect x="8" y="6" width="32" height="12" rx="2" /><rect x="8" y="22" width="32" height="12" rx="2" /><path d="M14 12h.01M14 28h.01M24 34v8M16 42h16" />
      </svg>
    ),
  },
  {
    title: "App development",
    desc: "Native and cross-platform mobile applications for iOS and Android, designed for performance and a polished user experience.",
    tags: ["iOS", "Android", "Flutter", "React Native"],
    img: unsplash("1512941937669-90a1b58e7e9c"),
    alt: "Smartphone showing a mobile app home screen",
    icon: (
      <svg {...svgProps}>
        <rect x="14" y="4" width="20" height="40" rx="4" /><path d="M21 9h6M22 38h4" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" data-sea className="relative section-pad section-veil overflow-clip">
      <div className="container-site relative z-10">
        <SectionHead
          index="II"
          label="Services"
          title="The best IT solutions."
          intro="Seven disciplines under one roof, each tailored to the unique needs of your business."
        />

        <div data-stagger className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`card glow-card group flex flex-col overflow-hidden ${
                i === services.length - 1
                  ? "md:col-span-2 md:justify-self-center md:w-[calc(50%-8px)] xl:col-span-1 xl:col-start-2 xl:w-full"
                  : ""
              }`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 50vw, 100vw"
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.07] transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/30 to-transparent" />
                <span className="absolute left-5 top-5 label-pill !h-7 !px-3 text-white/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative flex flex-col flex-1 px-[clamp(24px,2.6vw,32px)] pb-[clamp(26px,2.8vw,34px)]">
                <div className="-mt-8 mb-6 w-14 h-14 rounded-full bg-[#0B0B0E] border border-white/15 flex items-center justify-center text-white group-hover:bg-white group-hover:text-ink group-hover:border-white transition-colors duration-500 [&_svg]:w-6 [&_svg]:h-6">
                  {s.icon}
                </div>
                <h3 className="font-display font-semibold text-[clamp(20px,1.6vw,23px)] tracking-[-0.015em] text-white mb-3 leading-tight">
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-white/55 mb-7">{s.desc}</p>
                <ul className="mt-auto flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li key={t} className="tag-pill">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
