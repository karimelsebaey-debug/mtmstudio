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

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, category, title, href, style }, ref) => {
    const isVideo = href?.includes("vimeo");

    const thumbnail = (
      <div className="relative aspect-video bg-[#141414] rounded-xl overflow-hidden border border-[rgba(245,245,240,0.06)] group-hover:border-[rgba(245,245,240,0.12)] transition-all duration-300 group-hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
        {isVideo && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[rgba(245,245,240,0.12)] flex items-center justify-center backdrop-blur-sm group-hover:bg-[rgba(245,245,240,0.2)] transition-all duration-300">
              <Play className="w-4 h-4 text-[#f5f5f0] fill-[#f5f5f0] ml-0.5" />
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
