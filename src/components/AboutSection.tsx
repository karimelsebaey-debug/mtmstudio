import { motion, useReducedMotion } from "framer-motion";

const tags = ["Art direction", "Motion", "Product UI", "Analytics"];

export default function AboutSection() {
  const shouldReduce = useReducedMotion();
  return (
    <section id="about" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={shouldReduce ? {} : { opacity: 0, y: 40 }}
          whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduce ? {} : { duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mono text-xs uppercase tracking-widest text-[rgba(245,245,240,0.4)]">About</span>
          <h2
            className="mt-4 tracking-tight text-[#f5f5f0]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(1.8rem, 4.5vw, 3.2rem)",
              lineHeight: 1.15,
            }}
          >
            A studio for brands that prefer silence over spectacle
          </h2>

          <motion.p
            className="mt-8 text-lg text-[rgba(245,245,240,0.55)] leading-relaxed"
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduce ? {} : { duration: 0.8, delay: 0.2 }}
          >
            MTMT is small, senior-led, obsessed with proportion, type, and timing. Every project is the start of a longer relationship. With your reputation. With ours.
          </motion.p>

          <motion.p
            className="mt-4 text-lg text-[rgba(245,245,240,0.4)] leading-relaxed"
            initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
            whileInView={shouldReduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={shouldReduce ? {} : { duration: 0.8, delay: 0.3 }}
          >
            From identity systems to motion and data. We work close with founders and creative leads who care about clarity as much as craft.
          </motion.p>

          {/* Tags */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
            initial={shouldReduce ? {} : { opacity: 0 }}
            whileInView={shouldReduce ? {} : { opacity: 1 }}
            viewport={{ once: true }}
            transition={shouldReduce ? {} : { duration: 0.8, delay: 0.4 }}
          >
            {tags.map((tag, i) => (
              <span key={tag} className="flex items-center gap-3">
                <span className="mono text-xs uppercase tracking-widest text-[rgba(245,245,240,0.35)] border border-[rgba(245,245,240,0.08)] px-3 py-1.5 rounded-full">
                  {tag}
                </span>
                {i < tags.length - 1 && (
                  <span className="text-[rgba(245,245,240,0.15)] text-xs">/</span>
                )}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
