import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function RipplePulseLoader({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1500);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative flex items-center justify-center">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-[rgba(245,245,240,0.15)]"
                initial={{ width: 60, height: 60, opacity: 0.6 }}
                animate={{ width: 200 + i * 60, height: 200 + i * 60, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
              />
            ))}
            <span
              className="relative text-[#f5f5f0] font-bold tracking-widest"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
              }}
            >
              MTM
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
