import type { ReactNode } from "react";
import { Icon } from "@/components/primitives/Icon";

/** Black circle with the AI sparkle (Figma: AI Avatar). Marks content written by the assistant. */
export function AiAvatar({ hidden = false }: { /** Keep the space but hide the circle, to align follow-up messages. */ hidden?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-inverse text-text-inverse ${hidden ? "invisible" : ""}`}
    >
      <Icon name="sparkle" size={20} />
    </span>
  );
}

type AiMessageProps = {
  /**
   * Show the AI avatar (Figma "AI Avatar"). Show it on the first message of a reply;
   * turn it off for follow-up messages in the same reply so they line up underneath.
   */
  aiAvatar?: boolean;
  /** Message content: paragraphs, BulletList, InlineTable, ActionFeedback, AiSelection… */
  children: ReactNode;
};

/**
 * AI Message Block. One assistant reply in the chat.
 * Mobile: avatar sits above the text. Tablet+: avatar sits to the left of the text.
 * Content inside is spaced 16px apart; plain paragraphs get Body/16.
 */
export function AiMessage({ aiAvatar = true, children }: AiMessageProps) {
  return (
    <div className="flex w-full flex-col items-start gap-4 tablet:flex-row">
      {aiAvatar ? <AiAvatar /> : <span className="hidden tablet:block"><AiAvatar hidden /></span>}
      <div className="flex min-w-0 flex-1 flex-col gap-4 text-body-16 text-text-primary">{children}</div>
    </div>
  );
}
