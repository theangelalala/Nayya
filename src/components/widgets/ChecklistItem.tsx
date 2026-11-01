"use client";

import { useId, useState } from "react";
import { Icon } from "@/components/primitives/Icon";

type ChecklistItemProps = {
  /** Task name. */
  title: string;
  /** Extra detail shown when the item is expanded. */
  description?: string;
  /** The task is complete: crossed out in green with a check (Figma "Done"). */
  done?: boolean;
  /** Start expanded (Figma "Open"). The person can still toggle it. */
  defaultOpen?: boolean;
};

/**
 * Checklist Item. One task in a checklist (e.g. the Maternity Checklist).
 * Tap the row to show or hide the detail. Stack several with no gap; each draws its own bottom rule.
 */
export function ChecklistItem({ title, description, done = false, defaultOpen = false }: ChecklistItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  return (
    <div className="w-full border-b border-border-disabled">
      <button
        type="button"
        aria-expanded={description ? open : undefined}
        aria-controls={description ? panelId : undefined}
        onClick={() => description && setOpen(!open)}
        className="flex w-full items-center gap-3 py-4 text-left focus-visible:outline-2 focus-visible:outline-border-brand"
      >
        {done && <Icon name="check-circle" className="text-text-success" />}
        <span className={`min-w-0 flex-1 text-body-16 ${done ? "text-text-success line-through" : "text-text-primary"}`}>
          {done && <span className="sr-only">Done: </span>}
          {title}
        </span>
        {description && <Icon name={open ? "caret-up-16" : "caret-down-16"} className="text-text-primary" />}
      </button>
      {description && open && (
        <p id={panelId} className={`pb-4 text-label-14 text-text-secondary ${done ? "line-through" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
