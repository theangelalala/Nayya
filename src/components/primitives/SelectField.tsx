import { useId, type SelectHTMLAttributes } from "react";
import { Icon } from "./Icon";
import { FieldFrame, fieldBox, type FieldStatus } from "./Field";

export type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & {
  /** Field label. Large while nothing is chosen, small above the chosen value. */
  label: string;
  /** The choices. */
  options: { value: string; label: string }[];
  /** Helper text under the field. Becomes the error/warning message when status is set. */
  helperText?: string;
  status?: FieldStatus;
};

/**
 * Select field (Figma: Dropdown, Type=Text with Icon Right). For picking one option from a list.
 * Uses the native select menu so it works well on phones and with screen readers.
 */
export function SelectField({ label, options, helperText, status = "default", disabled, id, value, defaultValue, className, ...rest }: SelectFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  const hasValue = (value ?? defaultValue ?? "") !== "";
  return (
    <FieldFrame id={fieldId} helperText={helperText} status={status} disabled={disabled}>
      <div className={`${fieldBox(status, disabled)} ${className ?? ""}`}>
        <select
          id={fieldId}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue ?? (value === undefined ? "" : undefined)}
          aria-invalid={status === "error" || undefined}
          aria-describedby={helperText ? `${fieldId}-helper` : undefined}
          className={`peer h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent text-label-16 outline-none disabled:cursor-not-allowed disabled:text-text-disabled ${
            hasValue ? "pt-4 text-text-primary" : "text-transparent"
          }`}
          {...rest}
        >
          <option value="" disabled hidden>
            {label}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value} className="text-text-primary">
              {o.label}
            </option>
          ))}
        </select>
        <label
          htmlFor={fieldId}
          className={`pointer-events-none absolute left-3 transition-all ${
            hasValue ? "top-2 text-label-12-bold text-text-secondary" : "top-4 text-label-16 text-text-primary"
          } ${disabled ? "text-text-disabled" : ""}`}
        >
          {label}
        </label>
        <Icon name="caret-down-16" className={`pointer-events-none ${disabled ? "text-text-disabled" : "text-text-primary"}`} />
      </div>
    </FieldFrame>
  );
}
