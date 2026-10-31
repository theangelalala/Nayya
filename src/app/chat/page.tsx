import { AppShell } from "@/components/surfaces/AppShell";
import { DefaultChat } from "@/components/surfaces/DefaultChat";
import { reminders, suggestions } from "./data";

export const metadata = { title: "Chat · Nayya" };

/** Default Chat screen. Sample content until the app is connected to real data. */
export default function ChatPage() {
  return (
    <AppShell reminders={reminders}>
      <DefaultChat name="Lucy" suggestions={suggestions} reminders={reminders} />
    </AppShell>
  );
}
