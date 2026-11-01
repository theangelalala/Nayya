"use client";

import { useEffect, useState } from "react";
import { AiAvatar } from "./AiMessage";

/** The three loading messages from Figma (_ AI Loading Text, Stage 1–3). */
export const loadingStages = ["Gathering information...", "Analyzing data...", "Wrapping things up..."] as const;

type AiLoadingProps = {
  /** Show one fixed stage (1–3). Leave empty to cycle through the stages automatically while waiting. */
  stage?: 1 | 2 | 3;
  /** Show the gray placeholder lines under the text (Figma: AI Loading Skeleton). Use for long answers. */
  skeleton?: boolean;
};

/**
 * AI Loading. Shows while the assistant is working on a reply: avatar, a status line,
 * and optional shimmering placeholder lines. Replace it with an AiMessage when the reply arrives.
 * Announced to screen readers as a status.
 */
export function AiLoading({ stage, skeleton = true }: AiLoadingProps) {
  const [auto, setAuto] = useState(0);
  useEffect(() => {
    if (stage) return;
    const t = setInterval(() => setAuto((s) => Math.min(s + 1, loadingStages.length - 1)), 2500);
    return () => clearInterval(t);
  }, [stage]);
  const text = loadingStages[stage ? stage - 1 : auto];

  return (
    <div role="status" className="flex w-full flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="animate-pulse">
          <AiAvatar />
        </span>
        <p className="text-body-16 text-text-secondary">{text}</p>
      </div>
      {skeleton && (
        <div aria-hidden className="flex animate-pulse flex-col gap-4">
          {[0, 1].map((p) => (
            <div key={p} className="flex flex-col">
              {["w-full", "w-full", "w-1/2"].map((w, i) => (
                <div key={i} className="flex h-6 items-center">
                  <div className={`h-4 rounded-sm bg-surface-muted ${w}`} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
