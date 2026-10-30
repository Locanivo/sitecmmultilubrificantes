"use client";

import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { testimonialsSection } from "@/content/content";
import { contact } from "@/content/site";
import { testimonials, type Testimonial } from "@/content/testimonials";
import { Button } from "@/components/ui/button";
import { ease, Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

function Card({ item, index, total }: { item: Testimonial; index: number; total: number }) {
  return (
    <figure
      role="group"
      aria-roledescription="slide"
      aria-label={`Avaliação ${index + 1} de ${total}`}
      className="group flex h-full flex-col rounded-lg border border-line bg-paper p-7 transition-[box-shadow,transform] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgb(21_25_31/0.45)] md:p-8"
    >
      <div className="flex items-center justify-between">
        <span className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-red">{testimonialsSection.label}</span>
        <Quote aria-hidden="true" strokeWidth={1.5} className="size-7 text-red/25 transition-colors duration-300 group-hover:text-red/60" />
      </div>
      <blockquote className="mt-6 flex-1 text-[0.9375rem] leading-relaxed text-graphite md:text-base">“{item.text}”</blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-line pt-5">
        <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-graphite font-display text-base font-extrabold text-paper">
          {item.name.charAt(0)}
        </span>
        <span className="font-bold">{item.name}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Carrossel de avaliações: rolagem nativa com "snap" (deslize por toque no
 * celular, fluido e leve) + setas no desktop. Sem rolagem automática.
 */
export function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [state, setState] = useState({ index: 0, atStart: true, atEnd: false, progress: 0 });
  const total = testimonials.length;

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const max = track.scrollWidth - track.clientWidth;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0") : track.clientWidth;
    setState({
      index: Math.min(total - 1, Math.round(track.scrollLeft / step)),
      atStart: track.scrollLeft <= 4,
      atEnd: track.scrollLeft >= max - 4,
      progress: max > 0 ? track.scrollLeft / max : 1,
    });
  }, [total]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const go = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild as HTMLElement | null;
    if (!track || !card) return;
    track.scrollBy({ left: direction * (card.offsetWidth + 24), behavior: reduce ? "auto" : "smooth" });
  };

  if (total === 0) return null;

  const arrowClass =
    "grid size-12 place-items-center rounded-md border border-graphite/15 bg-paper text-graphite transition-[background-color,color,border-color,opacity] duration-300 hover:border-graphite hover:bg-graphite hover:text-paper disabled:pointer-events-none disabled:opacity-35";

  return (
    <section id="avaliacoes" aria-labelledby="avaliacoes-title" aria-roledescription="carrossel" className="section overflow-hidden bg-mist">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="avaliacoes-title"
            eyebrow={testimonialsSection.eyebrow}
            title={testimonialsSection.title}
            text={testimonialsSection.text}
            className="max-w-2xl"
          />
          <Reveal delay={0.2} className="flex items-center gap-3">
            {contact.googleBusinessUrl && (
              <Button href={contact.googleBusinessUrl} target="_blank" rel="noopener noreferrer" variant="outline-dark" arrow className="mr-2">
                {testimonialsSection.googleCta}
              </Button>
            )}
            <div className="hidden gap-2 md:flex">
              <button type="button" onClick={() => go(-1)} disabled={state.atStart} aria-label="Avaliação anterior" className={arrowClass}>
                <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="size-5" />
              </button>
              <button type="button" onClick={() => go(1)} disabled={state.atEnd} aria-label="Próxima avaliação" className={arrowClass}>
                <ArrowRight aria-hidden="true" strokeWidth={1.75} className="size-5" />
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* A trilha vaza para a direita da página, sugerindo que há mais cards */}
      <div className="container-site mt-12 md:mt-16">
        <ul
          ref={trackRef}
          tabIndex={0}
          aria-label="Avaliações de clientes — role para os lados"
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] focus-visible:outline-offset-8 md:-mx-10 md:gap-6 md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease, delay: Math.min(index, 3) * 0.1 }}
              className="w-[85%] shrink-0 snap-start sm:w-[60%] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <Card item={item} index={index} total={total} />
            </motion.li>
          ))}
        </ul>

        {/* Progresso: contador + barra */}
        <div className="mt-6 flex items-center gap-5" aria-hidden="true">
          <span className="font-display text-sm font-extrabold tabular-nums tracking-[0.18em] text-graphite">
            {String(state.index + 1).padStart(2, "0")}
            <span className="text-graphite/35"> / {String(total).padStart(2, "0")}</span>
          </span>
          <span className="relative h-0.5 flex-1 overflow-hidden bg-graphite/10">
            <span
              className="absolute inset-y-0 left-0 bg-red transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(1 / total, state.progress) * 100}%` }}
            />
          </span>
          <span className="text-xs font-semibold text-body md:hidden">Deslize para o lado</span>
        </div>
      </div>
    </section>
  );
}
