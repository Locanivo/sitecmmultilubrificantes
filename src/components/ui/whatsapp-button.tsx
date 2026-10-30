"use client";

import type { WhatsappTopic } from "@/content/site";
import { trackWhatsappClick } from "@/lib/analytics";
import { whatsappLinkProps } from "@/lib/links";
import { Button } from "./button";
import { WhatsappIcon } from "./icons";

type Props = Omit<React.ComponentProps<typeof Button>, "href" | "target" | "rel"> & {
  /** Define a mensagem pré-preenchida. */
  topic?: WhatsappTopic;
  /** Onde o botão está, para a medição de cliques (ex.: "hero", "faq"). */
  origin: string;
};

/** Botão de WhatsApp: número central em `site.ts`, mensagem conforme o assunto. */
export function WhatsappButton({ topic = "geral", origin, onClick, children, ...props }: Props) {
  return (
    <Button
      {...whatsappLinkProps(topic)}
      icon={<WhatsappIcon className="size-[1.15rem] shrink-0" />}
      onClick={(event) => {
        trackWhatsappClick(origin, topic);
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </Button>
  );
}

type LinkProps = Omit<React.ComponentProps<"a">, "href" | "target" | "rel"> & {
  topic?: WhatsappTopic;
  origin: string;
};

/** Link livre (sem estilo de botão) para o WhatsApp, com a mesma medição de cliques. */
export function WhatsappLink({ topic = "geral", origin, onClick, ...props }: LinkProps) {
  return (
    <a
      {...whatsappLinkProps(topic)}
      onClick={(event) => {
        trackWhatsappClick(origin, topic);
        onClick?.(event);
      }}
      {...props}
    />
  );
}
