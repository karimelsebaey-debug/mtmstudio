import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Marquee } from "./marquee";

gsap.registerPlugin(ScrollTrigger);

export function CinematicFooter() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      ref={ref}
      className="relative bg-[#0a0a0a] border-t border-[rgba(245,245,240,0.06)] overflow-hidden"
    >
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
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative z-10">
        {/* Giant bg text */}
        <h2
          className="text-[clamp(4rem,15vw,10rem)] font-bold text-[rgba(245,245,240,0.03)] select-none pointer-events-none text-center mb-12 tracking-tighter leading-none"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Made to Measure
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="mono text-xs text-[rgba(245,245,240,0.4)] uppercase tracking-widest">
            © 2026 Made to Measure
          </p>
          <div className="flex gap-8">
            {["Services", "Work", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-xs uppercase tracking-widest text-[rgba(245,245,240,0.5)] hover:text-[#f5f5f0] transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
          <button
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full border border-[rgba(245,245,240,0.1)] flex items-center justify-center text-[rgba(245,245,240,0.5)] hover:border-[rgba(245,245,240,0.3)] hover:text-[#f5f5f0] transition-all cursor-pointer"
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
