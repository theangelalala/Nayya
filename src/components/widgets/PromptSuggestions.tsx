import { Icon } from "@/components/primitives/Icon";

type PromptSuggestionsProps = {
  /** Line above the list. */
  heading?: string;
  /** Suggested prompts the user can tap. */
  suggestions: string[];
  /** Called with the chosen prompt. */
  onSelect?: (prompt: string) => void;
};

/**
 * Prompt suggestions (Figma: Suggestions with _ Bullet Item rows).
 * A short list of starter prompts under the chat input.
 */
export function PromptSuggestions({ heading = "Here are some ideas to get you started:", suggestions, onSelect }: PromptSuggestionsProps) {
  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-body-16 text-text-primary">{heading}</p>
      <ul className="flex flex-col">
        {suggestions.map((s) => (
          <li key={s} className="border-b border-border-default">
            <button
              type="button"
              onClick={() => onSelect?.(s)}
              className="flex w-full items-center gap-2 py-1.5 text-left text-body-16 text-text-primary hover:text-text-brand"
            >
              <span className="flex size-6 items-center justify-center">
                <Icon name="arrow-elbow" />
              </span>
              {s}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
