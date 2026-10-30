"use client";

import { motion } from "motion/react";

export const ease = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Deslocamento vertical inicial em px. */
  y?: number;
  /** Desfoque inicial — reservar para poucos elementos por tela. */
  blur?: boolean;
  /** Leve ampliação inicial (cards). */
  scale?: boolean;
  as?: "div" | "li" | "article" | "figure";
};

/** Fade-in com deslocamento discreto ao entrar na viewport. */
export function Reveal({ children, className, delay = 0, y = 28, blur = false, scale = false, as = "div" }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y, ...(blur && { filter: "blur(8px)" }), ...(scale && { scale: 0.96 }) }}
      whileInView={{ opacity: 1, y: 0, ...(blur && { filter: "blur(0px)" }), ...(scale && { scale: 1 }) }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </Component>
  );
}
