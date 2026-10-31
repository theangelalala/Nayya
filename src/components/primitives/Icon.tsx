import Image from "next/image";

/** Titan icon names. Each maps to an SVG exported from the Figma Icon set, in /public/icons. */
export const iconNames = [
  "alarm",
  "arrow-elbow",
  "arrow-right",
  "bell",
  "caret-down",
  "caret-left",
  "chat-plus",
  "clock",
  "launchpad",
  "list-checks",
  "menu",
  "settings",
  "sidebar-toggle",
  "sign-out",
  "sparkle",
] as const;
export type IconName = (typeof iconNames)[number];

/** Natural size of each exported SVG, so icons are never stretched. */
const natural: Record<IconName, [number, number]> = {
  alarm: [24, 24],
  "arrow-elbow": [16, 16],
  "arrow-right": [25, 25],
  bell: [24, 24],
  "caret-down": [26, 14],
  "caret-left": [24, 24],
  "chat-plus": [24, 24],
  clock: [24, 24],
  launchpad: [24, 24],
  "list-checks": [20, 20],
  menu: [24, 24],
  settings: [24, 24],
  "sidebar-toggle": [40, 40],
  "sign-out": [24, 24],
  sparkle: [24, 24],
};

const rotation = { 0: "", 90: "rotate-90", 180: "rotate-180", 270: "-rotate-90" } as const;

type IconProps = {
  /** Which icon to show. */
  name: IconName;
  /** Rotate the icon in 90° steps (e.g. caret-down → caret-up with 180). */
  rotate?: 0 | 90 | 180 | 270;
  /** Extra classes for layout only (margins, flex). Never use it to recolor. */
  className?: string;
};

/**
 * Titan icon. Decorative by default (hidden from screen readers):
 * put the accessible name on the button or link that wraps it.
 */
export function Icon({ name, rotate = 0, className }: IconProps) {
  const [w, h] = natural[name];
  return (
    <Image
      src={`/icons/${name}.svg`}
      width={w}
      height={h}
      alt=""
      aria-hidden
      unoptimized
      className={`shrink-0 ${rotation[rotate]} ${className ?? ""}`}
    />
  );
}
