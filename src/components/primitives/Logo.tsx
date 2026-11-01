type LogoProps = {
  /** "full" = NAYYA wordmark (open rail, mobile header, onboarding header). "mark" = N only (closed rail). */
  variant?: "full" | "mark";
  /** Use on dark backgrounds (e.g. the black onboarding header): draws the logo in the inverse text color. */
  inverse?: boolean;
};

/**
 * Nayya logo. The wordmark is the exported Figma SVG, drawn as a mask so it takes the text color
 * (dark by default, white with `inverse`). The mark is the N set in the heading style.
 */
export function Logo({ variant = "full", inverse = false }: LogoProps) {
  const color = inverse ? "text-text-inverse" : "text-text-primary";
  if (variant === "mark") {
    return (
      <span className={`text-heading-21 ${color}`} aria-label="Nayya">
        N
      </span>
    );
  }
  return (
    <span
      role="img"
      aria-label="Nayya"
      className={`inline-block h-5 w-28.25 shrink-0 bg-current ${color}`}
      style={{ maskImage: "url(/brand/nayya-logo.svg)", WebkitMaskImage: "url(/brand/nayya-logo.svg)", maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}
    />
  );
}
