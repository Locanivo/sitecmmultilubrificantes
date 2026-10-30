import Image from "next/image";
import type { SiteImage } from "@/content/images";

type Props = {
  image: SiteImage;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Mostra o selo "Imagem ilustrativa" quando a foto não é da empresa. */
  label?: boolean;
  quality?: 70 | 80;
};

/** Enquadramento: `positionMobile` vale até 767px, `position` dali para cima. */
function framing({ position, positionMobile }: SiteImage) {
  if (!position && !positionMobile) return undefined;
  return { "--pos": position ?? "center", "--pos-m": positionMobile ?? position ?? "center" } as React.CSSProperties;
}

/** Fotografia que preenche o contêiner pai (que precisa ser `relative`). */
export function Photo({ image, sizes, className = "", priority = false, label = false, quality = 80 }: Props) {
  return (
    <>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        className={`object-cover [object-position:var(--pos-m,center)] md:[object-position:var(--pos,center)] ${className}`}
        style={framing(image)}
      />
      {label && image.illustrative && (
        <span className="absolute bottom-3 right-3 rounded-sm bg-graphite/75 px-2 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-paper/80 backdrop-blur-sm">
          Imagem ilustrativa
        </span>
      )}
    </>
  );
}
