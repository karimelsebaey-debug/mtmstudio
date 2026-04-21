import { motion } from "framer-motion";
import { Gallery4, type Gallery4Item } from "@/components/ui/gallery4";
import { Marquee } from "@/components/ui/marquee";

// ─── Thumbnail helpers ────────────────────────────────────────────────────────
function vimeoThumb(id: string) {
  return `https://vumbnail.com/${id}.jpg`;
}
function siteThumb(url: string, w = 1600, h = 600) {
  // Default 1600×600 (2.67:1) — wider than 16:9 so object-fit:cover
  // crops ~12.5% from each side, hiding linkyhost's L/R white chrome.
  // For pages with a white TOP strip, pass h=1200 to get a 1.33:1 image;
  // that creates ~25% vertical overflow in the 16:9 card container so
  // imagePosition:"center bottom" can hide the top chrome entirely.
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${w}&h=${h}`;
}
// ─────────────────────────────────────────────────────────────────────────────

const projects: Gallery4Item[] = [
  {
    id: "brand-identity",
    title: "Brand Identity",
    description:
      "Cohesive visual identity systems built from the ground up — strategy, naming, mark, palette, typography, every element considered.",
    href: "https://cool-sky-506.linkyhost.com",
    image: siteThumb("https://cool-sky-506.linkyhost.com"),
  },
  {
    id: "logo-design",
    title: "Logo Design",
    description:
      "Marks that carry weight. Crafted for longevity, not trends — clean geometry, deliberate proportion.",
    href: "https://falling-bush-679.linkyhost.com",
    image: siteThumb("https://falling-bush-679.linkyhost.com"),
  },
  {
    id: "dashboard",
    title: "Dashboard",
    description:
      "Data made legible. Analytics interfaces that surface signal without noise.",
    href: "https://shy-bird-898.linkyhost.com",
    // h=1200 → 1.33:1 image in a 16:9 card = ~25% vertical overflow.
    // "center bottom" anchors to the bottom, cropping off the white top chrome.
    image: siteThumb("https://shy-bird-898.linkyhost.com", 1600, 1200),
    imagePosition: "center bottom",
  },
  {
    id: "identity-architecture",
    title: "Identity Architecture",
    description:
      "Systems thinking applied to brand. Scalable identity frameworks built to grow with the business.",
    href: "https://falling-dawn-316.linkyhost.com",
    image: siteThumb("https://falling-dawn-316.linkyhost.com"),
  },
  {
    id: "ai-avatar-ad",
    title: "AI Avatar Ad",
    description:
      "Next-generation marketing. AI-generated talent, human-crafted narrative — indistinguishable from the real thing.",
    href: "https://vimeo.com/1185121765?fl=tl&fe=ec",
    image: vimeoThumb("1185121765"),
  },
  {
    id: "digital-platforms-crm",
    title: "Digital Platforms & CRM",
    description:
      "End-to-end digital infrastructure. Platforms designed to convert, retain, and scale.",
    href: "https://late-hill-554.linkyhost.com",
    image: siteThumb("https://late-hill-554.linkyhost.com"),
  },
  {
    id: "logo-animations",
    title: "Logo Animations",
    description:
      "Motion that breathes life into marks. Frame-perfect animation for digital-first brands.",
    href: "https://vimeo.com/1185121834?fl=tl&fe=ec",
    image: vimeoThumb("1185121834"),
  },
  {
    id: "video-editing",
    title: "Video Editing",
    description:
      "Narrative precision in post. Cuts that hold attention, pacing that builds desire.",
    href: "https://vimeo.com/1185129547?fl=tl&fe=ec",
    image: vimeoThumb("1185129547"),
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="bg-[#0a0a0a]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Gallery4
          title="Portfolio"
          description="A tight edit. Identity, motion, data, presentation."
          items={projects}
        />
      </motion.div>

      {/* Marquee strip */}
      <div className="py-6 border-y border-[rgba(245,245,240,0.06)]">
        <Marquee duration={25} fade>
          <span className="mx-6 text-xs uppercase tracking-[0.4em] text-[rgba(245,245,240,0.25)]">
            Restraint · Precision · Craft · Clarity · Legacy &nbsp;
          </span>
        </Marquee>
      </div>
    </section>
  );
}
