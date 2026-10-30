import { ArrowRight } from "lucide-react";
import { solutions, type Solution } from "@/content/content";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { Parallax, SplitText } from "@/components/ui/scroll-effects";
import { WhatsappLink } from "@/components/ui/whatsapp-button";

const ctaClass =
  "inline-flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-[0.1em] text-graphite transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-red";

function Card({ item, index }: { item: Solution; index: number }) {
  const cta = (
    <>
      {item.cta}
      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  return (
    // O Reveal anima o transform; o hover (elevação) fica no elemento interno para não brigar com ele.
    <Reveal as="article" delay={index * 0.12} y={48} scale className="h-full">
      <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-paper transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_24px_50px_-28px_rgb(21_25_31/0.45)] md:max-lg:flex-row">
      <span id={item.id} className="absolute top-0" aria-hidden="true" />
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite-2 md:max-lg:aspect-auto md:max-lg:w-2/5 md:max-lg:shrink-0">
        <Parallax range={28}>
          <Photo
            image={item.image}
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 40vw, 100vw"
            className="transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.06]"
          />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/60 via-transparent to-transparent" />
        <span className="absolute left-5 top-5 font-display text-sm font-extrabold tracking-[0.2em] text-paper">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="display-md">{item.title}</h3>
        <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-body">{item.text}</p>
        <div className="mt-6 border-t border-line pt-5">
          {item.href ? (
            <a href={item.href} className={ctaClass}>
              {cta}
            </a>
          ) : (
            <WhatsappLink topic={item.topic} origin={`solucoes-${item.id}`} className={ctaClass}>
              {cta}
            </WhatsappLink>
          )}
        </div>
      </div>
      {/* Indicador vermelho que cresce no hover */}
      <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-red transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-x-100" />
      </div>
    </Reveal>
  );
}

export function Solutions() {
  return (
    <section id="solucoes" aria-labelledby="solucoes-title" className="section bg-paper">
      <div className="container-site">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <p className="eyebrow text-red">{solutions.eyebrow}</p>
            </Reveal>
            <h2 id="solucoes-title" className="display-lg mt-5">
              <SplitText text={solutions.title} delay={0.1} />
            </h2>
          </div>
          <Reveal delay={0.35} className="lg:col-span-5">
            <p className="lead text-body">{solutions.text}</p>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-3 lg:gap-6">
          {solutions.items.map((item, index) => (
            <Card key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
