import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import { Marquee } from "@/components/ui/marquee";

const projects = [
  { category: "Identity",    title: "Brand Identity",           href: "https://cool-sky-506.linkyhost.com" },
  { category: "Design",      title: "Logo Design",              href: "https://falling-dawn-316.linkyhost.com" },
  { category: "Data",        title: "Dashboard",                href: "https://shy-bird-898.linkyhost.com" },
  { category: "Systems",     title: "Identity Architecture",    href: "https://falling-dawn-316.linkyhost.com" },
  { category: "AI Marketing",title: "AI Avatar Ad",             href: "https://vimeo.com/1185121765?fl=tl&fe=ec" },
  { category: "Platforms",   title: "Digital Platforms & CRM",  href: "https://late-hill-554.linkyhost.com" },
  { category: "Motion",      title: "Logo Animations",          href: "https://vimeo.com/1185121834?fl=tl&fe=ec" },
  { category: "Motion",      title: "video editing",            href: "https://vimeo.com/1185129547?fl=tl&fe=ec" },
];

export default function WorkSection() {
  return (
    <section id="work" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="mono text-xs uppercase tracking-widest text-[rgba(245,245,240,0.4)]">Selected Work</span>
          <h2
            className="mt-2 tracking-tight text-[#f5f5f0]"
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
            }}
          >
            Portfolio
          </h2>
          <p className="mt-4 text-lg text-[rgba(245,245,240,0.5)] max-w-xl">
            A tight edit. Identity, motion, data, presentation.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              category={project.category}
              title={project.title}
              href={project.href}
              style={{ transitionDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-20 py-6 border-y border-[rgba(245,245,240,0.06)]">
          <Marquee duration={25} fade>
            <span className="mx-6 text-xs uppercase tracking-[0.4em] text-[rgba(245,245,240,0.25)]">
              Restraint · Precision · Craft · Clarity · Legacy &nbsp;
            </span>
          </Marquee>
        </div>
      </div>
    </section>
  );
}
