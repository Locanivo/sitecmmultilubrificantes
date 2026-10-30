import { Check } from "lucide-react";
import { about } from "@/content/content";
import { images } from "@/content/images";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { ImageReveal, Parallax, SplitText } from "@/components/ui/scroll-effects";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="section overflow-hidden bg-paper">
      <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          {/* Moldura deslocada em vermelho — detalhe geométrico da identidade */}
          <Reveal y={-24} delay={0.6} className="absolute -bottom-4 -left-4 h-2/3 w-2/3 md:-bottom-6 md:-left-6">
            <div aria-hidden="true" className="size-full rounded-lg border-2 border-red" />
          </Reveal>
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-lg bg-graphite-2 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Parallax range={50}>
              <Photo image={images.about} sizes="(min-width: 1024px) 45vw, 100vw" />
            </Parallax>
          </ImageReveal>
          {images.about.illustrative && (
            <span className="absolute bottom-3 right-3 rounded-sm bg-graphite/75 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-paper/80 backdrop-blur-sm">
              Imagem ilustrativa
            </span>
          )}
          <Reveal y={16} delay={0.8} blur className="absolute -right-2 top-8 hidden sm:block md:-right-6">
            <div className="rounded-md bg-graphite px-5 py-4 text-paper shadow-xl">
              <p className="font-display text-xs font-extrabold uppercase tracking-[0.22em] text-red-light">CM Multi</p>
              <p className="mt-1 font-display text-2xl font-extrabold uppercase leading-none">Lubrificantes</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal y={12}>
            <p className="eyebrow text-red">{about.eyebrow}</p>
          </Reveal>
          <h2 id="sobre-title" className="display-lg mt-5">
            <SplitText text={about.title} delay={0.1} />
          </h2>
          <Reveal delay={0.4} className="mt-6 space-y-4 text-base leading-relaxed text-body md:text-[1.0625rem]">
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "font-semibold text-graphite" : undefined}>
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.5}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {about.pillars.map((pillar) => (
                <li key={pillar} className="inline-flex items-center gap-2 rounded-md bg-mist px-3.5 py-2 text-[0.8125rem] font-semibold text-graphite">
                  <Check aria-hidden="true" strokeWidth={2.5} className="size-3.5 text-red" />
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.6} className="mt-10">
            <WhatsappButton origin="sobre" topic="geral" variant="dark" className="w-full sm:w-auto">
              {about.cta}
            </WhatsappButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
