import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/ui/3d-box-loader-animation";

export function RipplePulseLoader({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 2500ms — lets users see the full box assembly sequence
    // (boxes appear 0–1.8s, rest on platform at ~1.8–2.4s, start falling at 2.4s)
    const t = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 2500);
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
          {/*
            Flex column keeps MTM text strictly ABOVE the 3D animation container.
            The text occupies ~100px; with gap-6 (24px) the boxes start ~124px below.
            No geometric overlap is possible — the 3D transform is scoped to the
            200×320px .loader div which is below the text in document flow.
          */}
          <div className="flex flex-col items-center justify-center gap-6">
            <span
              className="text-[#f5f5f0] font-bold tracking-widest"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(3.5rem, 8vw, 7rem)",
              }}
            >
              MTM
            </span>
            <Loader />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
