/**
 * Configuração central da CM Multi Lubrificantes.
 *
 * Dados oficiais informados pela empresa em 2026-10-29. Tudo o que for
 * string vazia ou lista vazia é omitido do site e do SEO.
 */

export const company = {
  name: "CM Multi Lubrificantes",
  shortName: "CM Multi",
  tagline: "Auto center em Montes Claros",
  description:
    "Auto center em Montes Claros especializado em troca de óleo, lubrificantes, filtros e cuidados automotivos.",
};

export const contact = {
  /** WhatsApp comercial, somente dígitos, com DDI 55 e DDD. */
  whatsapp: "5538999588581",
  /** Número formatado para exibição. */
  whatsappDisplay: "(38) 99958-8581",
  /** Telefone para ligação. O mesmo número do WhatsApp. */
  phone: "(38) 99958-8581",
  /** Usuário do Instagram sem @. Vazio = não aparece. */
  instagram: "",
  email: "",

  address: {
    street: "Av. Alfredo Coutinho, 77",
    complement: "",
    district: "Centro",
    city: "Montes Claros",
    state: "MG",
    zip: "39400-039",
  },

  /** Horário exibido no site. */
  hours: [
    { days: "Segunda a sexta", hours: "07h às 18h" },
    { days: "Sábado", hours: "07h às 12h" },
    { days: "Domingo", hours: "Fechado" },
  ] as { days: string; hours: string }[],
  hoursNote: "",
  /** Horário para os dados estruturados (schema.org). */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "07:00", closes: "18:00" },
    { days: ["Saturday"], opens: "07:00", closes: "12:00" },
  ] as { days: string[]; opens: string; closes: string }[],

  /** Link do perfil da empresa no Google (avaliações). Vazio = botão oculto. */
  googleBusinessUrl: "",
};

/**
 * Mensagens pré-preenchidas do WhatsApp, por assunto.
 * O texto é codificado automaticamente na URL.
 */
export const whatsappMessages = {
  geral: "Olá! Encontrei a CM Multi Lubrificantes pelo site e gostaria de solicitar um orçamento.",
  oleo: "Olá! Gostaria de consultar os valores e a disponibilidade para troca de óleo do meu veículo.",
  filtros: "Olá! Gostaria de consultar os filtros disponíveis para meu veículo.",
  arrefecimento: "Olá! Gostaria de mais informações sobre a limpeza do sistema de arrefecimento.",
  arcondicionado: "Olá! Gostaria de consultar os serviços de limpeza e manutenção do ar-condicionado automotivo.",
};

export type WhatsappTopic = keyof typeof whatsappMessages;

export const site = {
  /** Defina NEXT_PUBLIC_SITE_URL com o domínio definitivo na publicação. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3500",
  seo: {
    title: "CM Multi Lubrificantes | Auto Center e Troca de Óleo em Montes Claros – MG",
    description:
      "Auto center no Centro de Montes Claros especializado em troca de óleo do motor, câmbio e diferencial, filtros, limpeza do arrefecimento e do ar-condicionado. Orçamentos pelo WhatsApp.",
    keywords: [
      "troca de óleo Montes Claros",
      "auto center Montes Claros",
      "lubrificantes Montes Claros",
      "troca de filtros Montes Claros",
      "troca de óleo do câmbio",
      "troca de óleo do diferencial",
      "limpeza do sistema de arrefecimento",
      "limpeza de ar-condicionado automotivo",
      "CM Multi Lubrificantes",
    ],
  },
  copyrightYear: 2026,
};

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Contato", href: "#contato" },
];

/* Derivados — não editar. */

export const hasWhatsapp = contact.whatsapp.replace(/\D/g, "").length >= 12;
export const hasAddress = Boolean(contact.address.street && contact.address.city);

export const cityLine = [contact.address.city, contact.address.state].filter(Boolean).join(" - ");

/** Endereço completo em uma linha, no formato oficial (também usado no Google Maps). */
export const fullAddress = hasAddress
  ? [
      [[contact.address.street, contact.address.complement].filter(Boolean).join(", "), contact.address.district]
        .filter(Boolean)
        .join(" - "),
      cityLine,
      contact.address.zip,
    ]
      .filter(Boolean)
      .join(", ")
  : null;

export const mapsAddress = fullAddress;
