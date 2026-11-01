import { useId, type InputHTMLAttributes } from "react";
import { Icon } from "./Icon";

type ChoiceProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Visible label (Label/16). */
  label: string;
  /**
   * card: bordered row, the whole row is clickable (Figma: Selector Input). Use for answers in forms and wizards.
   * plain: just the control and label, no border. Use in dense lists and settings.
   */
  appearance?: "card" | "plain";
};

const row = (appearance: "card" | "plain") =>
  appearance === "card"
    ? "flex w-full cursor-pointer items-center gap-3 rounded-sm border border-border-default px-4 py-3 text-label-16 text-text-primary " +
      "hover:border-border-brand has-[:checked]:border-border-brand has-[:focus-visible]:border-border-brand " +
      "has-[:disabled]:cursor-not-allowed has-[:disabled]:border-border-default has-[:disabled]:text-text-disabled"
    : "inline-flex cursor-pointer items-center gap-3 text-label-16 text-text-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:text-text-disabled";

/** Checkbox (Figma: Checkbox / Selectors, 26px). For choosing any number of options. */
export function Checkbox({ label, appearance = "card", id, ...rest }: ChoiceProps) {
  const auto = useId();
  const cid = id ?? auto;
  return (
    <label htmlFor={cid} className={row(appearance)}>
      <span className="relative flex size-6.5 shrink-0 items-center justify-center">
        <input
          id={cid}
          type="checkbox"
          className="peer absolute inset-0 cursor-pointer appearance-none rounded-sm border-2 border-border-default bg-surface-page checked:border-border-brand hover:border-border-brand disabled:cursor-not-allowed disabled:border-border-default disabled:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
          {...rest}
        />
        <span className="pointer-events-none relative hidden text-text-brand peer-checked:flex peer-disabled:text-text-disabled">
          <Icon name="check-16" />
        </span>
      </span>
      {label}
    </label>
  );
}

/** Radio (Figma: Radio buttons, 26px). For choosing exactly one option; give options the same `name`. */
export function Radio({ label, appearance = "plain", id, ...rest }: ChoiceProps) {
  const auto = useId();
  const rid = id ?? auto;
  return (
    <label htmlFor={rid} className={row(appearance)}>
      <span className="relative flex size-6.5 shrink-0 items-center justify-center">
        <input
          id={rid}
          type="radio"
          className="peer absolute inset-0 cursor-pointer appearance-none rounded-full border-2 border-border-default bg-surface-subtle checked:border-border-brand hover:border-border-brand disabled:cursor-not-allowed disabled:border-border-default disabled:bg-surface-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
          {...rest}
        />
        <span className="pointer-events-none relative hidden size-3.5 rounded-full bg-surface-brand peer-checked:block peer-disabled:bg-surface-subtle" />
      </span>
      {label}
    </label>
  );
}

/** Toggle (Figma: Toggle, 46×26). For on/off settings that take effect immediately. */
export function Toggle({ label, id, ...rest }: Omit<ChoiceProps, "appearance">) {
  const auto = useId();
  const tid = id ?? auto;
  return (
    <label htmlFor={tid} className="inline-flex cursor-pointer items-center gap-3 text-label-16 text-text-primary has-[:disabled]:cursor-not-allowed has-[:disabled]:text-text-disabled">
      <span className="relative inline-flex h-6.5 w-11.5 shrink-0 items-center">
        <input
          id={tid}
          type="checkbox"
          role="switch"
          className="peer absolute inset-0 cursor-pointer appearance-none rounded-full bg-surface-muted checked:bg-surface-brand disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-brand"
          {...rest}
        />
        <span className="pointer-events-none absolute left-1 size-4.5 rounded-full border-2 border-border-inverse bg-surface-page transition-transform peer-checked:translate-x-5 peer-disabled:opacity-50" />
      </span>
      {label}
    </label>
  );
}
