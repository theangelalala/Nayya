"use client";

import { ChatInput } from "@/components/widgets/ChatInput";
import { PromptSuggestions } from "@/components/widgets/PromptSuggestions";
import { ReminderCard, type Reminder } from "@/components/widgets/ReminderCard";

type DefaultChatProps = {
  /** User's first name for the greeting. */
  name: string;
  /** Starter prompts under the input. */
  suggestions: string[];
  /** Reminder cards for the mobile carousel (on tablet+ they live in the left rail). */
  reminders?: Reminder[];
  /** Called when the user sends a message or picks a suggestion. */
  onSend?: (message: string) => void;
};

/**
 * Default Chat surface (Figma: Surfaces_Q1 → Default Chat).
 * Mobile: reminder carousel, left-aligned intro, input pinned to the bottom.
 * Tablet+: 670px column centered in the content area.
 */
export function DefaultChat({ name, suggestions, reminders = [], onSend }: DefaultChatProps) {
  return (
    <main className="flex flex-1 flex-col tablet:items-center tablet:justify-center tablet:px-page-margin-desktop tablet:py-page-top">
      {/* Mobile reminder carousel */}
      {reminders.length > 0 && (
        <section aria-label="Reminders" className="border-b border-border-default bg-surface-subtle py-6 tablet:hidden">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4">
            {reminders.map((r) => (
              <div key={r.title} className="w-11/12 shrink-0 snap-center">
                <ReminderCard {...r} />
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="flex w-full flex-1 flex-col gap-12 px-page-margin-mobile pt-12 pb-16 tablet:max-w-chat-column tablet:flex-none tablet:p-0">
        <div className="flex flex-col gap-3 tablet:text-center">
          <h1 className="text-heading-28 text-text-primary">Welcome {name}. How can I help you today?</h1>
          <p className="text-body-16 text-text-secondary">
            Your personalized health and wealth journey starts here. <br className="hidden tablet:inline" />
            Ask me anything related to benefits or take action on what matters most.
          </p>
        </div>

        <div className="flex flex-col gap-6 tablet:flex-col-reverse">
          <PromptSuggestions suggestions={suggestions} onSelect={onSend} />
          {/* Mobile: pinned to the bottom of the screen. Tablet+: in the column above the suggestions. */}
          <div className="fixed inset-x-3 bottom-3 tablet:static">
            <ChatInput onSubmit={onSend} />
          </div>
        </div>
      </div>
    </main>
  );
}
