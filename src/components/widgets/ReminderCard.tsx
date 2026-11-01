import { Icon, type IconName } from "@/components/primitives/Icon";

export type Reminder = {
  /** Short label, e.g. "Open Enrollment". */
  title: string;
  /** One-line description. */
  description: string;
  /** Icon shown in the tinted square on the right. */
  icon: IconName;
  /** Optional due-date pill, e.g. "Due: 09/30/2025". */
  due?: string;
  /** Optional progress, e.g. { done: 2, total: 10 } → bar plus "2 of 10 tasks". */
  progress?: { done: number; total: number };
  /** Where the card goes when clicked. */
  href?: string;
};

/**
 * Reminder Card (Figma: Widgets → Reminder Card).
 * Used in the Reminders section of the left rail and the mobile card carousel.
 */
export function ReminderCard({ title, description, icon, due, progress, href = "#" }: Reminder) {
  const pct = progress ? Math.round((progress.done / progress.total) * 100) : 0;
  return (
    <a
      href={href}
      className="flex w-full gap-3 rounded-sm border border-border-default bg-surface-page p-4 text-text-primary hover:border-border-strong focus-visible:outline-2 focus-visible:outline-border-focus"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-label-12-bold">{title}</p>
          <p className="text-body-14">{description}</p>
        </div>
        {due && (
          <span className="self-start rounded-full bg-surface-brand px-3 py-1 text-label-12 text-text-inverse">{due}</span>
        )}
        {progress && (
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 flex-1 rounded-full bg-surface-muted"
              role="progressbar"
              aria-valuenow={progress.done}
              aria-valuemin={0}
              aria-valuemax={progress.total}
              aria-label={`${title} progress`}
            >
              <div className="h-full rounded-full bg-surface-brand" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-label-12">
              {progress.done} of {progress.total} tasks
            </span>
          </div>
        )}
      </div>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-surface-brand-subtle">
        <Icon name={icon} />
      </div>
    </a>
  );
}
