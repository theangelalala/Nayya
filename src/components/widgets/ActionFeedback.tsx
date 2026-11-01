import { Icon, type IconName } from "@/components/primitives/Icon";

type ActionFeedbackProps = {
  /**
   * positive: something worked (saved, enrolled, submitted).
   * negative: something failed or needs fixing.
   * neutral: heads-up information that isn't good or bad.
   */
  type?: "positive" | "negative" | "neutral";
  /** Bold first line (Figma "Show Title"). Optional. */
  title?: string;
  /** Regular text (Figma "Show Message"). Optional, but give at least a title or a message. */
  message?: string;
};

const styles: Record<NonNullable<ActionFeedbackProps["type"]>, { box: string; icon: IconName; tint: string; label: string }> = {
  positive: { box: "bg-status-success-subtle", icon: "check-circle", tint: "text-text-success", label: "Success" },
  negative: { box: "bg-status-error-subtle", icon: "x-circle", tint: "text-text-error", label: "Error" },
  neutral: { box: "bg-surface-muted", icon: "warning-circle", tint: "text-text-primary", label: "Note" },
};

/**
 * Action Feedback. A short inline banner that confirms the result of an action, usually inside an AI reply.
 * The colored icon always carries the meaning, and the text stays dark for contrast.
 */
export function ActionFeedback({ type = "positive", title, message }: ActionFeedbackProps) {
  const s = styles[type];
  return (
    <div role={type === "negative" ? "alert" : "status"} className={`flex w-full items-center gap-3 rounded-md p-4 ${s.box}`}>
      <Icon name={s.icon} className={s.tint} />
      <span className="sr-only">{s.label}:</span>
      <div className="flex min-w-0 flex-1 flex-col gap-1 text-text-primary">
        {title && <p className="text-label-16-bold">{title}</p>}
        {message && <p className="text-label-16">{message}</p>}
      </div>
    </div>
  );
}
