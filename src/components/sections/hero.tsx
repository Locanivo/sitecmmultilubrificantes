import { ArrowDown, ChevronRight, Clock, MapPin } from "lucide-react";
import { hero } from "@/content/content";
import { images } from "@/content/images";
import { contact } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { HeroBackdrop, HeroContent, HeroLines, SplitText } from "@/components/ui/scroll-effects";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-graphite text-paper">
      {/* Fotografia + camadas de leitura (zoom de entrada e parallax lento) */}
      <HeroBackdrop>
        <Photo image={images.hero} sizes="100vw" priority />
        <div className="absolute inset-0 bg-graphite/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/80 to-graphite/5" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-graphite via-graphite/70 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-graphite/80 to-transparent" />
      </HeroBackdrop>

      <HeroLines />

      <HeroContent className="container-site flex flex-1 flex-col justify-center pb-10 pt-32 md:pb-16 md:pt-40">
        <div className="max-w-[46rem]">
          <Reveal y={12} delay={0.2}>
            <p className="eyebrow text-red-light">{hero.eyebrow}</p>
          </Reveal>
          <h1 id="inicio-title" className="display-xl mt-6">
            <SplitText
              onLoad
              delay={0.35}
              stagger={0.07}
              segments={[{ text: hero.titleStart }, { text: hero.titleHighlight, className: "text-red" }]}
            />
          </h1>
          <Reveal delay={0.95} blur>
            <p className="mt-6 max-w-xl text-lg font-semibold leading-snug text-paper md:text-xl">{hero.subtitle}</p>
          </Reveal>
          <Reveal delay={1.05}>
            {/* Informação local logo na primeira dobra: onde fica e quando abre */}
            <ul className="mt-6 flex flex-col gap-2 text-sm text-paper/75 sm:flex-row sm:flex-wrap sm:gap-x-6">
              <li className="flex items-center gap-2">
                <MapPin aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 text-red-light" />
                {contact.address.street} – {contact.address.district}, {contact.address.city}
              </li>
              {contact.hours[0] && (
                <li className="flex items-center gap-2">
                  <Clock aria-hidden="true" strokeWidth={1.75} className="size-4 shrink-0 text-red-light" />
                  {contact.hours[0].days}, {contact.hours[0].hours}
                </li>
              )}
            </ul>
          </Reveal>
          <Reveal delay={1.15} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <WhatsappButton origin="hero" topic="geral" size="lg" className="w-full sm:w-auto">
              {hero.primary}
            </WhatsappButton>
            <Button href="#servicos" variant="outline-light" size="lg" arrow className="w-full sm:w-auto">
              {hero.secondary}
            </Button>
          </Reveal>
        </div>
      </HeroContent>

      {/* Faixa de atalhos — responde "o que a empresa oferece" logo na primeira dobra */}
      <div className="container-site relative pb-6 md:pb-10">
        <Reveal delay={0.6}>
          <ul className="grid overflow-hidden rounded-lg border border-paper/10 bg-graphite-2/70 backdrop-blur-md sm:grid-cols-3">
            {hero.pillars.map((pillar, index) => (
              <li key={pillar.label} className="border-paper/10 [&:not(:first-child)]:border-t sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:border-t-0">
                <a href={pillar.href} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-paper/[0.04] md:px-6 md:py-5">
                  <span className="font-display text-2xl font-extrabold text-red-light md:text-3xl">{String(index + 1).padStart(2, "0")}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold uppercase tracking-[0.04em] md:text-xl">{pillar.label}</span>
                    <span className="block truncate text-[0.8125rem] text-paper/60">{pillar.text}</span>
                  </span>
                  <ChevronRight aria-hidden="true" className="size-4 text-paper/40 transition-[transform,color] group-hover:translate-x-1 group-hover:text-paper" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <a
          href="#solucoes"
          aria-label="Rolar para a próxima seção"
          className="absolute -top-20 right-10 hidden flex-col items-center gap-3 text-[0.625rem] font-bold uppercase tracking-[0.3em] text-paper/50 transition-colors hover:text-paper xl:flex"
        >
          <span className="[writing-mode:vertical-rl]">Role</span>
          <span className="relative h-12 w-px overflow-hidden bg-paper/20">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-[scroll-cue_1.8s_ease-in-out_infinite] bg-red" />
          </span>
          <ArrowDown className="size-3.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
