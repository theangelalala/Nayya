import type { ReactNode } from "react";

export type FieldStatus = "default" | "error" | "warning";

type FieldFrameProps = {
  /** Field id, used to connect the label and helper text. */
  id: string;
  /** Helper or error message under the field (Label/14). */
  helperText?: string;
  status?: FieldStatus;
  disabled?: boolean;
  children: ReactNode;
};

/** Border color per status. Focus is handled with focus-within on the box. */
export const fieldBox = (status: FieldStatus, disabled?: boolean) =>
  [
    "relative flex h-14 w-full items-center gap-3 rounded-sm border px-3",
    disabled ? "border-border-default bg-surface-muted" : "bg-surface-default",
    !disabled && status === "default" && "border-border-default focus-within:border-2 focus-within:border-border-brand focus-within:px-2.5",
    !disabled && status === "error" && "border-2 border-border-error px-2.5",
    !disabled && status === "warning" && "border-2 border-status-warning px-2.5",
    !disabled && "focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-border-brand",
  ]
    .filter(Boolean)
    .join(" ");

/**
 * Shared frame for text fields, selects and date fields (Figma: Input Field / Dropdown structure):
 * the 58px box plus the helper text line under it.
 */
export function FieldFrame({ id, helperText, status = "default", disabled, children }: FieldFrameProps) {
  const helperColor = disabled ? "text-text-disabled" : status === "error" ? "text-text-error" : status === "warning" ? "text-text-warning" : "text-text-secondary";
  return (
    <div className="flex w-full flex-col gap-1.5">
      {children}
      {helperText && (
        <p id={`${id}-helper`} className={`pl-3 text-label-14 ${helperColor}`} role={status === "error" ? "alert" : undefined}>
          {helperText}
        </p>
      )}
    </div>
  );
}

/** Floating label: large and centered when the field is empty, small above the value otherwise. */
export const floatingLabel =
  "pointer-events-none absolute left-3 top-2 text-label-12-bold text-text-secondary transition-all peer-disabled:text-text-disabled " +
  "peer-[:placeholder-shown:not(:focus)]:top-4 peer-[:placeholder-shown:not(:focus)]:text-label-16";

export const fieldInput =
  "peer h-full min-w-0 flex-1 bg-transparent pt-4 text-label-16 text-text-primary outline-none placeholder:text-transparent focus:placeholder:text-text-secondary disabled:text-text-disabled";
