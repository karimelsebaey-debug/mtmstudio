import { motion } from "framer-motion";

const services = [
  {
    number: "001",
    title: "Visual Identity & Art Direction",
    description: "Logos, systems, digital spaces. Editorial calm, tactile detail.",
  },
  {
    number: "002",
    title: "Digital Platforms & CRM",
    description: "Web platforms and CRM. Presence into real relationships.",
  },
  {
    number: "003",
    title: "Strategic Communications",
    description: "Campaigns with weight. Social, search, content that sticks.",
  },
  {
    number: "004",
    title: "Video & Animation",
    description: "Brand films and motion. Rhythm and a luxury lens.",
  },
  {
    number: "005",
    title: "Intelligence & Analytics",
    description: "Dashboards and reporting. Complex data made obvious.",
  },
  {
    number: "006",
    title: "Strategic Advisory",
    description: "Clear guidance for founders who think long-term.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="mono text-xs uppercase tracking-widest text-[rgba(245,245,240,0.4)]">Services</span>
          <h2
            className="mt-2 tracking-tight text-[#f5f5f0]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            Six disciplines, one sensibility
          </h2>
          <p className="mt-4 text-lg text-[rgba(245,245,240,0.5)] max-w-xl">
            Every project is composed. You need a new face, a sharper platform, or a campaign that actually lands. We handle it in-house.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="group relative border-t border-[rgba(245,245,240,0.06)] hover:border-[rgba(245,245,240,0.12)] p-8 md:p-10 transition-all duration-300 cursor-default"
              style={i % 2 === 0 ? { borderRight: "1px solid rgba(245,245,240,0.06)" } : {}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              {/* Large ghost number */}
              <span
                className="absolute top-4 right-6 text-6xl font-bold text-[rgba(245,245,240,0.03)] select-none pointer-events-none"
                style={{ fontFamily: "Playfair Display, serif" }}
              >
                {service.number}
              </span>

              <span className="mono text-xs text-[rgba(245,245,240,0.3)]">( {service.number} )</span>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#f5f5f0] group-hover:text-white transition-colors">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-[rgba(245,245,240,0.5)] leading-relaxed max-w-xs">
                {service.description}
              </p>
            </motion.div>
          ))}
          {/* Bottom border for last row */}
          <div className="border-t border-[rgba(245,245,240,0.06)] col-span-1 md:col-span-2" />
        </div>
      </div>
    </section>
  );
}
