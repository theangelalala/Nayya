import type { CSSProperties } from "react";

/** Titan icon names. Each maps to an SVG exported from the Figma Icon set, in /public/icons. */
export const iconNames = [
  "alarm",
  "arrow-elbow",
  "arrow-right",
  "bell",
  "calendar",
  "caret-down",
  "caret-down-16",
  "caret-left",
  "caret-left-16",
  "caret-right-16",
  "caret-up-16",
  "chat-plus",
  "check-16",
  "clock",
  "launchpad",
  "list-checks",
  "menu",
  "settings",
  "sidebar-toggle",
  "sign-out",
  "sparkle",
  "caret-up",
  "check",
  "check-circle",
  "check-square-offset",
  "info",
  "warning-circle",
  "x",
  "x-16",
  "x-circle",
] as const;
export type IconName = (typeof iconNames)[number];

/** Natural size of each exported SVG, so icons are never stretched. */
const natural: Record<IconName, [number, number]> = {
  alarm: [24, 24],
  "arrow-elbow": [16, 16],
  "arrow-right": [25, 25],
  bell: [24, 24],
  calendar: [24, 24],
  "caret-down": [26, 14],
  "caret-down-16": [16, 16],
  "caret-left": [24, 24],
  "caret-left-16": [16, 16],
  "caret-right-16": [16, 16],
  "caret-up-16": [16, 16],
  "chat-plus": [24, 24],
  "check-16": [16, 16],
  clock: [24, 24],
  launchpad: [24, 24],
  "list-checks": [20, 20],
  menu: [24, 24],
  settings: [24, 24],
  "sidebar-toggle": [40, 40],
  "sign-out": [24, 24],
  sparkle: [24, 24],
  "caret-up": [24, 24],
  "check": [24, 24],
  "check-circle": [24, 24],
  "check-square-offset": [24, 24],
  "info": [24, 24],
  "warning-circle": [24, 24],
  "x": [24, 24],
  "x-16": [16, 16],
  "x-circle": [24, 24],
};

const rotation = { 0: "", 90: "rotate-90", 180: "rotate-180", 270: "-rotate-90" } as const;

type IconProps = {
  /** Which icon to show. */
  name: IconName;
  /** Rotate the icon in 90° steps (e.g. caret-down → caret-up with 180). */
  rotate?: 0 | 90 | 180 | 270;
  /** Draw at a different square size in px (e.g. 20 for the AI avatar sparkle). Defaults to the icon's natural size. */
  size?: number;
  /** Layout classes, or a text color token to tint it (e.g. "text-text-brand"). */
  className?: string;
};

/**
 * Titan icon. Takes its color from the surrounding text color (currentColor),
 * so it follows the component's state: white on a primary button, red when destructive, gray when disabled.
 * Decorative by default: put the accessible name on the button or link that wraps it.
 */
export function Icon({ name, rotate = 0, size, className }: IconProps) {
  const [w, h] = size ? [size, size] : natural[name];
  const style: CSSProperties = {
    width: w,
    height: h,
    maskImage: `url(/icons/${name}.svg)`,
    WebkitMaskImage: `url(/icons/${name}.svg)`,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
  };
  return <span aria-hidden className={`inline-block shrink-0 bg-current ${rotation[rotate]} ${className ?? ""}`} style={style} />;
}
