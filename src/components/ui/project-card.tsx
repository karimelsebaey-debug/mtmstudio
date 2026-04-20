import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export interface ProjectCardProps {
  className?: string;
  category: string;
  title: string;
  style?: React.CSSProperties;
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, category, title, style }, ref) => (
    <motion.div
      ref={ref}
      className={cn("group cursor-pointer", className)}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative aspect-video bg-[#141414] rounded-xl overflow-hidden border border-[rgba(245,245,240,0.06)] group-hover:border-[rgba(245,245,240,0.12)] transition-all duration-300 group-hover:-translate-y-1">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]" />
      </div>
      <p className="mt-4 text-xs uppercase tracking-wider text-[rgba(245,245,240,0.4)]">{category}</p>
      <h3 className="mt-1 text-[#f5f5f0] font-semibold text-lg">{title}</h3>
    </motion.div>
  )
);
ProjectCard.displayName = "ProjectCard";
