"use client";

import { motion, useReducedMotion as useSystemReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Fragment, useRef, useSyncExternalStore } from "react";
import { ease } from "./reveal";

/* Efeitos de rolagem do site. Todos se desligam com "reduzir movimento"
   e ficam mais contidos no celular. Só animam transform/opacity/clip-path. */

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Só para testes locais: NEXT_PUBLIC_FORCE_MOTION=1 ignora "reduzir movimento". */
const useReducedMotion = () => {
  const reduce = useSystemReducedMotion();
  return process.env.NEXT_PUBLIC_FORCE_MOTION ? false : reduce;
};

const noop = () => () => {};

/** Verdadeiro só depois da hidratação: estilos ligados à rolagem não podem divergir do HTML do servidor. */
function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false);
}

/** Amplitude do movimento: zero com "reduzir movimento", metade no celular. */
function useMotionRange(range: number) {
  const reduce = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  if (reduce) return 0;
  return mobile ? range * 0.5 : range;
}

type Segment = { text: string; className?: string };

/**
 * Título que surge palavra por palavra, por trás de uma máscara.
 * Use dentro do h1/h2 — o texto continua legível para leitores de tela.
 */
export function SplitText({
  text,
  segments,
  delay = 0,
  stagger = 0.055,
  onLoad = false,
}: {
  text?: string;
  segments?: Segment[];
  delay?: number;
  stagger?: number;
  /** Anima ao carregar a página (hero) em vez de ao entrar na viewport. */
  onLoad?: boolean;
}) {
  const words = (segments ?? [{ text: text ?? "" }]).flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className })),
  );
  const trigger = onLoad ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <motion.span
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {words.map(({ word, className }, index) => (
        <Fragment key={index}>
          {/* Folga vertical para acentos e cedilha não serem cortados pela máscara */}
          <span className="-mb-[0.12em] -mt-[0.14em] inline-block overflow-hidden pb-[0.12em] pt-[0.14em] align-top">
            <motion.span
              className={`inline-block will-change-transform ${className ?? ""}`}
              variants={{
                hidden: { y: "108%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.span>
  );
}

/**
 * Camada com parallax vertical, para fotografias de fundo.
 * O pai precisa ser `relative overflow-hidden`; a camada sobra `range` px
 * acima e abaixo para nunca mostrar bordas.
 */
export function Parallax({ children, range = 60, className = "" }: { children: React.ReactNode; range?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const amount = useMotionRange(range);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const hydrated = useHydrated();

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`}>
      <motion.div style={{ top: -range, bottom: -range, ...(hydrated && { y }) }} className="absolute inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}

/** Revela a imagem como uma cortina de baixo para cima, com zoom saindo. */
export function ImageReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  // Com "reduzir movimento", a revelação é instantânea (sem trocar o markup, para não quebrar a hidratação).
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={reduce ? { duration: 0 } : { duration: 1.2, ease, delay }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={reduce ? { duration: 0 } : { duration: 1.6, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * Seção escura que "abre" ao entrar: começa recortada com cantos
 * arredondados e se expande até a largura total conforme a rolagem.
 */
export function CurtainSection({ className = "", children, ...props }: React.ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);
  const inset = useMotionRange(5);
  const hydrated = useHydrated();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 0.25"] });
  const clipPath = useTransform(scrollYProgress, (value) => {
    const remaining = Math.max(0, 1 - value) * inset;
    return `inset(0% ${remaining}% 0% ${remaining}% round ${remaining * 6}px)`;
  });

  return (
    <motion.section ref={ref} style={inset && hydrated ? { clipPath } : undefined} className={className} {...(props as object)}>
      {children}
    </motion.section>
  );
}

/** Barra vermelha de progresso de leitura, no topo do header. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div aria-hidden="true" style={{ scaleX }} className="absolute inset-x-0 top-0 h-0.5 origin-left bg-red" />;
}

/** Fundo do hero: zoom de entrada cinematográfico + parallax lento. */
export function HeroBackdrop({ children }: { children: React.ReactNode }) {
  const amount = useMotionRange(180);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, amount]);
  const hydrated = useHydrated();
  return (
    <motion.div style={hydrated ? { y } : undefined} className="absolute inset-0 -z-10">
      <motion.div className="absolute inset-0" initial={{ scale: 1.14 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Conteúdo do hero: sobe e esmaece levemente ao rolar, dando profundidade. */
export function HeroContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const amount = useMotionRange(-90);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, amount]);
  // No celular o conteúdo é mais alto que a tela: sem esmaecer, para os botões continuarem nítidos.
  const mobile = useMediaQuery("(max-width: 767px)");
  const opacity = useTransform(scrollY, [0, 600], [1, reduce || mobile ? 1 : 0.15]);
  const hydrated = useHydrated();
  return (
    <motion.div style={hydrated ? { y, opacity } : undefined} className={className}>
      {children}
    </motion.div>
  );
}

/** Linhas geométricas do hero, desenhadas na entrada. */
export function HeroLines() {
  const lines = [
    { d: "M420 0 L180 800", className: "text-paper/10", width: 1 },
    { d: "M560 0 L320 800", className: "text-paper/10", width: 1 },
    { d: "M600 120 L470 800", className: "text-red/55", width: 2 },
  ];
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-full w-1/2 lg:block" viewBox="0 0 600 800" preserveAspectRatio="none" fill="none">
      {lines.map((line, index) => (
        <motion.path
          key={line.d}
          d={line.d}
          stroke="currentColor"
          strokeWidth={line.width}
          className={line.className}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.8, ease, delay: 0.5 + index * 0.2 }}
        />
      ))}
    </svg>
  );
}
