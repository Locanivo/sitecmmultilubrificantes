/**
 * Medição de eventos. Sem NEXT_PUBLIC_GA_ID configurado, nada é enviado:
 * os eventos ficam apenas no `dataLayer` (útil para um futuro Google Tag Manager).
 */

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: Gtag;
  }
}

export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.dataLayer.push({ event: name, ...params });
  window.gtag?.("event", name, params);
}

/** Clique em qualquer botão de WhatsApp, com a origem (hero, header, form...) e o assunto. */
export function trackWhatsappClick(origin: string, topic: string) {
  trackEvent("whatsapp_click", { origin, topic });
}
