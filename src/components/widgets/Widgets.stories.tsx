import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReminderCard } from "./ReminderCard";
import { ChatInput } from "./ChatInput";
import { PromptSuggestions } from "./PromptSuggestions";

const meta: Meta = { title: "Widgets", parameters: { layout: "padded" } };
export default meta;

export const ReminderCardWithDueDate: StoryObj<typeof ReminderCard> = {
  render: () => (
    <div className="w-80">
      <ReminderCard title="Open Enrollment" description="Get personalized recommendations and enroll by 9/30." icon="alarm" due="Due: 09/30/2025" />
    </div>
  ),
};

export const ReminderCardWithProgress: StoryObj<typeof ReminderCard> = {
  render: () => (
    <div className="w-80">
      <ReminderCard title="Maternity Checklist" description="See your remaining tasks to complete." icon="list-checks" progress={{ done: 2, total: 10 }} />
    </div>
  ),
};

export const ChatInputDefault: StoryObj<typeof ChatInput> = {
  render: () => (
    <div className="max-w-chat-column">
      <ChatInput />
    </div>
  ),
};

export const ChatInputNoSparkle: StoryObj<typeof ChatInput> = {
  render: () => (
    <div className="max-w-chat-column">
      <ChatInput showSparkle={false} />
    </div>
  ),
};

export const Suggestions: StoryObj<typeof PromptSuggestions> = {
  render: () => (
    <div className="max-w-chat-column">
      <PromptSuggestions suggestions={["Get started with Open Enrollment", "Dive into our last conversation", "Tell me about my current benefits"]} />
    </div>
  ),
};
