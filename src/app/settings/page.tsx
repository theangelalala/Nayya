import { AppShell } from "@/components/surfaces/AppShell";
import { SingleScreen } from "@/components/surfaces/SingleScreen";
import { Toggle } from "@/components/primitives/Choice";
import { reminders } from "../chat/data";

export const metadata = { title: "Settings · Nayya" };

/** Single Screen surface with a sample Settings page. */
export default function SettingsPage() {
  return (
    <AppShell reminders={reminders}>
      <SingleScreen title="Settings">
        <section className="flex max-w-onboarding-form flex-col gap-6">
          <h2 className="text-heading-21 text-text-primary">Notifications</h2>
          <Toggle label="Email me about deadlines" defaultChecked />
          <Toggle label="Text me reminders" />
          <Toggle label="Weekly benefits summary" defaultChecked />
        </section>
      </SingleScreen>
    </AppShell>
  );
}
