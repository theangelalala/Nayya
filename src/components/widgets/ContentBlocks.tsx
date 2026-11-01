import type { ReactNode } from "react";

type BulletListProps = {
  /** dot: unordered points. number: steps in order (1. 2. 3.). letter: options (a. b. c.). Figma: _ Bullet Item Type. */
  type?: "dot" | "number" | "letter";
  /** One entry per bullet. Wrap a lead-in in <strong> for "Label: value" bullets. */
  items: ReactNode[];
};

/** Bullet list in Body/16 (Figma: _ AI Bullet List). Use inside AI replies and content blocks. */
export function BulletList({ type = "dot", items }: BulletListProps) {
  const Tag = type === "dot" ? "ul" : "ol";
  return (
    <Tag className="flex w-full flex-col text-body-16 text-text-primary">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2 py-1.5">
          <span aria-hidden className="flex h-6.5 w-6 shrink-0 items-center justify-center">
            {type === "dot" ? (
              <span className="size-1.5 rounded-full bg-text-primary" />
            ) : (
              <span className="w-full text-right">{type === "number" ? i + 1 : String.fromCharCode(97 + i)}.</span>
            )}
          </span>
          <span className="min-w-0 flex-1 [&_strong]:text-body-16-bold">{item}</span>
        </li>
      ))}
    </Tag>
  );
}

/** Thin rule used above and below Example Scenario and User Relevance (Figma: Line Break). */
export function Divider() {
  return <hr className="w-full border-t border-border-default" />;
}

type SectionProps = {
  /** Section heading. */
  title: string;
  /** Paragraphs and BulletLists. */
  children: ReactNode;
};

/**
 * Example Scenario. A worked example set between two rules, with a Heading/21 title.
 * Use when the assistant walks through numbers ("Let's say your procedure costs $2,000…").
 */
export function ExampleScenario({ title = "Example Scenario", children }: Partial<Pick<SectionProps, "title">> & Pick<SectionProps, "children">) {
  return (
    <section className="flex w-full flex-col gap-6 py-8">
      <Divider />
      <h3 className="text-heading-21 text-text-primary">{title}</h3>
      <div className="flex flex-col gap-3 text-body-16 text-text-primary">{children}</div>
      <Divider />
    </section>
  );
}

/**
 * User Relevance. "How this applies to you": a Heading/28 section between two rules
 * that ties general info to the person's own plan. Usually a BulletList inside.
 */
export function UserRelevance({ title = "How this applies to you", children }: Partial<Pick<SectionProps, "title">> & Pick<SectionProps, "children">) {
  return (
    <section className="flex w-full flex-col gap-8">
      <Divider />
      <div className="flex flex-col gap-4">
        <h3 className="text-heading-28 text-text-primary">{title}</h3>
        <div className="flex flex-col gap-3 text-body-16 text-text-primary">{children}</div>
      </div>
      <Divider />
    </section>
  );
}

type InfoItem = {
  /** Bold label, e.g. "Accumulated Contribution:". */
  label: string;
  /** The value underneath. */
  value: ReactNode;
  /** Gray it out, for reference values that aren't the main point (e.g. the max). */
  muted?: boolean;
  /** Draw a rule above this item, to separate a result from the inputs. */
  dividerBefore?: boolean;
};

/**
 * Inline Information. A gray box of label/value pairs inside an AI reply
 * (e.g. contribution to date, max, updated amount). Full-bleed on mobile, rounded with side padding on tablet+.
 */
export function InlineInformation({ items }: { /** The label/value pairs, top to bottom. */ items: InfoItem[] }) {
  return (
    <div className="w-full px-inline-element-padding">
      <dl className="flex flex-col gap-6 rounded-inline-element bg-surface-subtle p-6">
        {items.map((it) => (
          <div key={it.label} className="contents">
            {it.dividerBefore && <hr className="border-t border-border-strong" />}
            <div className={`flex flex-col gap-3 text-body-16 ${it.muted ? "text-text-secondary" : "text-text-primary"}`}>
              <dt className="text-body-16-bold">{it.label}</dt>
              <dd>{it.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

type InlineTableProps = {
  /** Column headings. */
  columns: string[];
  /** One array per row, same order as the columns. */
  rows: ReactNode[][];
  /**
   * responsive: columns share the width and text wraps. Use for 2–3 short columns.
   * scroll: fixed-width columns that scroll sideways on narrow screens. Use for 3+ columns or long text.
   */
  layout?: "responsive" | "scroll";
  /** Short description for screen readers, e.g. "Leave comparison by birth type". */
  caption?: string;
};

/** Inline Table (Figma: Inline Table – Responsive / – Scroll). A comparison table inside an AI reply. */
export function InlineTable({ columns, rows, layout = "responsive", caption }: InlineTableProps) {
  const scroll = layout === "scroll";
  const cell = scroll ? "w-40 shrink-0 last:w-auto last:flex-1" : "min-w-0 flex-1";
  return (
    <div className="w-full px-inline-element-padding">
      <div className={`rounded-inline-element bg-surface-subtle px-6 py-3 ${scroll ? "overflow-x-auto" : ""}`} tabIndex={scroll ? 0 : undefined} aria-label={scroll ? caption : undefined} role={scroll ? "region" : undefined}>
        <table className={`flex flex-col border-b border-border-subtle text-label-14 text-text-primary ${scroll ? "w-180" : "w-full"}`}>
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead className="contents">
            <tr className="flex items-center gap-6 border-b border-border-strong py-2">
              {columns.map((c) => (
                <th key={c} scope="col" className={`text-left text-label-14-bold ${cell}`}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody className="contents">
            {rows.map((r, i) => (
              <tr key={i} className="flex items-center gap-6 border-b border-border-default py-2 last:border-b-0">
                {r.map((v, j) => (
                  <td key={j} className={cell}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
