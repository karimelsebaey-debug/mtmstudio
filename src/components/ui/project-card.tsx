import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

export interface ProjectCardProps {
  className?: string;
  category: string;
  title: string;
  href?: string;
  style?: React.CSSProperties;
}

function getVimeoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
}

function getThumbnailUrl(href: string): string {
  if (href.includes("vimeo")) {
    // vumbnail.com — free Vimeo thumbnail proxy, returns native 16:9 frame
    const id = getVimeoId(href);
    return id ? `https://vumbnail.com/${id}.jpg` : "";
  }
  // WordPress mshots: free, no API key. We deliberately request wider-than-16:9
  // (1600×600 = 2.67:1) so object-fit:cover has ~33% to crop horizontally.
  // Combined with objectPosition:"right center" below, the crop lands entirely
  // on the LEFT side — which is exactly where linkyhost's white sidebar lives.
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(href)}?w=1600&h=600`;
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, category, title, href, style }, ref) => {
    const isVideo = !!href?.includes("vimeo");
    const thumbUrl = href ? getThumbnailUrl(href) : null;

    const thumbnail = (
      /*
       * card-thumb:
       *   container → position:relative, aspect-ratio:16/9, overflow:hidden
       *   img       → position:absolute, inset:0, width/height:100%, object-fit:cover
       *
       * Using absolute on the img is necessary so height:100% resolves correctly
       * when the parent's height comes from aspect-ratio (not explicit px).
       */
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-[#141414]",
          "border border-[rgba(245,245,240,0.06)]",
          "group-hover:border-[rgba(245,245,240,0.12)] group-hover:-translate-y-1",
          "transition-all duration-300"
        )}
        style={{ aspectRatio: "16/9" }}
      >
        {thumbUrl && (
          <img
            src={thumbUrl}
            alt={title}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              // Vimeo: native 16:9 → center is perfect.
              // Website: mshots requested at 1600×600 (2.67:1), container is 16:9 (1.78:1).
              // object-fit:cover crops ~25% horizontally total.
              // "center" splits that crop equally — ~12.5% trimmed from each side —
              // hiding linkyhost's white left AND right padding, showing only the
              // central project content.
              objectPosition: "center",
              display: "block",
            }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        )}

        {/* Dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent pointer-events-none" />

        {/* Play button for Vimeo cards */}
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-[rgba(10,10,10,0.55)] backdrop-blur-sm border border-[rgba(245,245,240,0.25)] flex items-center justify-center group-hover:bg-[rgba(10,10,10,0.75)] group-hover:border-[rgba(245,245,240,0.5)] transition-all duration-300">
              <Play className="w-5 h-5 text-[#f5f5f0] fill-[#f5f5f0] ml-0.5" />
            </div>
          </div>
        )}
      </div>
    );

    return (
      <motion.div
        ref={ref}
        className={cn("group cursor-pointer", className)}
        style={style}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="block">
            {thumbnail}
          </a>
        ) : (
          thumbnail
        )}
        <p className="mt-4 text-xs uppercase tracking-wider text-[rgba(245,245,240,0.4)]">{category}</p>
        <h3 className="mt-1 text-[#f5f5f0] font-semibold text-lg">{title}</h3>
      </motion.div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";
