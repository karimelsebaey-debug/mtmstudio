import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactCard() {
  const [toast, setToast] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <span className="mono text-xs uppercase tracking-widest text-[rgba(245,245,240,0.4)]">Contact</span>
            <h2
              className="text-4xl md:text-5xl text-[#f5f5f0] mt-2 tracking-tight"
              style={{ fontFamily: "Playfair Display, serif" }}
            >
              Begin quietly
            </h2>
            <p className="mt-4 text-lg text-[rgba(245,245,240,0.5)] max-w-md">
              Tell us what you&apos;re building, your timeline, your range. We reply within 48 hours.
            </p>
            <div className="mt-10 space-y-3 text-sm text-[rgba(245,245,240,0.6)]">
              <p>Based everywhere. Working everywhere.</p>
              <p>Two to three weeks. Scope that breathes.</p>
              <a href="mailto:MTMteam@proton.me" className="block text-[#f5f5f0] hover:underline mt-4">
                MTMteam@proton.me
              </a>
            </div>
          </div>
          <div className="bg-[#0f0f0f] border border-[rgba(245,245,240,0.06)] rounded-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { label: "Name", type: "text" },
                { label: "Email", type: "email" },
                { label: "Message", type: "textarea" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs uppercase tracking-wider text-[rgba(245,245,240,0.4)] mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-transparent border-0 border-b border-[rgba(245,245,240,0.1)] text-[#f5f5f0] placeholder:text-[rgba(245,245,240,0.2)] py-3 focus:outline-none focus:border-[#f5f5f0] transition-colors resize-none"
                    />
                  ) : (
                    <input
                      required
                      type={field.type}
                      className="w-full bg-transparent border-0 border-b border-[rgba(245,245,240,0.1)] text-[#f5f5f0] placeholder:text-[rgba(245,245,240,0.2)] py-3 focus:outline-none focus:border-[#f5f5f0] transition-colors"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full md:w-auto bg-[#f5f5f0] text-[#0a0a0a] uppercase tracking-wider text-xs font-semibold py-4 px-10 hover:bg-white transition-colors cursor-pointer"
              >
                Send inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0f0f0f] border border-[rgba(245,245,240,0.1)] px-6 py-3 rounded-lg text-sm text-[#f5f5f0] mono"
          >
            Message received. We&apos;ll be in touch.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
