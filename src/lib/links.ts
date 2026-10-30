import { contact, hasWhatsapp, mapsAddress, whatsappMessages, type WhatsappTopic } from "@/content/site";

/** Link de WhatsApp com a mensagem da origem do clique. Sem número configurado, leva ao contato. */
export function whatsappHref(topic: WhatsappTopic = "geral", message = whatsappMessages[topic]) {
  if (!hasWhatsapp) return "#contato";
  return `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Props de âncora para o WhatsApp: abre em nova aba só quando é link externo. */
export function whatsappLinkProps(topic: WhatsappTopic = "geral") {
  return hasWhatsapp
    ? { href: whatsappHref(topic), target: "_blank", rel: "noopener noreferrer" }
    : { href: whatsappHref(topic) };
}

export const mapsEmbedSrc = mapsAddress
  ? `https://www.google.com/maps?q=${encodeURIComponent(mapsAddress)}&z=16&output=embed`
  : null;

/** Rota no Google Maps até a loja. */
export const mapsRouteHref = mapsAddress
  ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsAddress)}`
  : null;

export const instagramHandle = contact.instagram.replace(/^@/, "");
export const instagramHref = instagramHandle ? `https://www.instagram.com/${instagramHandle}/` : null;

export const phoneHref = contact.phone ? `tel:+55${contact.phone.replace(/\D/g, "")}` : null;
