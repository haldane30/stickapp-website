/**
 * PhoneMockup — CSS-only iPhone device frame for app screenshots.
 *
 * Three sizes:
 *   - "sm"  → inline in MDX content (game guides, blog posts). Float-right on desktop.
 *   - "md"  → homepage product showcase, centered.
 *   - "lg"  → hero-level, full attention.
 *
 * The frame is pure CSS — a rounded rect with a notch, subtle shadow, and
 * the screenshot fills edge-to-edge inside it. No photorealistic bezels.
 *
 * Usage in MDX:
 *   <PhoneMockup src="/screenshots/wolf-config.png" alt="Wolf game configuration" />
 *   <PhoneMockup src="/screenshots/wolf-good-pick.png" alt="Wolf result" caption="Every hole tells a story." />
 *
 * Usage on homepage (React):
 *   <PhoneMockup src="/screenshots/narrative-swept-the-board.png" alt="..." size="md" />
 */

import Image from "next/image";

interface PhoneMockupProps {
  src: string;
  alt: string;
  caption?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
}

const sizeConfig = {
  sm: { width: 240, frameClass: "w-[240px]" },
  md: { width: 300, frameClass: "w-[280px] md:w-[300px]" },
  lg: { width: 360, frameClass: "w-[300px] md:w-[360px]" },
} as const;

export function PhoneMockup({
  src,
  alt,
  caption,
  size = "sm",
  className = "",
  priority = false,
}: PhoneMockupProps) {
  const config = sizeConfig[size];

  return (
    <figure className={`phone-mockup phone-mockup-${size} ${className}`}>
      <div className={`${config.frameClass} mx-auto`}>
        {/* Device frame */}
        <div
          className="relative rounded-[2.5rem] overflow-hidden border-[6px] border-[#1a1a1a] shadow-2xl"
          style={{
            aspectRatio: "390 / 844",
            background: "#1a1a1a",
          }}
        >
          {/* Notch / Dynamic Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[90px] h-[22px] bg-[#1a1a1a] rounded-b-2xl" />

          {/* Screenshot */}
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes={`${config.width}px`}
            priority={priority}
          />
        </div>
      </div>

      {/* Optional caption */}
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-[var(--color-text-secondary)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
