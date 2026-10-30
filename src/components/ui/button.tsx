import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

export type ButtonVariant = "red" | "dark" | "outline-light" | "outline-dark" | "light";

const variants: Record<ButtonVariant, string> = {
  red: "bg-red text-paper shadow-[0_10px_30px_-12px_rgb(215_40_40/0.7)] hover:bg-red-dark hover:shadow-[0_16px_36px_-12px_rgb(215_40_40/0.85)] before:absolute before:-z-10 before:inset-y-0 before:left-0 before:w-1/3 before:-translate-x-[150%] before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:transition-transform before:duration-700 before:ease-out hover:before:translate-x-[350%]",
  dark: "bg-graphite text-paper hover:bg-graphite-3",
  light: "bg-paper text-graphite hover:bg-mist",
  "outline-light": "border border-paper/30 text-paper hover:border-paper hover:bg-paper/[0.06]",
  "outline-dark": "border border-graphite/20 text-graphite hover:border-graphite hover:bg-graphite/[0.03]",
};

export const buttonSizes = {
  md: "min-h-12 px-6 text-[0.8125rem]",
  lg: "min-h-14 px-8 text-sm",
};

export function buttonClass(variant: ButtonVariant = "red", size: keyof typeof buttonSizes = "md", className = "") {
  return `group/btn relative isolate inline-flex items-center overflow-hidden justify-center gap-3 rounded-md font-bold uppercase tracking-[0.08em] transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-[var(--ease-premium)] active:scale-[0.98] ${buttonSizes[size]} ${variants[variant]} ${className}`;
}

type ButtonProps = ComponentProps<"a"> & {
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  icon?: React.ReactNode;
  /** Mostra a seta animada à direita. */
  arrow?: boolean;
};

export function Button({ variant = "red", size = "md", icon, arrow = false, className = "", children, ...props }: ButtonProps) {
  return (
    <a {...props} className={buttonClass(variant, size, className)}>
      {icon}
      <span>{children}</span>
      {arrow && <ButtonArrow />}
    </a>
  );
}

export function ButtonArrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      strokeWidth={2}
      className="size-4 transition-transform duration-300 ease-[var(--ease-premium)] group-hover/btn:translate-x-1"
    />
  );
}
