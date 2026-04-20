import { motion } from "framer-motion";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full text-white" viewBox="0 0 696 316" fill="none">
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.05 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.5, 0.2], pathOffset: [0, 1, 0] }}
            transition={{ duration: 20 + Math.random() * 10, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </svg>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0"><FloatingPaths position={1} /><FloatingPaths position={-1} /></div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} className="max-w-4xl mx-auto">
          <span className="inline-block mono text-xs uppercase tracking-[0.3em] text-[rgba(245,245,240,0.4)] border border-[rgba(245,245,240,0.1)] rounded-full px-4 py-1.5 mb-8">Quiet Luxury Creative Studio</span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6 tracking-tighter text-[#f5f5f0]" style={{ fontFamily: "Playfair Display, serif" }}>
            Made to Measure
          </h1>
          <p className="text-lg md:text-xl text-[rgba(245,245,240,0.6)] max-w-2xl mx-auto leading-relaxed">
            Digital work for brands that value silence over noise. Identity, platforms, motion. Built with restraint. Made to last.
          </p>
          <p className="mt-8 mono text-sm text-[rgba(245,245,240,0.4)]">10+ Years of Quiet Craft</p>
        </motion.div>
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[rgba(245,245,240,0.3)] mono text-xs uppercase tracking-widest"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll ↓
        </motion.div>
      </div>
    </section>
  );
}
