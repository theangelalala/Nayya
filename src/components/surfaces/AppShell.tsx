"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/primitives/Icon";
import { Logo } from "@/components/primitives/Logo";
import { Sidebar } from "@/components/surfaces/Sidebar";
import type { Reminder } from "@/components/widgets/ReminderCard";

type AppShellProps = {
  children: ReactNode;
  /** Reminder cards for the rail / mobile menu. */
  reminders?: Reminder[];
  /** Past chats for the Chat History list. */
  history?: string[];
  /** Start with the left rail open (tablet+). */
  defaultOpen?: boolean;
};

/**
 * App shell used by every surface except Onboarding (see docs/breakpoints.md).
 * Mobile: 72px top header + full-screen menu. Tablet+: left rail (90 closed / 364 open) + content.
 */
export function AppShell({ children, reminders, history, defaultOpen = false }: AppShellProps) {
  const [railOpen, setRailOpen] = useState(defaultOpen);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-dvh w-full bg-surface-page">
      {/* Tablet+ left rail */}
      <div className="sticky top-0 hidden h-dvh tablet:block">
        <Sidebar open={railOpen} onToggle={() => setRailOpen((v) => !v)} reminders={reminders} history={history} />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-10 flex h-header-mobile items-center justify-center bg-surface-page px-page-margin-mobile tablet:hidden">
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open menu" className="absolute left-6">
            <Icon name="menu" />
          </button>
          <Logo />
        </header>

        {children}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-20 flex flex-col bg-surface-subtle tablet:hidden">
          <div className="relative flex h-header-mobile shrink-0 items-center justify-center bg-surface-page">
            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="absolute left-6">
              <Icon name="caret-left" />
            </button>
            <Logo />
          </div>
          <div className="min-h-0 flex-1">
            <Sidebar open mode="drawer" onToggle={() => setMenuOpen(false)} reminders={reminders} history={history} />
          </div>
        </div>
      )}
    </div>
  );
}
