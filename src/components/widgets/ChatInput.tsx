"use client";

import { useState } from "react";
import { Icon } from "@/components/primitives/Icon";

type ChatInputProps = {
  /** Placeholder text. */
  placeholder?: string;
  /** Called with the message when the user presses Enter or the send button. */
  onSubmit?: (message: string) => void;
  /** Show the AI sparkle at the start of the field (desktop design). */
  showSparkle?: boolean;
};

/**
 * Chat input (Figma: AI Prompt). A pill-shaped field with a round send button.
 * Used at the bottom of Default Chat and in the Content Wizard chat panel.
 */
export function ChatInput({ placeholder = "Type your message…", onSubmit, showSparkle = true }: ChatInputProps) {
  const [value, setValue] = useState("");
  const send = () => {
    const msg = value.trim();
    if (!msg) return;
    onSubmit?.(msg);
    setValue("");
  };
  return (
    <form
      className="flex h-14 w-full items-center gap-2 rounded-full border border-border-brand bg-surface-default pl-4 pr-2 focus-within:outline-2 focus-within:outline-border-focus"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      {showSparkle && <Icon name="sparkle" />}
      <label className="sr-only" htmlFor="chat-input">
        Message
      </label>
      <input
        id="chat-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent text-body-16 text-text-primary outline-none placeholder:text-text-brand"
        autoComplete="off"
      />
      <button
        type="submit"
        aria-label="Send message"
        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-inverse hover:bg-action-primary-hover"
      >
        <Icon name="arrow-right" />
      </button>
    </form>
  );
}
