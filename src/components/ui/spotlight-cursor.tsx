import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function SpotlightCursor() {
  const [hovered, setHovered] = useState(false);
  const x = useSpring(0, { stiffness: 150, damping: 20 });
  const y = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const handleEnter = () => setHovered(true);
    const handleLeave = () => setHovered(false);
    window.addEventListener("mousemove", handleMove);
    document.body.addEventListener("mouseenter", handleEnter);
    document.body.addEventListener("mouseleave", handleLeave);
    setHovered(true);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.removeEventListener("mouseenter", handleEnter);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, [x, y]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      style={{ x, y, opacity: hovered ? 1 : 0 }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,transparent_70%)]" />
    </motion.div>
  );
}
