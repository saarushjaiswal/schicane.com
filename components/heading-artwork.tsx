import type { CSSProperties } from "react";
import artwork from "@/lib/heading-artwork.json";
export function HeadingArtwork({ text }: { text: string }) {
  const entry = artwork[text as keyof typeof artwork];
  if (!entry) return <>{text}</>;
  return (
    <span
      className="heading-art"
      style={
        {
          "--art-width": `${entry.width / 100}em`,
          "--art-compact-width": `${entry.compact.width / 100}em`,
        } as CSSProperties
      }
    >
      <span className="heading-readable">{text} </span>
      <picture aria-hidden="true">
        <source media="(max-width: 700px)" srcSet={entry.compact.src} />
        <img src={entry.src} alt="" width={entry.width} height={entry.height} />
      </picture>
    </span>
  );
}
