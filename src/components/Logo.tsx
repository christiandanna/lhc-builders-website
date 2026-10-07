import Image from "next/image";

/**
 * LHC Builders' own logo.
 *
 * The artwork is theirs, imported from the previous site and reproduced with
 * the white paper knocked out so the same mark sits correctly on the warm-white
 * page and on the charcoal footer. See scripts/build-brand-assets.mjs — nothing
 * about the mark has been redrawn.
 *
 * Two lockups:
 *   full     gable + LHC + BUILDERS + RESIDENTIAL CONTRACTORS
 *   compact  drops the third line, which is illegible at navbar size
 */

const VARIANTS = {
  full: { ratio: 1500 / 725, light: "lhc-logo-light.png", dark: "lhc-logo.png" },
  compact: {
    ratio: 952 / 592,
    light: "lhc-logo-compact-light.png",
    dark: "lhc-logo-compact.png",
  },
} as const;

type LogoProps = {
  /** Rendered height in pixels. Width follows the artwork's ratio. */
  height?: number;
  /** Use the warm-white version, for dark backgrounds. */
  light?: boolean;
  variant?: keyof typeof VARIANTS;
  className?: string;
  priority?: boolean;
};

export default function Logo({
  height = 40,
  light = false,
  variant = "full",
  className,
  priority = false,
}: LogoProps) {
  const spec = VARIANTS[variant];
  const width = Math.round(height * spec.ratio);

  return (
    <Image
      src={`/images/branding/${light ? spec.light : spec.dark}`}
      alt="LHC Builders"
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={`${width}px`}
      style={{ height, width: "auto" }}
    />
  );
}
