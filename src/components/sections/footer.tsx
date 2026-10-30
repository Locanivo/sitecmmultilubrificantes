import Link from "next/link";
import { Clock, MapPin, Navigation } from "lucide-react";
import { footer, services } from "@/content/content";
import { company, contact, fullAddress, hasWhatsapp, nav, site } from "@/content/site";
import { instagramHandle, instagramHref, mapsRouteHref } from "@/lib/links";
import { InstagramIcon, Logo, WhatsappIcon } from "@/components/ui/icons";
import { WhatsappLink } from "@/components/ui/whatsapp-button";

const linkClass = "text-paper/65 transition-colors hover:text-paper";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-red-light">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line-dark bg-graphite text-paper">
      <div className="container-site grid gap-12 py-16 sm:grid-cols-2 md:py-20 lg:grid-cols-12 lg:gap-8">
        {/* 1. Marca */}
        <div className="lg:col-span-3">
          <Logo />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/65">{footer.text}</p>
          {instagramHref && (
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram @${instagramHandle}`}
              className="mt-6 inline-grid size-11 place-items-center rounded-md border border-paper/15 transition-colors hover:border-red hover:bg-red"
            >
              <InstagramIcon className="size-5" />
            </a>
          )}
        </div>

        {/* 2. Links rápidos */}
        <div className="lg:col-span-2">
          <Column title="Links rápidos">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </Column>
        </div>

        {/* 3. Serviços especializados */}
        <div className="lg:col-span-3">
          <Column title="Serviços especializados">
            {services.items.map((item) => (
              <li key={item.title}>
                <a href="#servicos" className={linkClass}>
                  {item.title}
                </a>
              </li>
            ))}
          </Column>
        </div>

        {/* 4. Contato */}
        <div className="lg:col-span-4">
          <Column title="Contato">
            {fullAddress && (
              <li className="flex gap-3 text-paper/65">
                <MapPin aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-red-light" />
                <address className="not-italic">{fullAddress}</address>
              </li>
            )}
            {hasWhatsapp && (
              <li>
                <WhatsappLink origin="rodape" className={`flex items-center gap-3 ${linkClass}`}>
                  <WhatsappIcon className="size-4 shrink-0 text-red-light" />
                  {contact.whatsappDisplay}
                </WhatsappLink>
              </li>
            )}
            {contact.hours.length > 0 && (
              <li className="flex gap-3 text-paper/65">
                <Clock aria-hidden="true" strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-red-light" />
                <span>
                  {contact.hours.map((row) => (
                    <span key={row.days} className="block">
                      {row.days}: {row.hours}
                    </span>
                  ))}
                </span>
              </li>
            )}
            {mapsRouteHref && (
              <li>
                <a href={mapsRouteHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-paper transition-colors hover:text-red-light">
                  <Navigation aria-hidden="true" strokeWidth={1.75} className="size-4" />
                  Como chegar
                </a>
              </li>
            )}
          </Column>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container-site flex flex-col gap-3 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {company.name}. Todos os direitos reservados.
          </p>
          <Link href="/politica-de-privacidade" className="transition-colors hover:text-paper">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
