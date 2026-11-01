import type { ReactNode } from "react";

/**
 * User Message (Figma: User message_Mobile / _Desktop). What the person typed, right-aligned in a gray bubble.
 * The bubble hugs short messages and wraps long ones; it always leaves a gap on the left
 * (64px on mobile, 128px on tablet+) so it never spans the full column.
 */
export function UserMessage({ children }: { /** The message text. Line breaks are kept. */ children: ReactNode }) {
  return (
    <div className="flex w-full justify-end pl-user-message-offset">
      <p className="rounded-md bg-surface-muted px-4 py-3 text-right text-body-16 whitespace-pre-line text-text-primary">{children}</p>
    </div>
  );
}
