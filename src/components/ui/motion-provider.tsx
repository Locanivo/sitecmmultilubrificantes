"use client";

import { MotionConfig } from "motion/react";

/** Respeita "reduzir movimento" do sistema em todas as animações do site. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion={process.env.NEXT_PUBLIC_FORCE_MOTION ? "never" : "user"}>{children}</MotionConfig>;
}
