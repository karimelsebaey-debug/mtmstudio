import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Web3Forms access keys ───────────────────────────────────────────────────
// Each key is registered to a different inbox — both receive every submission.
const WEB3FORMS_KEYS = [
  "8c2bedd8-0327-4438-8a7a-9ce4a6ee902c", // MTMteam@proton.me
  "5d0f7a46-df86-47dc-ac5b-a73eb830058e", // kareemelsebaey@gmail.com
];
// ─────────────────────────────────────────────────────────────────────────────

type ToastState = "idle" | "success" | "error";

export function ContactCard() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [message, setMessage]   = useState("");
  const [botField, setBotField] = useState(""); // honeypot — bots fill this; real users never see it
  const [loading, setLoading]   = useState(false);
  const [toast, setToast]       = useState<ToastState>("idle");

  const showToast = (state: ToastState) => {
    setToast(state);
    setTimeout(() => setToast("idle"), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    // Honeypot: if the hidden field was filled, it's a bot — silently discard
    if (botField) { showToast("success"); return; }
    setLoading(true);

    try {
      const payload = (key: string) =>
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: key,
            subject: "New inquiry from MTM Studio",
            from_name: "MTM Studio",
            botcheck: botField, // Web3Forms server-side honeypot check
            name,
            email,
            message,
          }),
        }).then((r) => r.json());

      // Fire both in parallel — one per inbox
      const results = await Promise.all(WEB3FORMS_KEYS.map(payload));
      const anySuccess = results.some((d) => d.success);

      if (anySuccess) {
        setName("");
        setEmail("");
        setMessage("");
        showToast("success");
      } else {
        showToast("error");
      }
    } catch {
      showToast("error");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full bg-transparent border-0 border-b border-[rgba(245,245,240,0.1)] text-[#f5f5f0] placeholder:text-[rgba(245,245,240,0.2)] py-3 focus:outline-none focus:border-[#f5f5f0] transition-colors";

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — info */}
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

          {/* Right — form */}
          <div className="bg-[#0f0f0f] border border-[rgba(245,245,240,0.06)] rounded-2xl p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Honeypot — hidden from real users, bots fill it automatically */}
              <input
                type="text"
                name="botcheck"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                aria-hidden="true"
                autoComplete="off"
              />

              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[rgba(245,245,240,0.4)] mb-2">
                  Name
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputBase}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[rgba(245,245,240,0.4)] mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputBase}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[rgba(245,245,240,0.4)] mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputBase} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-[#f5f5f0] text-[#0a0a0a] uppercase tracking-wider text-xs font-semibold py-4 px-10 hover:bg-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Send inquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast !== "idle" && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0f0f0f] border border-[rgba(245,245,240,0.1)] px-6 py-3 rounded-lg text-sm text-[#f5f5f0] mono whitespace-nowrap"
          >
            {toast === "success"
              ? "Message received. We'll be in touch."
              : "Something went wrong — please email us directly."}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
