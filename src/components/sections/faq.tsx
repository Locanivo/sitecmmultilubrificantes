"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { faq } from "@/content/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

const ease = [0.22, 1, 0.36, 1] as const;

function Item({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  const id = useId();
  return (
    <li className={`rounded-lg border bg-paper transition-[border-color,box-shadow] duration-300 ${open ? "border-graphite/15 shadow-[0_16px_40px_-30px_rgb(21_25_31/0.5)]" : "border-line"}`}>
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          className="group flex w-full items-center justify-between gap-5 rounded-lg px-5 py-5 text-left md:px-7 md:py-6"
        >
          <span className="text-base font-bold leading-snug transition-colors group-hover:text-red md:text-[1.0625rem]">{q}</span>
          <span
            aria-hidden="true"
            className={`grid size-9 shrink-0 place-items-center rounded-md transition-[background-color,color,transform] duration-300 ease-[var(--ease-premium)] ${
              open ? "rotate-45 bg-red text-paper" : "bg-mist text-graphite group-hover:bg-graphite group-hover:text-paper"
            }`}
          >
            <Plus strokeWidth={2} className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-6 pr-14 text-[0.9375rem] leading-relaxed text-body md:px-7 md:pr-20">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="section bg-paper">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="duvidas-title" eyebrow={faq.eyebrow} title={faq.title} text={faq.text} />
            <Reveal delay={0.15} className="mt-8 hidden lg:block">
              <WhatsappButton origin="faq" topic="geral" variant="dark">
                {faq.cta}
              </WhatsappButton>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <ul className="space-y-3">
            {faq.items.map((item, index) => (
              <Item key={item.q} {...item} open={open === index} onToggle={() => setOpen(open === index ? null : index)} />
            ))}
          </ul>
          <div className="mt-8 lg:hidden">
            <WhatsappButton origin="faq" topic="geral" variant="dark" className="w-full">
              {faq.cta}
            </WhatsappButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
