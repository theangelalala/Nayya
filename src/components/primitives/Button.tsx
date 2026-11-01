import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /**
   * primary: the one main action on a surface (max one per view).
   * secondary: supporting actions (Cancel, Back, alternatives).
   * text: low-emphasis inline actions and links.
   */
  variant?: "primary" | "secondary" | "text";
  /** Red styling for actions that remove or discard (Figma State=Destructive). Secondary and text only. */
  destructive?: boolean;
  /** Icon before the label (Figma "Icon Left"). Usually caret-left-16 for Back. */
  iconLeft?: IconName;
  /** Icon after the label (Figma "Icon Right"). Usually caret-right-16 for Next/Continue. */
  iconRight?: IconName;
};

/**
 * Button (Figma: New_Buttons). Hover, active, focus and disabled states come from the browser state,
 * not props: just pass `disabled` when the action isn't available.
 */
export function Button({ variant = "primary", destructive = false, iconLeft, iconRight, className, children, ...rest }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-sm text-body-16-bold transition-colors disabled:cursor-not-allowed " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand focus-visible:ring-2 focus-visible:ring-border-inverse";
  const variants = {
    primary:
      "gap-3 px-8 py-3 bg-action-primary text-text-inverse hover:bg-action-primary-hover active:bg-action-primary-hover " +
      "disabled:bg-action-disabled disabled:text-text-disabled",
    secondary: destructive
      ? "gap-3 px-8 py-2.75 border border-border-error text-text-error hover:bg-status-error-subtle disabled:border-border-disabled disabled:text-text-disabled disabled:bg-transparent"
      : "gap-3 px-8 py-2.75 border border-border-brand text-text-brand hover:bg-action-secondary-hover hover:border-border-brand-strong hover:text-text-brand-strong " +
        "active:bg-action-secondary-hover disabled:border-border-disabled disabled:text-text-disabled disabled:bg-transparent",
    text: destructive
      ? "gap-1 px-1 py-0.5 text-text-error hover:bg-status-error-subtle disabled:text-text-disabled"
      : "gap-1 px-1 py-0.5 text-text-brand hover:bg-surface-brand-subtle hover:text-text-brand-strong disabled:text-text-disabled disabled:bg-transparent",
  };
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className ?? ""}`} {...rest}>
      {iconLeft && <Icon name={iconLeft} />}
      {children}
      {iconRight && <Icon name={iconRight} />}
    </button>
  );
}
