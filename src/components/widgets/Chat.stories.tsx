import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AiMessage } from "./AiMessage";
import { UserMessage } from "./UserMessage";
import { AiLoading } from "./AiLoading";
import { ActionFeedback } from "./ActionFeedback";
import { AiSelection } from "./AiSelection";
import { BulletList, ExampleScenario, UserRelevance, InlineInformation, InlineTable } from "./ContentBlocks";
import { ChecklistItem } from "./ChecklistItem";
import { ListItem } from "./ListItem";

const meta: Meta = { title: "Widgets/Chat", parameters: { layout: "padded" } };
export default meta;
type S = StoryObj;

const Column = ({ children }: { children: React.ReactNode }) => <div className="flex max-w-chat-column flex-col gap-8">{children}</div>;

/** A whole exchange, to see how the pieces sit together. Resize to mobile to see the avatar move above the text. */
export const Conversation: S = {
  render: () => (
    <Column>
      <UserMessage>How much will I pay for my maternity care?</UserMessage>
      <AiMessage>
        <p>Your current plan is a PPO called PPO 1000, and you have coverage for yourself and your spouse. Here are the key features of your plan:</p>
        <BulletList
          items={[
            <><strong>In-network deductible:</strong> $1,000 individual / $2,000 family</>,
            <><strong>Out-of-network deductible:</strong> $2,000 individual / $4,000 family</>,
            <><strong>In-network out-of-pocket maximum:</strong> $3,000 individual / $6,000 family</>,
          ]}
        />
      </AiMessage>
      <AiMessage aiAvatar={false}>
        <p>Would you like me to add this to your Maternity Checklist?</p>
        <AiSelection options={[{ label: "Yes, add it" }, { label: "Not now" }]} />
      </AiMessage>
    </Column>
  ),
};

export const UserMessages: S = {
  render: () => (
    <Column>
      <UserMessage>Lorem ipsum</UserMessage>
      <UserMessage>Lorem ipsum dolor sit amet orem ipsum dolor sit amet lorem ipsum dolor sit amet</UserMessage>
      <UserMessage>{"With\nline breaks"}</UserMessage>
    </Column>
  ),
};

export const AiMessages: S = {
  render: () => (
    <Column>
      <AiMessage>
        <p>With avatar (first message of a reply).</p>
      </AiMessage>
      <AiMessage aiAvatar={false}>
        <p>Without avatar (follow-up). On tablet+ it lines up with the text above.</p>
      </AiMessage>
    </Column>
  ),
};

export const Loading: S = {
  render: () => (
    <Column>
      <AiLoading />
      <AiLoading stage={2} skeleton={false} />
      <AiLoading stage={3} skeleton={false} />
    </Column>
  ),
};

export const Feedback: S = {
  render: () => (
    <div className="flex max-w-96 flex-col gap-6">
      {(["positive", "negative", "neutral"] as const).map((t) => (
        <div key={t} className="flex flex-col gap-3">
          <ActionFeedback type={t} message="Message" />
          <ActionFeedback type={t} title="Title" />
          <ActionFeedback type={t} title="Title" message="Message" />
        </div>
      ))}
    </div>
  ),
};

export const Selections: S = {
  render: () => (
    <Column>
      <AiSelection options={[{ label: "Label" }]} />
      <AiSelection options={[{ label: "Label" }]} selected="Label" />
      <AiSelection options={[{ label: "Label", disabled: true }]} />
      <AiSelection options={[{ label: "Label", destructive: true }]} />
      <AiSelection options={[{ label: "Yes" }, { label: "No" }]} />
      <AiSelection options={[{ label: "Yes" }, { label: "No" }]} selected="Yes" />
    </Column>
  ),
};

export const Bullets: S = {
  render: () => (
    <Column>
      <BulletList items={["Deductible: $3,400", "Amount you met so far: $1,200", "Coinsurance after deductible: 20%"]} />
      <BulletList type="number" items={["Check your deductible balance.", "Pay the bill toward your deductible.", "Insurance starts sharing costs."]} />
      <BulletList type="letter" items={["Option one", "Option two"]} />
    </Column>
  ),
};

export const ExampleScenarioBlock: S = {
  name: "Example Scenario",
  render: () => (
    <Column>
      <ExampleScenario>
        <p>Here is some context for the scenario:</p>
        <BulletList items={["Deductible: $3,400", "Amount you met so far: $1,200", "Coinsurance after deductible: 20%"]} />
        <p>Let&apos;s say you are getting a procedure that costs $2,000.</p>
        <BulletList
          type="number"
          items={[
            "Check your deductible balance. You still need to pay $2,200 before insurance starts cost-sharing.",
            "Since you haven't met your deductible yet, the $2,000 bill goes toward the deductible.",
            "You have now met $3,200 of your $3,400 deductible.",
          ]}
        />
      </ExampleScenario>
    </Column>
  ),
};

export const UserRelevanceBlock: S = {
  name: "User Relevance",
  render: () => (
    <Column>
      <UserRelevance>
        <BulletList
          items={[
            "Your total deductible is $3,400 of which you have met $1,200.",
            "You have a high deductible plan, so you pay more out-of-pocket before insurance covers most services.",
            "Your deductible resets on July 1, 2026.",
          ]}
        />
      </UserRelevance>
    </Column>
  ),
};

export const InlineInfo: S = {
  name: "Inline Information",
  render: () => (
    <Column>
      <InlineInformation
        items={[
          { label: "Accumulated Contribution:", value: "To date: $2,760" },
          { label: "Max Contribution:", value: "Family HSA contribution: $8,550", muted: true },
          { label: "Updated Contribution", value: "$230 per paycheck → $482.50 per paycheck", dividerBefore: true },
        ]}
      />
    </Column>
  ),
};

export const Tables: S = {
  render: () => (
    <Column>
      <InlineTable
        caption="Leave by birth type"
        columns={["Metric", "Vaginal Birth", "C-Section"]}
        rows={[
          ["Full-pay duration", "16 weeks", "16 weeks"],
          ["Total paid leave (pay drops to 67%)", "18 weeks", "18 weeks"],
          ["Job-protection ends", "End of week 18", "End of week 20"],
        ]}
      />
      <InlineTable
        layout="scroll"
        caption="What you pay for prenatal care"
        columns={["Services", "What you pay", "Notes"]}
        rows={[
          ["Preventive services (e.g., initial OB visit)", "$0 (no deductible)", "Preventive care is fully covered, even before meeting the deductible."],
          ["Routine OB visits", "10% coinsurance after $1,650 deductible", "Most OB appointments are subject to deductible + 10% coinsurance."],
          ["Lab work", "10% coinsurance after deductible", "Same rule applies: deductible first, then coinsurance."],
        ]}
      />
    </Column>
  ),
};

export const Checklist: S = {
  render: () => (
    <div className="max-w-96">
      <ChecklistItem title="Tell your manager" description="Share your expected leave dates." done defaultOpen />
      <ChecklistItem title="Add baby to your health plan" description="You have 30 days after birth." done />
      <ChecklistItem title="Apply for short-term disability" description="Submit through your carrier portal." defaultOpen />
      <ChecklistItem title="Choose a pediatrician" description="Pick an in-network provider." />
    </div>
  ),
};

export const ListItems: S = {
  render: () => (
    <div role="listbox" aria-label="Example list" className="flex max-w-80 flex-col rounded-sm bg-surface-default shadow-elevation-2">
      <ListItem label="List Item" />
      <ListItem label="List Item (selected)" selected />
      <ListItem label="A very long list item label that gets cut off" />
    </div>
  ),
};
