import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  fade?: boolean;
}

export function Marquee({
  children,
  className,
  duration = 40,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  ...props
}: MarqueeProps) {
  const items = React.Children.toArray(children);
  return (
    <>
      <style>{`
        @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marquee-scroll-reverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        .marquee-scroller { display: flex; animation: ${direction === "left" ? "marquee-scroll" : "marquee-scroll-reverse"} ${duration}s linear infinite; }
        .marquee-scroller.paused { animation-play-state: paused; }
      `}</style>
      <div
        className={cn("flex w-full overflow-hidden", className)}
        style={
          fade
            ? {
                maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
              }
            : {}
        }
        {...props}
      >
        <div className={cn("marquee-scroller flex shrink-0", pauseOnHover && "hover:paused")}>
          {items.map((c, i) => <div key={`a-${i}`} className="flex shrink-0">{c}</div>)}
          {items.map((c, i) => <div key={`b-${i}`} className="flex shrink-0">{c}</div>)}
        </div>
      </div>
    </>
  );
}
