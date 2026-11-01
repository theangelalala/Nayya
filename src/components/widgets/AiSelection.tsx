type Option = {
  /** Button text. */
  label: string;
  /** Red styling for an option that cancels or removes something. */
  destructive?: boolean;
  /** Can't be picked right now. */
  disabled?: boolean;
};

type AiSelectionProps = {
  /** One option (Figma "Single Button") or two side by side ("Double Button"). More than two: use one AiSelection per option. */
  options: [Option] | [Option, Option];
  /** Label of the option the person already picked. It stays filled to show the answer. */
  selected?: string;
  /** Called with the label of the option that was clicked. */
  onSelect?: (label: string) => void;
};

/**
 * AI Selection Item. Quick-reply buttons the assistant offers inside its reply
 * ("Yes, update it" / "Not now"). The gray bar on the left ties them to the message above.
 */
export function AiSelection({ options, selected, onSelect }: AiSelectionProps) {
  return (
    <div className="flex w-full gap-3 border-l-4 border-border-subtle py-1.5 pl-6">
      {options.map((o) => {
        const isSelected = selected === o.label;
        return (
          <button
            key={o.label}
            type="button"
            disabled={o.disabled}
            aria-pressed={isSelected}
            onClick={() => onSelect?.(o.label)}
            className={
              "flex h-12 min-w-0 flex-1 items-center justify-center rounded-sm border px-6 text-label-16-bold transition-colors " +
              "focus-visible:outline-4 focus-visible:outline-border-default " +
              (isSelected
                ? "border-transparent bg-surface-inverse text-text-inverse"
                : o.destructive
                  ? "border-border-error text-text-error hover:bg-status-error-subtle"
                  : "border-border-strong text-text-primary hover:bg-action-disabled") +
              " disabled:border-border-default disabled:bg-transparent disabled:text-text-disabled disabled:cursor-not-allowed"
            }
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
