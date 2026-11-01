"use client";

import { useState } from "react";
import { Icon, type IconName } from "@/components/primitives/Icon";
import { Logo } from "@/components/primitives/Logo";
import { ReminderCard, type Reminder } from "@/components/widgets/ReminderCard";

type NavItem = { label: string; shortLabel?: string; icon: IconName; href: string };

export const mainNav: NavItem[] = [
  { label: "New Chat", icon: "chat-plus", href: "/chat" },
  { label: "Chat History", shortLabel: "History", icon: "clock", href: "#history" },
  { label: "Reminders", icon: "bell", href: "#reminders" },
  { label: "Benefits Hub", icon: "launchpad", href: "#benefits" },
];
export const footerNav: NavItem[] = [
  { label: "Settings", icon: "settings", href: "#settings" },
  { label: "Log out", icon: "sign-out", href: "#logout" },
];

type SidebarProps = {
  /** Open = 364px with labels and reminder cards. Closed = 90px icon rail. */
  open: boolean;
  /** Called when the user opens or closes the rail. */
  onToggle: () => void;
  /** Reminder cards shown under "Reminders" when open. */
  reminders?: Reminder[];
  /** Past chats shown under "Chat History" when open. */
  history?: string[];
  /** "rail" = tablet+ left rail. "drawer" = full-width mobile menu content (always open, no rail toggle). */
  mode?: "rail" | "drawer";
};

/**
 * Left rail (Figma: Sidebar - Open / Sidebar - Closed).
 * Tablet and up. On mobile the same content is shown in a drawer from the header menu.
 */
export function Sidebar({ open, onToggle, reminders = [], history = [], mode = "rail" }: SidebarProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [showReminders, setShowReminders] = useState(true);

  if (!open) {
    return (
      <nav aria-label="Main" className="flex h-full w-rail-closed shrink-0 flex-col items-center gap-4 bg-surface-subtle py-6">
        <button type="button" onClick={onToggle} aria-label="Open menu" className="flex size-10 items-center justify-center rounded-sm hover:bg-surface-muted">
          <Logo variant="mark" />
        </button>
        <div className="h-px w-8 bg-surface-inverse" />
        {mainNav.map((item) => (
          <a key={item.label} href={item.href} className="flex w-full flex-col items-center gap-1 py-1 text-label-12 text-text-primary hover:bg-surface-muted">
            <span className="flex size-10 items-center justify-center">
              <Icon name={item.icon} />
            </span>
            {item.shortLabel ?? item.label}
          </a>
        ))}
        <div className="flex-1" />
        {footerNav.map((item) => (
          <a key={item.label} href={item.href} aria-label={item.label} className="flex size-10 items-center justify-center rounded-md hover:bg-surface-muted">
            <Icon name={item.icon} />
          </a>
        ))}
      </nav>
    );
  }

  const row = "flex w-full items-center gap-3 rounded-sm text-body-16 text-text-primary hover:bg-surface-muted";
  return (
    <nav aria-label="Main" className={`flex h-full flex-col gap-4 overflow-y-auto bg-surface-subtle py-6 ${mode === "rail" ? "w-rail-open shrink-0" : "w-full"}`}>
      {mode === "rail" && (
        <div className="flex items-start justify-between px-4">
          <div className="flex flex-col gap-4">
            <div className="flex h-10 items-center">
              <Logo />
            </div>
            <div className="h-px w-10 bg-surface-inverse" />
          </div>
          <button type="button" onClick={onToggle} aria-label="Close menu" className="rounded-sm hover:bg-surface-muted">
            <Icon name="sidebar-toggle" />
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4 px-4">
        <a href="/chat" className={row}>
          <span className="flex size-10 items-center justify-center"><Icon name="chat-plus" /></span>
          New Chat
        </a>
        <button type="button" className={row} aria-expanded={showHistory} onClick={() => setShowHistory((v) => !v)}>
          <span className="flex size-10 items-center justify-center"><Icon name="clock" /></span>
          Chat History
          <Icon name="caret-down" rotate={showHistory ? 180 : 0} />
        </button>
        {showHistory && (
          <ul className="flex flex-col pl-12">
            {history.length ? history.map((h) => (
              <li key={h}><a href="#" className="block py-1.5 text-body-14 text-text-primary hover:text-text-brand">{h}</a></li>
            )) : <li className="py-1.5 text-body-14 text-text-secondary">No past chats yet</li>}
          </ul>
        )}
        <button type="button" className={row} aria-expanded={showReminders} onClick={() => setShowReminders((v) => !v)}>
          <span className="flex size-10 items-center justify-center"><Icon name="bell" /></span>
          Reminders
          <Icon name="caret-down" rotate={showReminders ? 180 : 0} />
        </button>
        {showReminders && (
          <div className="flex flex-col gap-4">
            {reminders.map((r) => <ReminderCard key={r.title} {...r} />)}
          </div>
        )}
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-4 px-4">
        {[mainNav[3], ...footerNav].map((item) => (
          <a key={item.label} href={item.href} className={row}>
            <span className="flex size-10 items-center justify-center"><Icon name={item.icon} /></span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
