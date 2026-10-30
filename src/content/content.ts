/**
 * Textos do site. Edite aqui sem mexer nos componentes.
 * Ícones: https://lucide.dev/icons (importe pelo nome em PascalCase).
 */
import {
  AirVent,
  Coffee,
  Cog,
  Droplet,
  FileCheck,
  Funnel,
  Headset,
  Settings2,
  Thermometer,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { images, type SiteImage } from "./images";
import type { WhatsappTopic } from "./site";

export const hero = {
  eyebrow: "Auto center · Centro de Montes Claros",
  titleStart: "CM Multi Lubrificantes —",
  titleHighlight: "seu auto center em Montes Claros.",
  subtitle: "Especialistas em troca de óleo, lubrificantes, filtros e cuidados automotivos.",
  primary: "Solicitar atendimento pelo WhatsApp",
  secondary: "Conhecer nossos serviços",
  pillars: [
    { label: "Troca de óleo", text: "Motor, câmbio e diferencial", href: "#servicos" },
    { label: "Filtros", text: "Óleo, ar, combustível e cabine", href: "#servicos" },
    { label: "Arrefecimento e A/C", text: "Limpeza e manutenção", href: "#servicos" },
  ],
};

export type Solution = {
  id: string;
  title: string;
  text: string;
  cta: string;
  topic: WhatsappTopic;
  image: SiteImage;
  /** Leva a uma seção do site (ou link externo) em vez de abrir o WhatsApp. */
  href?: string;
};

export const solutions = {
  eyebrow: "O que oferecemos",
  title: "Especialistas no cuidado do seu veículo.",
  text: "Lubrificantes, filtros e manutenção preventiva em um auto center equipado, com atendimento claro do orçamento à entrega.",
  items: [
    {
      id: "troca-de-oleo",
      title: "Troca de óleo",
      text: "Óleo do motor, do câmbio e do diferencial, conforme as especificações recomendadas para o seu veículo.",
      cta: "Consultar troca de óleo",
      topic: "oleo",
      image: images.lubricants,
    },
    {
      id: "filtros-e-manutencao",
      title: "Filtros e manutenção",
      text: "Troca de filtros, limpeza do sistema de arrefecimento e cuidados com o ar-condicionado automotivo.",
      cta: "Ver serviços",
      topic: "filtros",
      image: images.maintenance,
      href: "#servicos",
    },
    {
      id: "estrutura",
      title: "Estrutura e conforto",
      text: "Ambiente equipado para os serviços e espaço de espera climatizado, com água, café e banheiros.",
      cta: "Como chegar",
      topic: "geral",
      image: images.hero,
      href: "#contato",
    },
  ] satisfies Solution[],
};

/**
 * Serviços especializados — só o que a empresa confirmou que realiza.
 * `topic` define a mensagem do WhatsApp do botão de cada card.
 */
export const services = {
  eyebrow: "Serviços especializados",
  title: "Cuidado completo com o que mantém seu carro rodando.",
  text: "Serviços focados em lubrificação, filtragem e climatização, realizados com atenção às especificações de cada veículo.",
  items: [
    {
      title: "Troca de óleo do motor",
      text: "Substituição de óleo lubrificante conforme as especificações recomendadas para seu veículo.",
      icon: Droplet,
      topic: "oleo",
    },
    {
      title: "Troca de óleo do câmbio",
      text: "Serviço de substituição do fluido de transmissão, conforme as necessidades e especificações do sistema.",
      icon: Cog,
      topic: "oleo",
    },
    {
      title: "Troca de óleo do diferencial",
      text: "Manutenção do lubrificante do diferencial para ajudar a preservar o funcionamento adequado dos componentes.",
      icon: Settings2,
      topic: "oleo",
    },
    {
      title: "Troca de filtros automotivos",
      text: "Substituição de filtros de óleo, ar do motor, combustível e cabine, conforme a aplicação de cada veículo.",
      icon: Funnel,
      topic: "filtros",
    },
    {
      title: "Limpeza do sistema de arrefecimento",
      text: "Serviços de limpeza e manutenção do sistema de arrefecimento, com utilização de aditivos adequados.",
      icon: Thermometer,
      topic: "arrefecimento",
    },
    {
      title: "Limpeza e manutenção do ar-condicionado",
      text: "Cuidados com o sistema de climatização automotiva, incluindo limpeza e manutenção conforme a necessidade.",
      icon: AirVent,
      topic: "arcondicionado",
    },
  ] satisfies { title: string; text: string; icon: LucideIcon; topic: WhatsappTopic }[],
  itemCta: "Consultar",
  cta: "Consultar serviços pelo WhatsApp",
};

export const about = {
  eyebrow: "Quem somos",
  title: "Seu veículo merece cuidado. Você merece confiança.",
  paragraphs: [
    "Na CM Multi Lubrificantes, oferecemos soluções para o cuidado e a manutenção do seu veículo, com atendimento especializado, equipamentos adequados e atenção aos detalhes.",
    "Realizamos troca de óleo do motor, câmbio e diferencial, substituição de filtros, limpeza do sistema de arrefecimento e serviços de limpeza e manutenção do ar-condicionado automotivo.",
    "Nossa equipe busca oferecer um atendimento transparente, cuidadoso e eficiente, para que você tenha mais tranquilidade na manutenção do seu carro.",
  ],
  pillars: ["Troca de óleo", "Filtros", "Arrefecimento", "Ar-condicionado"],
  cta: "Solicitar atendimento pelo WhatsApp",
};

export const differentials = {
  eyebrow: "Nossos diferenciais",
  title: "Mais cuidado com seu carro. Mais conforto para você.",
  text: "Do primeiro contato à entrega do veículo, buscamos uma experiência simples, transparente e confortável.",
  items: [
    {
      title: "Atendimento especializado",
      text: "Equipe preparada para orientar os clientes sobre lubrificantes, filtros e manutenção.",
      icon: Headset,
    },
    {
      title: "Equipamentos e estrutura",
      text: "Ambiente equipado para a realização dos serviços oferecidos.",
      icon: Wrench,
    },
    {
      title: "Transparência",
      text: "Atendimento com informações claras sobre produtos, serviços e orçamentos.",
      icon: FileCheck,
    },
    {
      title: "Conforto durante a espera",
      text: "Espaço de espera climatizado, com água, café e banheiros, conforme relatado pelos clientes.",
      icon: Coffee,
    },
  ] satisfies { title: string; text: string; icon: LucideIcon }[],
};

export const testimonialsSection = {
  eyebrow: "Avaliações",
  title: "Quem confia, recomenda.",
  text: "Conheça a experiência de clientes que já utilizaram os serviços da CM Multi Lubrificantes.",
  label: "Avaliação de cliente",
  googleCta: "Ver avaliações no Google",
};

export const faq = {
  eyebrow: "Dúvidas frequentes",
  title: "Ficou com alguma dúvida?",
  text: "Se a sua pergunta não estiver aqui, fale com nossa equipe pelo WhatsApp.",
  cta: "Tirar dúvidas pelo WhatsApp",
  items: [
    {
      q: "Como saber qual óleo é indicado para o meu carro?",
      a: "Informe pelo WhatsApp a marca, o modelo, o ano e a motorização do veículo. Nossa equipe verifica a especificação recomendada e os produtos disponíveis.",
    },
    {
      q: "Posso solicitar um orçamento pelo WhatsApp?",
      a: "Sim. Envie sua solicitação diretamente pelo WhatsApp para consultar valores e disponibilidade dos serviços.",
    },
    {
      q: "Quais serviços vocês realizam?",
      a: "Troca de óleo do motor, do câmbio e do diferencial, troca de filtros (óleo, ar do motor, combustível e cabine), limpeza do sistema de arrefecimento e limpeza e manutenção do ar-condicionado automotivo.",
    },
    {
      q: "Preciso agendar o atendimento?",
      a: "Entre em contato pelo WhatsApp, informe o serviço desejado e consulte os horários disponíveis.",
    },
    {
      q: "Existe um espaço para aguardar durante o serviço?",
      a: "Sim. Contamos com espaço de espera climatizado, com água, café e banheiros.",
    },
    {
      q: "Onde fica a loja e qual o horário de funcionamento?",
      a: "Estamos na Av. Alfredo Coutinho, 77, no Centro de Montes Claros. Atendemos de segunda a sexta, das 07h às 18h, e aos sábados, das 07h às 12h.",
    },
    {
      q: "Quais são as formas de pagamento?",
      a: "Consulte nossa equipe para conhecer os meios de pagamento aceitos.",
    },
  ],
};

export const quote = {
  eyebrow: "Orçamento rápido",
  title: "Peça seu orçamento em poucos segundos.",
  text: "Informe alguns dados do seu veículo e o serviço desejado. A mensagem chega pronta para nossa equipe no WhatsApp.",
  steps: ["Preencha os dados do veículo", "Envie pelo WhatsApp", "Receba o orçamento da nossa equipe"],
  otherService: "Outro / não sei",
  submit: "Enviar pelo WhatsApp",
};

export const location = {
  eyebrow: "Localização e contato",
  title: "Venha conhecer a CM Multi Lubrificantes.",
  text: "Estamos no Centro de Montes Claros, prontos para atender você e cuidar do seu veículo.",
  whatsappCta: "Falar pelo WhatsApp",
  routeCta: "Como chegar",
};

export const finalCta = {
  title: "Seu carro faz parte da sua rotina. Conte com a gente para cuidar dele.",
  text: "Da troca de óleo à limpeza do ar-condicionado, estamos à disposição para cuidar do seu veículo com atenção e transparência.",
  cta: "Falar com a CM Multi Lubrificantes",
};

export const footer = {
  text: "Auto center em Montes Claros especializado em troca de óleo, lubrificantes, filtros e cuidados automotivos.",
};
