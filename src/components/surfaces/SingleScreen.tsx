import type { ReactNode } from "react";

type SingleScreenProps = {
  /** Page name in the brand header bar, e.g. "Settings" or "Benefits Hub". */
  title: string;
  /** Optional controls on the right of the header bar (a text Button, a filter…). */
  headerActions?: ReactNode;
  /** Page content. Fills the whole content area; constrain it yourself if it shouldn't stretch. */
  children: ReactNode;
};

/**
 * Single Screen surface (Figma: Surfaces_Q1 → Single Screen). A standalone page such as Settings
 * or the Benefits Hub, with a dark brand header bar. Use inside AppShell.
 * Fills the content area next to the rail (fluid); on mobile it sits under the app header.
 */
export function SingleScreen({ title, headerActions, children }: SingleScreenProps) {
  return (
    <div className="flex min-h-0 flex-1 flex-col bg-surface-default">
      <header className="flex h-18 shrink-0 items-center gap-4 border-b border-border-default bg-surface-brand px-page-margin-mobile text-text-inverse tablet:px-8">
        <h1 className="min-w-0 flex-1 truncate text-heading-21">{title}</h1>
        {headerActions}
      </header>
      <main className="flex-1 px-page-margin-mobile py-8 tablet:px-8">{children}</main>
    </div>
  );
}
