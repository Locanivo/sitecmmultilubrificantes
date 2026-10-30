import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { location } from "@/content/content";
import { company, contact, fullAddress, hasWhatsapp } from "@/content/site";
import { instagramHandle, instagramHref, mapsEmbedSrc, mapsRouteHref, phoneHref } from "@/lib/links";
import { Button } from "@/components/ui/button";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/icons";
import { Pending } from "@/components/ui/pending";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsappButton, WhatsappLink } from "@/components/ui/whatsapp-button";

function Row({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 rounded-lg border border-line bg-paper p-5">
      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-mist text-red">{icon}</span>
      <div className="min-w-0 flex-1">
        <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-body">{label}</dt>
        <dd className="mt-1.5 text-[0.9375rem] font-semibold leading-relaxed text-graphite">{children}</dd>
      </div>
    </div>
  );
}

const iconClass = "size-5";
const textLink = "underline decoration-graphite/25 underline-offset-4 transition-colors hover:text-red hover:decoration-red";

export function Location() {
  return (
    <section id="contato" aria-labelledby="contato-title" className="section bg-paper">
      <div className="container-site">
        <SectionHeading id="contato-title" eyebrow={location.eyebrow} title={location.title} text={location.text} className="max-w-2xl" />

        <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <dl className="grid gap-3">
              <Row icon={<MapPin strokeWidth={1.75} className={iconClass} />} label="Endereço">
                {fullAddress ? <address className="not-italic">{fullAddress}</address> : <Pending className="text-red">Endereço a confirmar</Pending>}
              </Row>
              <Row icon={<WhatsappIcon className={iconClass} />} label="WhatsApp e telefone">
                {hasWhatsapp ? (
                  <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <WhatsappLink origin="contato-numero" className={textLink}>
                      {contact.whatsappDisplay || contact.whatsapp}
                    </WhatsappLink>
                    {phoneHref && (
                      <a href={phoneHref} className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-body transition-colors hover:text-red">
                        <Phone aria-hidden="true" strokeWidth={1.75} className="size-3.5" />
                        Ligar
                      </a>
                    )}
                  </span>
                ) : (
                  <Pending className="text-red">Número a confirmar</Pending>
                )}
              </Row>
              <Row icon={<Clock strokeWidth={1.75} className={iconClass} />} label="Atendimento">
                {contact.hours.length > 0 ? (
                  <>
                    <ul>
                      {contact.hours.map((row) => (
                        <li key={row.days} className="flex justify-between gap-4 border-b border-dashed border-line py-1 last:border-0">
                          <span>{row.days}</span>
                          <span className="tabular-nums text-body">{row.hours}</span>
                        </li>
                      ))}
                    </ul>
                    {contact.hoursNote && <p className="mt-2 text-xs font-medium text-body">{contact.hoursNote}</p>}
                  </>
                ) : (
                  <Pending className="text-red">Horários a confirmar</Pending>
                )}
              </Row>
              {instagramHref && (
                <Row icon={<InstagramIcon className={iconClass} />} label="Instagram">
                  <a href={instagramHref} target="_blank" rel="noopener noreferrer" className={textLink}>
                    @{instagramHandle}
                  </a>
                </Row>
              )}
            </dl>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <WhatsappButton origin="contato" topic="geral" className="w-full sm:flex-1">
                {location.whatsappCta}
              </WhatsappButton>
              {mapsRouteHref ? (
                <Button
                  href={mapsRouteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline-dark"
                  icon={<Navigation aria-hidden="true" strokeWidth={1.75} className="size-4" />}
                  className="w-full sm:flex-1"
                >
                  {location.routeCta}
                </Button>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md border border-dashed border-graphite/25 px-5 text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-body sm:flex-1"
                >
                  <Navigation aria-hidden="true" className="size-4" />
                  {location.routeCta}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="relative h-full min-h-[20rem] overflow-hidden rounded-lg bg-mist md:min-h-[28rem]">
              {mapsEmbedSrc ? (
                <iframe
                  title={`Mapa de localização da ${company.name}`}
                  src={mapsEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full border-0 [filter:grayscale(0.6)_contrast(1.05)]"
                />
              ) : null}
              {mapsEmbedSrc && mapsRouteHref && (
                // Etiqueta da loja sobre o mapa, com atalho para a rota
                <div className="pointer-events-none absolute inset-x-3 bottom-3 flex justify-start sm:inset-x-auto sm:left-4 sm:bottom-4">
                  <a
                    href={mapsRouteHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group pointer-events-auto flex w-full items-center gap-3 rounded-md bg-graphite px-4 py-3 text-paper shadow-xl transition-colors hover:bg-graphite-2 sm:w-auto"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-md bg-red">
                      <MapPin aria-hidden="true" strokeWidth={1.75} className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-base font-bold uppercase leading-none">{company.name}</span>
                      <span className="mt-1 block truncate text-xs text-paper/65">
                        {contact.address.street} – {contact.address.district}
                      </span>
                    </span>
                    <Navigation aria-hidden="true" strokeWidth={1.75} className="ml-auto size-4 text-paper/60 transition-colors group-hover:text-paper" />
                  </a>
                </div>
              )}
              {!mapsEmbedSrc && (
                <div className="grid-lines absolute inset-0 flex flex-col items-center justify-center gap-4 bg-graphite p-8 text-center text-paper">
                  <span className="grid size-14 place-items-center rounded-full bg-red">
                    <MapPin aria-hidden="true" strokeWidth={1.75} className="size-6" />
                  </span>
                  <p className="font-display text-2xl font-bold uppercase">Mapa da loja</p>
                  <p className="max-w-xs text-sm text-paper/65">O mapa aparece aqui assim que o endereço for confirmado.</p>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
