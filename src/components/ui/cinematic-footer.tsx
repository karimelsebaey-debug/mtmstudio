import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Marquee } from "./marquee";

const NAV_LINKS = ["Work", "Services", "Process", "About", "Contact"];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "https://behance.net",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.75-.63.148-1.29.222-1.96.222H0V4.504h6.938zm-.412 5.56c.583 0 1.06-.14 1.416-.4.357-.26.535-.67.535-1.23 0-.31-.056-.57-.17-.78-.11-.21-.268-.37-.47-.49-.2-.13-.43-.21-.69-.26-.26-.04-.535-.063-.82-.063H3.515v3.22h3.01zm.16 5.83c.317 0 .617-.03.9-.09s.53-.17.742-.33c.21-.16.38-.37.5-.63.12-.26.185-.59.185-.99 0-.79-.22-1.36-.67-1.71-.45-.35-1.04-.525-1.78-.525H3.516v4.27h3.17zm8.586 1.726c.44.43.998.644 1.68.644.523 0 .975-.13 1.354-.39.378-.26.61-.54.696-.83h2.55c-.408 1.27-1.034 2.18-1.88 2.73-.845.55-1.862.82-3.056.82-.828 0-1.575-.13-2.24-.4-.665-.27-1.228-.65-1.69-1.15-.46-.5-.81-1.1-1.055-1.79-.245-.7-.367-1.46-.367-2.29 0-.8.126-1.54.38-2.23.252-.69.61-1.29 1.076-1.8.466-.5 1.03-.9 1.69-1.18.66-.28 1.397-.42 2.21-.42.9 0 1.686.17 2.356.52.67.35 1.22.82 1.65 1.41.432.59.745 1.27.94 2.03.196.76.275 1.56.235 2.38h-7.6c.04.77.257 1.37.697 1.8zm2.944-5.07c-.35-.38-.878-.57-1.583-.57-.46 0-.845.08-1.15.24-.307.16-.554.35-.74.58-.188.23-.32.47-.4.72-.08.25-.127.48-.14.69h4.72c-.1-.77-.358-1.28-.706-1.66zm-4.89-5.22h5.52v1.35h-5.52V7.33z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export function CinematicFooter() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-[rgba(245,245,240,0.06)] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,245,240,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,240,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        }}
      />
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-white opacity-[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* Marquee strip */}
      <div className="py-8 border-b border-[rgba(245,245,240,0.06)]">
        <Marquee duration={40} fade>
          <span className="mx-8 text-sm uppercase tracking-[0.3em] text-[rgba(245,245,240,0.2)]">
            Restraint · Precision · Craft · Clarity · Legacy
          </span>
        </Marquee>
      </div>

      {/* Footer content */}
      <motion.div
        className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Giant watermark */}
        <h2
          className="text-[clamp(4rem,15vw,10rem)] font-bold text-[rgba(245,245,240,0.03)] select-none pointer-events-none text-center mb-12 tracking-tighter leading-none"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Made to Measure
        </h2>

        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          {/* Left — brand + email */}
          <div className="flex flex-col gap-2">
            <span
              className="text-[#f5f5f0] font-semibold tracking-tight"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "1.1rem" }}
            >
              Made to Measure
            </span>
            <a
              href="mailto:MTMteam@proton.me"
              className="mono text-xs text-[rgba(245,245,240,0.4)] hover:text-[#f5f5f0] transition-colors"
            >
              MTMteam@proton.me
            </a>
          </div>

          {/* Centre — nav links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-xs uppercase tracking-widest text-[rgba(245,245,240,0.4)] hover:text-[#f5f5f0] transition-colors"
              >
                {l}
              </a>
            ))}
          </nav>

          {/* Right — social + scroll-to-top */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-[rgba(245,245,240,0.1)] flex items-center justify-center text-[rgba(245,245,240,0.4)] hover:border-[rgba(245,245,240,0.3)] hover:text-[#f5f5f0] transition-all cursor-pointer"
              >
                {icon}
              </a>
            ))}

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-9 h-9 rounded-full border border-[rgba(245,245,240,0.1)] flex items-center justify-center text-[rgba(245,245,240,0.4)] hover:border-[rgba(245,245,240,0.3)] hover:text-[#f5f5f0] transition-all cursor-pointer ml-2"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-6 border-t border-[rgba(245,245,240,0.06)]">
          <p className="mono text-xs text-[rgba(245,245,240,0.25)] uppercase tracking-widest text-center">
            © 2026 Made to Measure — All rights reserved
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
