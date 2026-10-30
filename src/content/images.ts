/**
 * Fotografias do site.
 *
 * Fotos da CM Multi Lubrificantes: originais intocados em `fotos-originais/`
 * (fora do site publicado); as versões do site (`public/img/*.webp`) são
 * geradas com `node scripts/otimizar-fotos.mjs`. Uma imagem que não seja da
 * empresa deve ter `illustrative: true`, que exibe o selo "Imagem ilustrativa".
 *
 * Enquadramento (CSS object-position): `position` no tablet/desktop e
 * `positionMobile` no celular (até 767px). Ex.: "30% center".
 */

export type SiteImage = {
  src: string;
  alt: string;
  illustrative: boolean;
  position?: string;
  positionMobile?: string;
};

export const images = {
  hero: {
    src: "/img/cm-multi-oficina.webp",
    alt: "Oficina da CM Multi Lubrificantes com veículos em manutenção e iluminação em hexágonos",
    illustrative: false,
    // Desktop: mostra o teto em hexágonos e os dois veículos; celular: o carro com o capô aberto.
    position: "center 60%",
    positionMobile: "26% center",
  },
  lubricants: {
    src: "/img/cm-multi-lubrificantes-prateleira.webp",
    alt: "Prateleira de óleos lubrificantes na loja da CM Multi Lubrificantes",
    illustrative: false,
    position: "35% 55%",
    positionMobile: "center 55%",
  },
  maintenance: {
    src: "/img/cm-multi-manutencao.webp",
    alt: "Profissional da CM Multi Lubrificantes verificando o motor de um carro",
    illustrative: false,
    position: "45% 40%",
    positionMobile: "center 40%",
  },
  about: {
    src: "/img/cm-multi-equipe.webp",
    alt: "Profissional da CM Multi Lubrificantes sorrindo e fazendo sinal de positivo na oficina",
    illustrative: false,
    // Retrato vertical: no recorte horizontal (tablet) mantém o rosto no quadro.
    position: "center 22%",
    positionMobile: "center 20%",
  },
  storefront: {
    src: "/img/cm-multi-fachada.webp",
    alt: "Fachada da loja CM Multi Lubrificantes à noite",
    illustrative: false,
    position: "center 55%",
    positionMobile: "42% center",
  },
} satisfies Record<string, SiteImage>;
