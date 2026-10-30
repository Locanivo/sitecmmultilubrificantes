"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { WhatsappIcon } from "@/components/ui/icons";
import { WhatsappLink } from "@/components/ui/whatsapp-button";

/** Botão flutuante: aparece depois da primeira dobra, respeitando as áreas seguras do celular. */
export function FloatingWhatsapp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-[max(1rem,env(safe-area-inset-right))] z-40 md:bottom-6 md:right-6"
        >
          <WhatsappLink
            origin="flutuante"
            aria-label="Conversar pelo WhatsApp"
            className="group flex h-14 items-center gap-0 rounded-full bg-red pl-4 pr-4 text-paper shadow-[0_14px_34px_-10px_rgb(215_40_40/0.75)] ring-4 ring-paper/70 transition-[background-color,gap,padding] duration-300 hover:bg-red-dark md:hover:gap-2.5 md:hover:pr-6"
          >
            <WhatsappIcon className="size-6" />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-[0.8125rem] font-bold uppercase tracking-[0.06em] transition-[max-width] duration-300 md:group-hover:max-w-40">
              WhatsApp
            </span>
          </WhatsappLink>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
