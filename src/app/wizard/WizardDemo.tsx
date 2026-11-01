"use client";

import { useState } from "react";
import { AppShell } from "@/components/surfaces/AppShell";
import { ContentWizard } from "@/components/surfaces/ContentWizard";
import { Modal } from "@/components/surfaces/Modal";
import { Button } from "@/components/primitives/Button";
import { SelectorInput } from "@/components/primitives/SelectorInput";
import { AiMessage } from "@/components/widgets/AiMessage";
import { UserMessage } from "@/components/widgets/UserMessage";
import { BulletList } from "@/components/widgets/ContentBlocks";
import { reminders } from "../chat/data";

/** Sample Open Enrollment step, to show the Content Wizard surface with real-looking content. */
export function WizardDemo() {
  const [exiting, setExiting] = useState(false);
  const [answer, setAnswer] = useState<string[]>([]);
  return (
    <AppShell reminders={reminders}>
      <ContentWizard
        flowTitle="Open Enrollment Guide"
        stepTitle="Who will be covered?"
        stepDescription="We'll use this to show plans and prices that fit your household."
        shortlist={{ total: "$445.75" }}
        onExit={() => setExiting(true)}
        nav={{ backLabel: "Back", nextLabel: "Next", nextDisabled: answer.length === 0 }}
        chat={
          <>
            <AiMessage>
              <p>Let&apos;s find the right plans for you. I&apos;ll ask a few quick questions on the right.</p>
            </AiMessage>
            <UserMessage>Does my spouse need to be on the same plan?</UserMessage>
            <AiMessage>
              <p>Not necessarily. You can cover your spouse on your plan, or they can enroll through their own employer.</p>
              <BulletList items={["Covering them here is simpler: one deductible, one card.", "Their employer plan may be cheaper if it's subsidized."]} />
            </AiMessage>
          </>
        }
      >
        <SelectorInput
          legend="Choose who you want to cover"
          options={["Just me", "Me and my spouse", "Me and my children", "My whole family"]}
          onChange={setAnswer}
        />
      </ContentWizard>
      <Modal
        open={exiting}
        onClose={() => setExiting(false)}
        title="You're about to exit this experience."
        actions={
          <>
            <Button variant="secondary" onClick={() => setExiting(false)}>No, stay</Button>
            <Button onClick={() => setExiting(false)}>Yes, continue</Button>
          </>
        }
      >
        <p>You can come back to Open Enrollment anytime. Your answers so far are saved.</p>
      </Modal>
    </AppShell>
  );
}
