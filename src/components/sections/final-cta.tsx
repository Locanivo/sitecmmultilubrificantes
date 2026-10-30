import { finalCta } from "@/content/content";
import { images } from "@/content/images";
import { Photo } from "@/components/ui/photo";
import { Reveal } from "@/components/ui/reveal";
import { CurtainSection, Parallax, SplitText } from "@/components/ui/scroll-effects";
import { WhatsappButton } from "@/components/ui/whatsapp-button";

export function FinalCta() {
  return (
    <CurtainSection aria-labelledby="cta-final-title" className="relative isolate overflow-hidden bg-graphite text-paper">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax range={90}>
          <Photo image={images.storefront} sizes="100vw" className="opacity-50" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/90 to-graphite/50" />
      </div>
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-1.5 bg-red" />
      <div className="container-site py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="cta-final-title" className="display-lg md:!text-[3.5rem] lg:!text-[4rem]">
              <SplitText text={finalCta.title} stagger={0.045} />
            </h2>
            <Reveal delay={0.5}>
              <p className="lead mt-6 max-w-2xl text-paper/70">{finalCta.text}</p>
            </Reveal>
          </div>
          <Reveal delay={0.7} scale className="lg:col-span-4 lg:justify-self-end">
            <WhatsappButton origin="cta-final" topic="geral" size="lg" className="w-full !min-h-16 lg:w-auto">
              {finalCta.cta}
            </WhatsappButton>
          </Reveal>
        </div>
      </div>
    </CurtainSection>
  );
}
