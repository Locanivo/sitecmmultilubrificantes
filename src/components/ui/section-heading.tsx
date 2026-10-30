import { Reveal } from "./reveal";
import { SplitText } from "./scroll-effects";

type Props = {
  eyebrow: string;
  title: string;
  text?: string;
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, tone = "light", id, className = "" }: Props) {
  const dark = tone === "dark";
  return (
    <div className={className}>
      <Reveal y={12}>
        <p className={`eyebrow ${dark ? "text-red-light" : "text-red"}`}>{eyebrow}</p>
      </Reveal>
      <h2 id={id} className={`display-lg mt-5 ${dark ? "text-paper" : "text-graphite"}`}>
        <SplitText text={title} delay={0.1} />
      </h2>
      {text && (
        <Reveal delay={0.3}>
          <p className={`lead mt-5 max-w-xl ${dark ? "text-paper/70" : "text-body"}`}>{text}</p>
        </Reveal>
      )}
    </div>
  );
}
