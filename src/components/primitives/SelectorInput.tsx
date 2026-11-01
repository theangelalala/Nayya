"use client";

import { useId } from "react";
import { Checkbox, Radio } from "./Choice";

type SelectorInputProps = {
  /** The question, shown above the options (Label/16 bold). */
  legend: string;
  /** Option labels. */
  options: string[];
  /** radio: pick exactly one. checkbox: pick any number. Figma "Selector Type". */
  type?: "radio" | "checkbox";
  /**
   * fill: each option takes the full width, stacked (Figma Horizontal Resizing=Fixed). Best for long labels and mobile.
   * hug: options size to their text and wrap side by side (Hug). Best for short answers like Yes / No.
   */
  resizing?: "fill" | "hug";
  /** Labels selected at first. */
  defaultValue?: string[];
  /** Options that can't be chosen. */
  disabledOptions?: string[];
  /** Called with all selected labels whenever the selection changes. */
  onChange?: (value: string[]) => void;
};

/**
 * Selector Input. A question with bordered radio or checkbox answers, grouped for screen readers.
 * Use in wizards and onboarding forms. For a single yes/no setting use Toggle instead.
 */
export function SelectorInput({ legend, options, type = "radio", resizing = "fill", defaultValue = [], disabledOptions = [], onChange }: SelectorInputProps) {
  const name = useId();
  const Control = type === "radio" ? Radio : Checkbox;
  return (
    <fieldset
      className="flex flex-col gap-3"
      onChange={(e) => {
        const form = (e.currentTarget as HTMLFieldSetElement).querySelectorAll<HTMLInputElement>("input:checked");
        onChange?.(Array.from(form).map((i) => i.value));
      }}
    >
      <legend className="mb-3 text-label-16-bold text-text-primary">{legend}</legend>
      <div className={resizing === "hug" ? "flex flex-wrap gap-3" : "flex flex-col gap-3"}>
        {options.map((o) => (
          <div key={o} className={resizing === "hug" ? "w-auto" : "w-full"}>
            <Control
              label={o}
              name={name}
              value={o}
              appearance="card"
              defaultChecked={defaultValue.includes(o)}
              disabled={disabledOptions.includes(o)}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
