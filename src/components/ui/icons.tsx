/* Ícones de marca desenhados em linha (o Lucide não inclui logos de marcas). */

type IconProps = { className?: string };

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3.6 20.4 4.9 16A8.5 8.5 0 1 1 8 19.1Z" />
      <path d="M9.2 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .6.4.7 1 1.4 1.6 1.9.6.5 1.2.8 1.6 1 .2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.6-.1l1.5.7c.3.1.4.2.4.4 0 .5-.1 1.1-.6 1.5-.5.4-1.3.7-2.3.5-1-.2-2.4-.8-3.8-2.1-1.4-1.3-2.2-2.7-2.4-3.6-.2-.9 0-1.7.3-2.1Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

/**
 * Marca provisória (tipográfica) até a empresa enviar o logotipo oficial.
 * Para usar o logo real: troque o conteúdo por <Image src="/logo.svg" ... />.
 */
export function Logo({ className = "", tone = "light" }: IconProps & { tone?: "light" | "dark" }) {
  return (
    <span className={`flex items-center gap-2.5 leading-none ${className}`}>
      <span
        aria-hidden="true"
        className="grid h-9 w-11 -skew-x-12 place-items-center rounded-[3px] bg-red font-display text-[1.35rem] font-black tracking-[0.02em] text-paper"
      >
        <span className="skew-x-12">CM</span>
      </span>
      <span className="flex flex-col">
        <span className={`font-display text-[1.3rem] font-extrabold uppercase tracking-[0.04em] ${tone === "light" ? "text-paper" : "text-graphite"}`}>
          Multi
        </span>
        <span className={`mt-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.26em] ${tone === "light" ? "text-paper/65" : "text-body"}`}>
          Lubrificantes
        </span>
      </span>
    </span>
  );
}
