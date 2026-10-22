"use client";

import { useState, FormEvent } from "react";
import SectionHead from "./SectionHead";
import { openEmail } from "@/lib/mailto";

function Field({ label, name, type = "text", required, autoComplete, textarea }: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string; textarea?: boolean;
}) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <label className="relative block">
      <Tag
        name={name}
        type={textarea ? undefined : type}
        autoComplete={autoComplete}
        required={required}
        placeholder=" "
        rows={textarea ? 4 : undefined}
        className={`field-input font-body ${textarea ? "resize-y min-h-[140px]" : ""}`}
      />
      <span className="field-label font-body">
        {label}
        {required && <i className="not-italic text-red-400 ml-0.5">*</i>}
      </span>
    </label>
  );
}

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [msg, setMsg] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    if (!String(data.get("first_name") ?? "").trim() || !String(data.get("email") ?? "").trim()) {
      setStatus("error");
      setMsg("Please provide your first name and email.");
      return;
    }

    openEmail(data, "Website enquiry");
    setStatus("success");
    setMsg("Your email app should open with your message. Just press send.");
  }

  return (
    <section id="contact" data-sea className="relative section-pad section-veil overflow-clip">
      <div className="container-site">
        <SectionHead
          index="V"
          label="Contact"
          title="Let's talk."
          intro="Tell us about your project. We reply within one business day."
        />

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-[clamp(32px,5vw,72px)] items-start">
          <aside data-slide-left>
            <ul className="border-t border-white/10">
              {[
                { k: "Studio", v: "304 Mayfair Point, 34 South Molton Street, London, W1K 5RG" },
                { k: "Email", v: "Contact@iTechEvolution.co.uk", href: "mailto:Contact@iTechEvolution.co.uk" },
                { k: "Call / WhatsApp", v: "+44 75 5379 9583", href: "tel:+447553799583" },
              ].map((row) => (
                <li key={row.k} className="grid sm:grid-cols-[150px_1fr] gap-2 py-6 border-b border-white/10">
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/40 pt-1">{row.k}</span>
                  {row.href ? (
                    <a href={row.href} className="font-display text-[17px] text-white hover:text-white/60 transition-colors break-words">
                      {row.v}
                    </a>
                  ) : (
                    <span className="font-display text-[17px] text-white leading-snug">{row.v}</span>
                  )}
                </li>
              ))}
            </ul>
            <a
              href="https://wa.me/447553799583"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex items-center gap-3 mt-9 h-[52px] px-7 rounded-full font-display font-bold text-[12px] tracking-[0.16em] uppercase"
            >
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.78a9.69 9.69 0 0 1-4.95-1.35l-.35-.21-3.68.96.98-3.58-.23-.37A9.71 9.71 0 0 1 18.8 4.96a9.71 9.71 0 0 1-6.75 16.82M20.52 3.48A11.77 11.77 0 0 0 12.05 0C5.46 0 .11 5.34.11 11.91a11.85 11.85 0 0 0 1.59 5.96L0 24l6.3-1.65a11.86 11.86 0 0 0 5.74 1.47c6.58 0 11.94-5.34 11.96-11.91a11.84 11.84 0 0 0-3.48-8.43" /></svg>
              <span>WhatsApp us</span>
            </a>
          </aside>

          <div data-slide-right className="card p-[clamp(26px,3.6vw,44px)] bg-[#0B0B0E]/90">
            <form onSubmit={onSubmit} noValidate className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" name="first_name" autoComplete="given-name" required />
                <Field label="Last name" name="last_name" autoComplete="family-name" />
              </div>
              <Field label="Email" name="email" type="email" autoComplete="email" required />
              <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
              <Field label="Your message" name="message" textarea />
              <input type="checkbox" name="botcheck" className="absolute -left-[9999px] w-px h-px opacity-0" tabIndex={-1} aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-5 mt-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-glow inline-flex items-center gap-3 h-[56px] px-9 rounded-full font-display font-bold text-[13px] tracking-[0.16em] uppercase cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  <span>Send message</span>
                  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5" /></svg>
                </button>
                {msg && (
                  <p className={`text-[14px] ${status === "success" ? "text-emerald-400" : status === "error" ? "text-red-400" : "text-white/60"}`}>
                    {msg}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
