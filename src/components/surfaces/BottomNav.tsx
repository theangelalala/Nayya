import { Button } from "@/components/primitives/Button";

type BottomNavProps = {
  /** Back button label. Leave out to hide Back (Figma "Bottom nav Single"). */
  backLabel?: string;
  /** Forward button label, e.g. "Next" or "Proceed to Enrollment". */
  nextLabel: string;
  /**
   * primary: Next is the filled primary button (Figma "Bottom nav Primary"). Default.
   * secondary: Next is outlined, when the step is optional or another action on the page is the main one.
   */
  variant?: "primary" | "secondary";
  /** Turn off Next until the step is answered. */
  nextDisabled?: boolean;
  onBack?: () => void;
  onNext?: () => void;
};

/**
 * Bottom Nav. Back / Next bar pinned to the bottom of a wizard or onboarding step.
 * Sits on the page color with a rule above it; buttons are capped at 870px wide and centered.
 */
export function BottomNav({ backLabel, nextLabel, variant = "primary", nextDisabled, onBack, onNext }: BottomNavProps) {
  return (
    <nav aria-label="Step navigation" className="flex h-24 w-full items-center justify-center border-t border-border-disabled bg-surface-page px-page-margin-mobile tablet:px-8">
      <div className={`flex w-full max-w-218 items-center ${backLabel ? "justify-between" : "justify-end"}`}>
        {backLabel && (
          <Button variant="secondary" onClick={onBack}>
            {backLabel}
          </Button>
        )}
        <Button variant={variant} disabled={nextDisabled} onClick={onNext}>
          {nextLabel}
        </Button>
      </div>
    </nav>
  );
}
