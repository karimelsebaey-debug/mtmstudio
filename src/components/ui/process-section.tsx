import { motion, useReducedMotion } from "framer-motion";

const steps = [
  { num: "01", title: "Discovery", desc: "Goals, audience, constraints. Locked before we touch a pixel." },
  { num: "02", title: "Direction", desc: "Mood, structure, a north star. Decisions stay easy." },
  { num: "03", title: "Craft", desc: "Design, edit, build. Polish until it feels inevitable." },
  { num: "04", title: "Delivery", desc: "Clean handoff, clear docs. Support that stays." },
];

export function ProcessSection() {
  const shouldReduce = useReducedMotion();
  return (
    <section id="process" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <motion.div
            className="md:sticky md:top-32 md:self-start"
            initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduce ? {} : { duration: 0.8 }}
          >
            <span className="mono text-xs uppercase tracking-widest text-[rgba(245,245,240,0.4)]">Process</span>
            <h2
              className="text-4xl md:text-5xl text-[#f5f5f0] mt-2 tracking-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              How we work
            </h2>
            <p className="mt-4 text-lg text-[rgba(245,245,240,0.5)]">
              No jargon. No surprises. Clear phases, room to refine.
            </p>
          </motion.div>
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-0">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                className="relative border-t border-[rgba(245,245,240,0.08)] pt-8 pb-12 px-4 group hover:border-[rgba(245,245,240,0.2)] transition-colors duration-300"
                initial={shouldReduce ? {} : { opacity: 0, y: 30 }}
                whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={shouldReduce ? {} : { duration: 0.7, delay: i * 0.15 }}
              >
                <span
                  className="absolute top-4 right-4 text-7xl md:text-8xl font-bold text-[rgba(245,245,240,0.04)] select-none"
                  style={{ fontFamily: "Playfair Display, serif" }}
                >
                  {s.num}
                </span>
                <span className="mono text-sm text-[rgba(245,245,240,0.3)]">{s.num}</span>
                <h3 className="mt-4 uppercase tracking-wide text-sm font-semibold text-[#f5f5f0]">{s.title}</h3>
                <p className="mt-2 text-sm text-[rgba(245,245,240,0.5)] max-w-xs leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
