"use client";

import { useState } from "react";
import { AppShell } from "@/components/surfaces/AppShell";
import { ContentWizard } from "@/components/surfaces/ContentWizard";
import { Modal } from "@/components/surfaces/Modal";
import { Button } from "@/components/primitives/Button";
import { Checkbox } from "@/components/primitives/Choice";
import { AiMessage } from "@/components/widgets/AiMessage";
import { ActionFeedback } from "@/components/widgets/ActionFeedback";
import { BulletList, InlineInformation } from "@/components/widgets/ContentBlocks";
import { reminders } from "../chat/data";
import { planChoices, totals } from "./data";

/** Open Enrollment, last step: review every plan choice and the total cost, then enroll. */
export function ReviewChoices() {
  const [agreed, setAgreed] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [exiting, setExiting] = useState(false);

  return (
    <AppShell reminders={reminders}>
      <ContentWizard
        flowTitle="Open Enrollment Guide"
        stepTitle={enrolled ? "You're enrolled" : "Review your choices"}
        stepDescription={
          enrolled
            ? `Your coverage starts ${totals.starts}. We've emailed you a copy of these choices.`
            : `Check that everything looks right. You can change any plan before you enroll, and until ${totals.deadline}.`
        }
        shortlist={{ total: totals.monthly }}
        onExit={() => setExiting(true)}
        nav={
          enrolled
            ? { nextLabel: "Go to my benefits" }
            : { backLabel: "Back", nextLabel: "Enroll in these plans", nextDisabled: !agreed, onNext: () => setEnrolled(true) }
        }
        chat={
          <AiMessage>
            <p>You&apos;re almost done. Here&apos;s what happens when you enroll:</p>
            <BulletList
              type="number"
              items={[
                "Your choices are sent to your employer and each insurance company.",
                <>Your new costs come out of your paycheck starting <strong>{totals.starts}</strong>.</>,
                "Your insurance cards arrive by mail in 2 to 3 weeks.",
              ]}
            />
            <p>Have a question about any plan? Ask me here before you enroll.</p>
          </AiMessage>
        }
      >
        {enrolled ? (
          <ActionFeedback type="positive" title="Enrollment complete" message={`You're enrolled in ${planChoices.length} plans for ${totals.monthly} a month.`} />
        ) : (
          <>
            {planChoices.map((choice) => (
              <section key={choice.benefit} aria-labelledby={`plan-${choice.benefit}`} className="flex flex-col gap-stack-tight">
                <div className="flex items-start justify-between gap-inline-default">
                  <div className="flex flex-col gap-1">
                    <h3 id={`plan-${choice.benefit}`} className="text-heading-21 text-text-primary">{choice.benefit}</h3>
                    <p className="text-body-16 text-text-secondary">{choice.plan}</p>
                  </div>
                  <Button variant="text" aria-label={`Change ${choice.benefit.toLowerCase()} plan`}>Change</Button>
                </div>
                <InlineInformation items={choice.details} />
              </section>
            ))}

            <section aria-labelledby="plan-total" className="flex flex-col gap-stack-tight">
              <h3 id="plan-total" className="text-heading-21 text-text-primary">Your total cost</h3>
              <InlineInformation
                items={[
                  { label: "Every month", value: totals.monthly },
                  { label: "Every paycheck (paid twice a month)", value: totals.perPaycheck },
                  { label: "Coverage starts", value: totals.starts, dividerBefore: true },
                ]}
              />
            </section>

            <Checkbox
              appearance="card"
              label="I've reviewed my choices. I understand I can't change them after November 15, 2026 unless I have a major life event, like a marriage or a new baby."
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />
          </>
        )}
      </ContentWizard>
      <Modal
        open={exiting}
        onClose={() => setExiting(false)}
        title="You're about to exit this experience."
        actions={
          <>
            <Button variant="secondary" onClick={() => setExiting(false)}>No, stay</Button>
            <Button onClick={() => setExiting(false)}>Yes, exit</Button>
          </>
        }
      >
        <p>You haven&apos;t enrolled yet. Your choices are saved, so you can come back and enroll before {totals.deadline}.</p>
      </Modal>
    </AppShell>
  );
}
