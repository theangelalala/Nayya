import Image from "next/image";

type LogoProps = {
  /** "full" = NAYYA wordmark (open rail, mobile header). "mark" = N only (closed rail). */
  variant?: "full" | "mark";
};

/** Nayya logo. The wordmark is the exported Figma SVG; the mark is the N set in the heading style. */
export function Logo({ variant = "full" }: LogoProps) {
  if (variant === "mark") {
    return (
      <span className="text-heading-21 text-text-primary" aria-label="Nayya">
        N
      </span>
    );
  }
  return <Image src="/brand/nayya-logo.svg" width={113} height={20} alt="Nayya" unoptimized priority />;
}
