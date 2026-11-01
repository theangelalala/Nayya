"use client";

import type { ReactNode } from "react";
import { ChatInput } from "@/components/widgets/ChatInput";
import { FlowHeader } from "./FlowHeader";
import { BottomNav } from "./BottomNav";

type ContentWizardProps = {
  /** Name of the guided flow, shown in the dark header bar ("Open Enrollment Guide"). */
  flowTitle: string;
  /** Heading of the current step (Heading/28), e.g. "Who will be covered?". */
  stepTitle: string;
  /** Optional line under the step heading (Body/16, secondary). */
  stepDescription?: string;
  /** The step's content: SelectorInput, fields, plan cards… */
  children: ReactNode;
  /** Chat messages for the left panel: UserMessage / AiMessage / AiLoading. */
  chat?: ReactNode;
  /** Shortlist pill in the header. Leave out for flows without one. */
  shortlist?: { total: string; onClick?: () => void };
  /** Back / Next labels for the bottom bar. Leave backLabel out on the first step. */
  nav: { backLabel?: string; nextLabel: string; nextDisabled?: boolean; onBack?: () => void; onNext?: () => void };
  /** Called by Exit in the header. Usually opens a small Modal to confirm. */
  onExit?: () => void;
  /** Called when the person sends a message in the side chat. */
  onSend?: (message: string) => void;
};

/**
 * Content Wizard surface (Figma: Surfaces_Q1 → Content Wizard). A guided, step-by-step flow
 * with the AI chat beside it. Use inside AppShell.
 * Mobile: the step fills the screen (chat is hidden while the wizard is open).
 * Tablet+: 428px chat panel on the left, the step fills the rest with its header bar and Back/Next bar.
 */
export function ContentWizard({ flowTitle, stepTitle, stepDescription, children, chat, shortlist, nav, onExit, onSend }: ContentWizardProps) {
  return (
    <div className="flex min-h-0 flex-1 tablet:h-dvh">
      {/* Chat panel (tablet+) */}
      <aside aria-label="Chat" className="hidden w-wizard-chat shrink-0 flex-col border-r border-border-subtle bg-surface-page tablet:flex">
        <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-6 py-6">{chat}</div>
        <div className="px-3 pb-3">
          <ChatInput onSubmit={onSend} />
        </div>
      </aside>

      {/* Wizard panel */}
      <section aria-label={flowTitle} className="flex min-w-0 flex-1 flex-col bg-surface-brand-subtle">
        <FlowHeader title={flowTitle} shortlist={shortlist} onExit={onExit} />
        <div className="min-h-0 flex-1 overflow-y-auto px-page-margin-mobile py-8 tablet:px-8">
          <div className="flex max-w-onboarding-form flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-heading-28 text-text-primary">{stepTitle}</h2>
              {stepDescription && <p className="text-body-16 text-text-secondary">{stepDescription}</p>}
            </div>
            {children}
          </div>
        </div>
        <div className="sticky bottom-0">
          <BottomNav {...nav} />
        </div>
      </section>
    </div>
  );
}
