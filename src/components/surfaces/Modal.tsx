"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/primitives/Icon";

type ModalProps = {
  /** Whether the modal is showing. */
  open: boolean;
  /** Called when the person closes it (Esc, the × button, or clicking the dimmed background). */
  onClose: () => void;
  /** Heading (Heading/28). */
  title: string;
  /** Body: a short paragraph, and optionally an image or other content below it. */
  children: ReactNode;
  /**
   * Buttons, right-aligned at the bottom. Put the secondary (Cancel / No, stay) first and
   * the one primary action last.
   */
  actions?: ReactNode;
  /**
   * small: a short confirmation (Figma "Modal – Small"), 500px wide.
   * large: explanation with an image (Figma "Modal – Large"), 736px wide.
   */
  size?: "small" | "large";
};

/**
 * Modal. A dialog over a dimmed page for confirmations and short explanations.
 * Uses the browser's native dialog, so focus is trapped and Esc closes it.
 * Mobile: a bottom sheet, full width, anchored to the bottom, buttons split the width. Tablet+: centered card.
 */
export function Modal({ open, onClose, title, children, actions, size = "small" }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      className="m-0 h-full max-h-none w-full max-w-none items-end justify-center bg-transparent backdrop:bg-surface-overlay open:flex tablet:items-center tablet:p-4"
    >
      <div className={`flex max-h-full w-full flex-col gap-6 overflow-y-auto rounded-t-lg bg-surface-page p-8 text-text-primary shadow-elevation-3 tablet:rounded-md tablet:p-6 ${size === "large" ? "tablet:max-w-modal" : "tablet:max-w-125"}`}>
        <div className="flex items-start gap-3">
          <h2 id="modal-title" className="min-w-0 flex-1 text-heading-28">{title}</h2>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-sm p-1 hover:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-border-brand">
            <Icon name="x" />
          </button>
        </div>
        <div className="flex flex-col gap-6 text-body-16">{children}</div>
        {actions && <div className="flex items-center gap-6 pt-6 *:flex-1 *:px-4 tablet:justify-end tablet:*:flex-none tablet:*:px-8">{actions}</div>}
      </div>
    </dialog>
  );
}
