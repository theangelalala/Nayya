import { useId, type InputHTMLAttributes } from "react";
import { Icon, type IconName } from "./Icon";
import { FieldFrame, fieldBox, fieldInput, floatingLabel, type FieldStatus } from "./Field";

export type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & {
  /** Field label. Shown inside the field, and moves up once there's a value. */
  label: string;
  /** Helper text under the field. Becomes the error/warning message when status is set. */
  helperText?: string;
  /** error = red border + message. warning = yellow border + message. */
  status?: FieldStatus;
  /** Optional icon at the right edge (Figma "Icon Right"). */
  iconRight?: IconName;
};

/**
 * Text field (Figma: Input Field, Type=Text). For free text and numbers.
 * Use DateField for dates and SelectField for picking from a list.
 */
export function TextField({ label, helperText, status = "default", iconRight, disabled, id, className, placeholder, ...rest }: TextFieldProps) {
  const auto = useId();
  const fieldId = id ?? auto;
  return (
    <FieldFrame id={fieldId} helperText={helperText} status={status} disabled={disabled}>
      <div className={`${fieldBox(status, disabled)} ${className ?? ""}`}>
        <input
          id={fieldId}
          disabled={disabled}
          placeholder={placeholder ?? " "}
          aria-invalid={status === "error" || undefined}
          aria-describedby={helperText ? `${fieldId}-helper` : undefined}
          className={fieldInput}
          {...rest}
        />
        <label htmlFor={fieldId} className={floatingLabel}>
          {label}
        </label>
        {iconRight && <Icon name={iconRight} className={disabled ? "text-text-disabled" : "text-text-primary"} />}
      </div>
    </FieldFrame>
  );
}

/** Date field (Figma: Dropdown, Type=Date). Text entry as MM/DD/YYYY with the calendar icon. */
export function DateField(props: Omit<TextFieldProps, "iconRight" | "placeholder">) {
  return <TextField inputMode="numeric" placeholder="MM/DD/YYYY" iconRight="calendar" {...props} />;
}
