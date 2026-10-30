# CM Multi Lubrificantes — site institucional

Next.js 16 + TypeScript + Tailwind CSS 4 + Motion + Lucide. Página única com foco em conversão pelo WhatsApp.

```bash
npm run dev        # http://localhost:3500
npm run build
npm run lint
npm run typecheck
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| WhatsApp, telefone, endereço, horários, Instagram, link do Google | `src/content/site.ts` |
| Mensagens pré-preenchidas do WhatsApp (por origem do clique) | `src/content/site.ts` → `whatsappMessages` |
| Textos, serviços, categorias de peças, FAQ | `src/content/content.ts` |
| Avaliações reais do Google | `src/content/testimonials.ts` |
| Fotografias | `src/content/images.ts` |

Dados vazios aparecem como marcador **"a confirmar"** (ou o bloco é omitido) e não vão para o SEO. Nada foi inventado.

## Pendências (aguardando a empresa)

- [x] WhatsApp/telefone (38) 99958-8581, endereço e horários oficiais (`src/content/site.ts`)
- [ ] Instagram (opcional; aparece no contato e no rodapé quando preenchido)
- [ ] Logotipo oficial (hoje há uma marca tipográfica provisória em `src/components/ui/icons.tsx` → `Logo`)
- [x] Fotos da loja (hero, lubrificantes, manutenção, equipe, fachada) — originais em `fotos-originais/`; versões do site geradas com `node scripts/otimizar-fotos.mjs`
- [x] Serviços especializados confirmados (`services.items`)
- [x] Avaliações reais de clientes (`src/content/testimonials.ts`)
- [ ] Domínio definitivo

## Publicação (Vercel)

Variáveis de ambiente (veja `.env.example`):

- `NEXT_PUBLIC_SITE_URL` — domínio definitivo (canonical, Open Graph, sitemap, schema.org)
- `NEXT_PUBLIC_ALLOW_INDEXING=true` — libera a indexação; sem ela o site fica `noindex`
- `NEXT_PUBLIC_GA_ID` — Google Analytics 4 (opcional)

## Medição

Todo clique de WhatsApp dispara o evento `whatsapp_click` com `origin` (hero, header, formulario-peca, flutuante…) e `topic` (pecas, lubrificantes, manutencao, agendamento, geral), enviado ao `dataLayer` e ao `gtag` quando configurado.

## Animações

Motion (Framer Motion), sem GSAP. Componentes em `src/components/ui/scroll-effects.tsx` (títulos por palavra, parallax, revelação de imagem, abertura das seções escuras, barra de progresso, hero) e `reveal.tsx`. Tudo respeita "reduzir movimento" do sistema e fica mais contido no celular.

Para testar as animações num navegador com "reduzir movimento" ativado, rode o dev com `NEXT_PUBLIC_FORCE_MOTION=1` (só local; nunca configure na Vercel).
