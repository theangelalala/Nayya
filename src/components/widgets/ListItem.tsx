import type { ButtonHTMLAttributes } from "react";
import { Icon } from "@/components/primitives/Icon";

type ListItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Row text. Long text is cut off with "…". */
  label: string;
  /** Shows a check on the right (Figma "Select"). */
  selected?: boolean;
};

/**
 * List Item. One choosable row in a dropdown menu or picker list (e.g. the options under a SelectField).
 * Hover and keyboard focus get the brand outline; selected rows get a check.
 * Put several inside an element with role="listbox" or a menu.
 */
export function ListItem({ label, selected = false, className, ...rest }: ListItemProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={
        "flex h-12 w-full items-center rounded-sm border-2 border-transparent bg-surface-default px-6 text-left text-label-16 text-text-primary " +
        "hover:border-border-brand hover:bg-surface-brand-subtle focus-visible:border-border-brand focus-visible:bg-surface-brand-subtle focus-visible:outline-none " +
        (className ?? "")
      }
      {...rest}
    >
      <span className="flex min-w-0 flex-1 items-center gap-3 px-3">
        <span className="min-w-0 flex-1 truncate">{label}</span>
        {selected && <Icon name="check" />}
      </span>
    </button>
  );
}
