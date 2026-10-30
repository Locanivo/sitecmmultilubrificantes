"use client";

import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { company, contact, hasWhatsapp, nav } from "@/content/site";
import { trackWhatsappClick } from "@/lib/analytics";
import { whatsappLinkProps } from "@/lib/links";
import { buttonClass } from "@/components/ui/button";
import { Logo, WhatsappIcon } from "@/components/ui/icons";
import { ScrollProgress } from "@/components/ui/scroll-effects";

const ease = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Destaca no menu a seção visível.
  useEffect(() => {
    const sections = nav
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Menu mobile: trava a rolagem e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-paper transition-[background-color,border-color,box-shadow] duration-500 ease-[var(--ease-premium)] ${
        open
          ? "border-b border-paper/[0.06] bg-graphite" // sem backdrop-filter: ele prenderia o menu fixo dentro do header
          : solid
          ? "border-b border-paper/[0.06] bg-graphite/95 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.8)] backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <ScrollProgress />
      <div className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-16 md:h-[4.5rem]" : "h-[4.5rem] md:h-24"}`}>
        <a href="#inicio" aria-label={`${company.name} — início`} className="relative z-10" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-1 xl:gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={active === item.href ? "location" : undefined}
                  className="group relative block whitespace-nowrap px-3 py-2 text-[0.8125rem] font-semibold text-paper/75 transition-colors hover:text-paper aria-[current]:text-paper"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 bg-red transition-transform duration-300 ease-[var(--ease-premium)] group-hover:scale-x-100 group-aria-[current]:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <a
            {...whatsappLinkProps("geral")}
            onClick={() => trackWhatsappClick("header", "geral")}
            className={buttonClass("red", "md", "!min-h-11 whitespace-nowrap !px-5 max-sm:!hidden")}
          >
            <WhatsappIcon className="size-4" />
            Solicitar orçamento
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className="grid size-11 place-items-center rounded-md border border-paper/20 transition-colors hover:border-paper/60 xl:hidden"
          >
            {open ? <X strokeWidth={1.75} className="size-5" /> : <Menu strokeWidth={1.75} className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease }}
            className={`grid-lines fixed inset-x-0 bottom-0 ${scrolled ? "top-16" : "top-[4.5rem]"} flex flex-col overflow-y-auto border-t border-paper/[0.06] bg-graphite pb-[max(2rem,env(safe-area-inset-bottom))] xl:hidden`}
          >
            <nav aria-label="Menu" className="container-site flex-1 pt-4">
              <ul>
                {nav.map((item, index) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, ease, delay: 0.05 + index * 0.04 }}
                    className="border-b border-line-dark"
                  >
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.href ? "location" : undefined}
                      className="group flex items-center justify-between py-4 font-display text-[2rem] font-extrabold uppercase leading-none tracking-[0.02em] text-paper aria-[current]:text-red-light"
                    >
                      {item.label}
                      <span className="font-sans text-xs font-bold tracking-[0.2em] text-paper/40">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.3 }}
              className="container-site mt-8 flex flex-col gap-4"
            >
              <a
                {...whatsappLinkProps("geral")}
                onClick={() => {
                  trackWhatsappClick("menu-mobile", "geral");
                  setOpen(false);
                }}
                className={buttonClass("red", "lg", "w-full")}
              >
                <WhatsappIcon className="size-5" />
                Solicitar orçamento
              </a>
              {hasWhatsapp && contact.whatsappDisplay && (
                <p className="text-center text-sm text-paper/60">WhatsApp {contact.whatsappDisplay}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
