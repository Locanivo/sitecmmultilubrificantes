import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { company, contact, site } from "@/content/site";
import { Logo } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como o site da ${company.name} trata as informações de quem o visita.`,
  alternates: { canonical: "/politica-de-privacidade" },
};

const sections = [
  {
    title: "Quais dados coletamos",
    text: "Este site não possui cadastro, login ou banco de dados. O formulário de orçamento não armazena nenhuma informação: ao enviá-lo, os dados preenchidos são usados apenas para montar uma mensagem que é aberta no seu WhatsApp, e você decide se quer enviá-la.",
  },
  {
    title: "Conversas pelo WhatsApp",
    text: "Ao entrar em contato pelo WhatsApp, as informações compartilhadas na conversa (como nome, telefone e dados do veículo) são usadas somente para responder à sua solicitação, elaborar orçamentos e agendar serviços.",
  },
  {
    title: "Cookies e medição de acesso",
    text: "O site pode utilizar ferramentas de medição de audiência, como o Google Analytics, para entender de forma agregada como as páginas são usadas e melhorar a experiência. Essas ferramentas podem usar cookies. Você pode bloqueá-los nas configurações do seu navegador.",
  },
  {
    title: "Serviços de terceiros",
    text: "O mapa de localização é fornecido pelo Google Maps e as conversas acontecem no WhatsApp. Ao utilizá-los, aplicam-se também as políticas de privacidade dessas plataformas.",
  },
  {
    title: "Seus direitos",
    text: "Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode solicitar informações sobre o tratamento dos seus dados, bem como a correção ou exclusão deles, entrando em contato com nossa equipe.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <header className="bg-graphite text-paper">
        <div className="container-site flex h-20 items-center justify-between">
          <Link href="/" aria-label={`${company.name} — página inicial`}>
            <Logo />
          </Link>
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-paper/75 transition-colors hover:text-paper">
            <ArrowLeft aria-hidden="true" className="size-4" />
            Voltar ao site
          </Link>
        </div>
      </header>
      <main id="conteudo" className="section bg-paper">
        <div className="container-site max-w-3xl">
          <p className="eyebrow text-red">{company.name}</p>
          <h1 className="display-lg mt-5">Política de privacidade</h1>
          <p className="lead mt-6 text-body">
            Esta política explica, de forma simples, como o site da {company.name} trata as informações de quem o visita.
          </p>
          <div className="mt-12 space-y-10">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="display-md">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-body">{section.text}</p>
              </section>
            ))}
          </div>
          <p className="mt-14 border-t border-line pt-6 text-sm text-body">
            {contact.email ? `Dúvidas: ${contact.email}. ` : ""}Última atualização: {site.copyrightYear}.
          </p>
        </div>
      </main>
    </>
  );
}
