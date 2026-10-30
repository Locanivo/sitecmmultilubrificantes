import { ArrowRight } from "lucide-react";
import { services } from "@/content/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsappButton, WhatsappLink } from "@/components/ui/whatsapp-button";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="section bg-mist">
      <div className="container-site">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="servicos-title" eyebrow={services.eyebrow} title={services.title} text={services.text} className="max-w-2xl" />
          <Reveal delay={0.1} className="hidden shrink-0 lg:block">
            <WhatsappButton origin="servicos-topo" topic="geral" className="whitespace-nowrap">
              {services.cta}
            </WhatsappButton>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {services.items.map(({ title, text, icon: Icon, topic }, index) => (
            <Reveal as="li" key={title} delay={0.1 + (index % 3) * 0.1} y={16} className="bg-paper">
              {/* O card inteiro abre o WhatsApp com a mensagem do serviço */}
              <div className="group relative flex h-full flex-col p-7 transition-colors duration-300 hover:bg-mist md:p-9">
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-md border border-line bg-paper text-red transition-[background-color,color,border-color] duration-300 group-hover:border-red group-hover:bg-red group-hover:text-paper">
                    <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:-rotate-12 group-hover:scale-110" />
                  </span>
                  <span className="font-display text-sm font-extrabold tracking-[0.2em] text-graphite/25">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 font-display text-[1.75rem] font-bold uppercase leading-none md:text-[2rem]">{title}</h3>
                <p className="mt-3 max-w-sm flex-1 text-[0.9375rem] leading-relaxed text-body">{text}</p>
                <WhatsappLink
                  topic={topic}
                  origin={`servicos-card-${index + 1}`}
                  aria-label={`${services.itemCta}: ${title}`}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-graphite transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-red"
                >
                  {services.itemCta}
                  <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </WhatsappLink>
                <span aria-hidden="true" className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-red transition-transform duration-500 ease-[var(--ease-premium)] group-hover:scale-y-100" />
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-8 lg:hidden">
          <WhatsappButton origin="servicos" topic="geral" className="w-full">
            {services.cta}
          </WhatsappButton>
        </Reveal>
      </div>
    </section>
  );
}
