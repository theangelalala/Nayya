"use client";

import type { FormEvent, ReactNode } from "react";
import { Logo } from "@/components/primitives/Logo";
import { Button } from "@/components/primitives/Button";

type OnboardingProps = {
  /** Page heading (Heading/28, centered), e.g. "Just a few more details". */
  title: string;
  /** One line under the heading explaining why we're asking. */
  description?: string;
  /** Form fields. Use FormRow to put two short fields side by side. */
  children: ReactNode;
  /** Label of the single primary button under the form. */
  submitLabel?: string;
  /** Turn off the button until the form is complete. */
  submitDisabled?: boolean;
  /** Called when the form is submitted (button or Enter). */
  onSubmit?: () => void;
};

/**
 * Onboarding surface (Figma: Surfaces_Q1 → Welcome). Account setup before the person enters the app.
 * No left rail: just a black header with the logo. The form is 638px wide and centered on tablet+,
 * full width with 24px margins on mobile. Do not wrap in AppShell.
 */
export function Onboarding({ title, description, children, submitLabel = "Next", submitDisabled, onSubmit }: OnboardingProps) {
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };
  return (
    <div className="flex min-h-dvh flex-col bg-surface-page">
      <header className="flex h-header-mobile shrink-0 items-center justify-center bg-surface-inverse px-page-margin-mobile tablet:justify-start tablet:px-16">
        <Logo inverse />
      </header>
      <main className="flex flex-1 justify-center px-page-margin-mobile py-12">
        <form onSubmit={submit} className="flex w-full max-w-onboarding-form flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <h1 className="text-heading-28 text-text-primary">{title}</h1>
            {description && <p className="text-body-14 text-text-primary">{description}</p>}
          </div>
          <div className="flex flex-col gap-3">{children}</div>
          <div className="flex justify-center">
            <Button type="submit" disabled={submitDisabled} className="w-full tablet:w-auto">
              {submitLabel}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}

/** Two fields side by side on tablet+, stacked on mobile (e.g. First / Last name, City / State). */
export function FormRow({ children }: { /** Two fields. */ children: ReactNode }) {
  return <div className="flex flex-col gap-3 tablet:flex-row tablet:*:flex-1">{children}</div>;
}
