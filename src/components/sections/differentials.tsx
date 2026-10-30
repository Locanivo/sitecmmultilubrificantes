import { differentials } from "@/content/content";
import { Reveal } from "@/components/ui/reveal";
import { CurtainSection } from "@/components/ui/scroll-effects";
import { SectionHeading } from "@/components/ui/section-heading";

export function Differentials() {
  return (
    <CurtainSection id="diferenciais" aria-labelledby="diferenciais-title" className="grid-lines section relative overflow-hidden bg-graphite text-paper">
      <Reveal y={0} delay={0.3} className="absolute left-0 top-0 h-1 w-24 origin-left md:w-40">
        <div aria-hidden="true" className="size-full bg-red" />
      </Reveal>
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-10">
        <SectionHeading
          id="diferenciais-title"
          tone="dark"
          eyebrow={differentials.eyebrow}
          title={differentials.title}
          text={differentials.text}
          className="lg:col-span-5"
        />
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line-dark bg-line-dark sm:grid-cols-2 lg:col-span-7">
          {differentials.items.map(({ title, text, icon: Icon }, index) => (
            <Reveal as="li" key={title} delay={0.15 + index * 0.1} y={16} className="group bg-graphite p-7 transition-colors duration-300 hover:bg-graphite-2 md:p-8">
              <div className="flex items-center justify-between">
                <Icon aria-hidden="true" strokeWidth={1.25} className="size-9 text-paper transition-colors duration-300 group-hover:text-red-light" />
                <span className="font-display text-sm font-extrabold tracking-[0.2em] text-paper/30">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <span aria-hidden="true" className="mt-8 block h-0.5 w-8 bg-red transition-[width] duration-500 ease-[var(--ease-premium)] group-hover:w-16" />
              <h3 className="mt-5 font-display text-2xl font-bold uppercase leading-none md:text-[1.75rem]">{title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/65">{text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </CurtainSection>
  );
}
