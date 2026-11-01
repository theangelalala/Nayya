import { Icon } from "@/components/primitives/Icon";

type FlowHeaderProps = {
  /** Name of the guided experience, e.g. "Open Enrollment Guide". */
  title: string;
  /**
   * Shortlist pill on the right (Figma Type=Default). Shows the running monthly cost and opens the shortlist.
   * Leave out for flows without a shortlist (Type=Without Shortlist).
   */
  shortlist?: { total: string; onClick?: () => void };
  /** Called when the person clicks Exit. Usually opens a "You're about to exit" Modal first. */
  onExit?: () => void;
};

/**
 * Flow Header (Figma: Tab Comp). The dark brand bar across the top of a guided experience
 * such as Open Enrollment, with the flow name, an optional shortlist pill, and Exit.
 */
export function FlowHeader({ title, shortlist, onExit }: FlowHeaderProps) {
  return (
    <header className="flex h-18 w-full items-center gap-4 border-b border-border-default bg-surface-brand px-page-margin-mobile py-2 text-text-inverse tablet:px-8">
      <h1 className="min-w-0 flex-1 truncate text-heading-21">{title}</h1>
      {shortlist && (
        <button
          type="button"
          onClick={shortlist.onClick}
          className="flex h-11 items-center gap-2 rounded-full bg-surface-page px-6 text-label-16 text-text-primary hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-inverse"
        >
          <Icon name="check-square-offset" />
          {shortlist.total}
          <span aria-hidden className="hidden text-text-disabled tablet:inline">•</span>
          <span className="hidden tablet:inline">My Shortlist</span>
        </button>
      )}
      <button
        type="button"
        onClick={onExit}
        className="flex items-center gap-1 rounded-sm px-1 py-0.5 text-label-16 hover:bg-surface-overlay focus-visible:outline-2 focus-visible:outline-border-inverse"
      >
        <Icon name="x" size={20} />
        Exit
      </button>
    </header>
  );
}
