import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sidebar } from "./Sidebar";
import { AppShell } from "./AppShell";
import { DefaultChat } from "./DefaultChat";
import { reminders, suggestions } from "@/app/chat/data";

const meta: Meta = { title: "Surfaces", parameters: { layout: "fullscreen" } };
export default meta;

export const SidebarClosed: StoryObj = {
  render: () => (
    <div className="h-dvh">
      <Sidebar open={false} onToggle={() => {}} />
    </div>
  ),
};

export const SidebarOpen: StoryObj = {
  render: () => (
    <div className="h-dvh">
      <Sidebar open onToggle={() => {}} reminders={reminders} />
    </div>
  ),
};

export const DefaultChatScreen: StoryObj = {
  render: () => (
    <AppShell reminders={reminders}>
      <DefaultChat name="Lucy" suggestions={suggestions} reminders={reminders} />
    </AppShell>
  ),
};

export const DefaultChatRailOpen: StoryObj = {
  render: () => (
    <AppShell reminders={reminders} defaultOpen>
      <DefaultChat name="Lucy" suggestions={suggestions} reminders={reminders} />
    </AppShell>
  ),
};
