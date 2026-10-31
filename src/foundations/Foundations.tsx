import tokens from "../../tokens/tokens.json";

// A living reference of the Titan tokens, read straight from tokens/tokens.json.
// Shown at "/" in the app and as "Foundations" in Storybook, so you can compare it to Figma.

type Node = { $value?: unknown; $description?: string; [k: string]: unknown };

function leaves(node: Node, path: string[] = []): { path: string[]; token: Node }[] {
  if (node && typeof node === "object" && "$value" in node) return [{ path, token: node }];
  return Object.entries(node)
    .filter(([k]) => !k.startsWith("$"))
    .flatMap(([k, v]) => leaves(v as Node, [...path, k]));
}

const t = tokens as unknown as Record<string, Node>;
const cssVar = (path: string[]) => `var(--${path.join("-")})`;

const bp = (name: string) => String((t.breakpoint[name] as Node).$value);
const colorGroups =["surface", "text", "border", "action", "status", "chart"] as const;
const typeStyles = leaves(t.typography).map(({ path }) => path.join("-"));

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-stack-default">
      <h2 className="text-heading-28">{title}</h2>
      {children}
    </section>
  );
}

export function Foundations() {
  return (
    <main className="flex flex-col gap-stack-section px-page-margin-mobile py-page-top tablet:px-page-margin-desktop max-w-6xl">
      <header className="flex flex-col gap-stack-tight">
        <h1 className="text-heading-51">Titan Foundations</h1>
        <p className="text-body-16 text-text-secondary">
          Generated from <code>tokens/tokens.json</code>. Font: Inter placeholder until Söhne is licensed.
        </p>
      </header>

      <Section title="Color">
        {colorGroups.map((group) => (
          <div key={group} className="flex flex-col gap-stack-tight">
            <h3 className="text-heading-16 capitalize">{group}</h3>
            <div className="grid grid-cols-2 tablet:grid-cols-4 desktop:grid-cols-6 gap-inline-default">
              {leaves(t[group], [group]).map(({ path, token }) => (
                <div key={path.join("-")} className="flex flex-col gap-inline-tight">
                  <div
                    className="h-16 rounded-md border border-border-subtle"
                    style={{ background: cssVar(path) }}
                  />
                  <span className="text-label-12-bold">{path.slice(1).join("/")}</span>
                  <span className="text-label-10 text-text-secondary">{String(token.$value)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-stack-default">
          {typeStyles.map((name) => (
            <div key={name} className="flex items-baseline gap-inline-default border-b border-border-subtle pb-2">
              <span className="w-40 shrink-0 text-label-12 text-text-secondary">text-{name}</span>
              <span style={{ font: `var(--typography-${name})` }}>The quick brown fox jumps over the lazy dog</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing">
        <div className="flex flex-col gap-inline-default">
          {leaves(t.spacing, ["spacing"]).map(({ path, token }) => (
            <div key={path.join("-")} className="flex items-center gap-inline-default">
              <span className="w-56 shrink-0 text-label-12">{path.slice(1).join("-")}</span>
              <div className="h-4 bg-surface-brand" style={{ width: cssVar(path) }} />
              <span className="text-label-10 text-text-secondary">{String(token.$value)}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Breakpoints & layout">
        <p className="text-body-14 text-text-secondary">
          Mobile below {bp("tablet")} · Tablet {bp("tablet")}+ · Desktop {bp("desktop")}+ · Widescreen {bp("widescreen")}+. Rules per surface:{" "}
          <code>docs/breakpoints.md</code>.
        </p>
        <div className="flex flex-col gap-inline-default">
          {leaves(t.layout, ["layout"]).map(({ path, token }) => {
            const r = (token.$extensions as Record<string, Record<string, string>> | undefined)?.["nayya.responsive"];
            return (
              <div key={path.join("-")} className="flex items-baseline gap-inline-default border-b border-border-subtle pb-2">
                <span className="w-56 shrink-0 text-label-12">{path.slice(1).join("/")}</span>
                <span className="text-label-12-bold">
                  {String(token.$value)}
                  {r ? ` → ${r.tablet} on tablet+` : ""}
                </span>
                <span className="text-label-10 text-text-secondary">{token.$description}</span>
              </div>
            );
          })}
        </div>
        <div className="bg-surface-subtle p-inline-element-padding rounded-inline-element border border-border-subtle">
          <span className="text-label-12">
            Live example: this box uses <code>p-inline-element-padding</code> and <code>rounded-inline-element</code>. Resize the window past 926px to see it change.
          </span>
        </div>
      </Section>

      <Section title="Radius & elevation">
        <div className="flex flex-wrap gap-inline-default">
          {(["sm", "md", "lg", "xl", "full"] as const).map((r) => (
            <div key={r} className="size-24 bg-surface-brand-subtle border border-border-default flex items-center justify-center text-label-12"
              style={{ borderRadius: `var(--radius-${r})` }}>
              radius-{r}
            </div>
          ))}
          {["1", "2", "3"].map((e) => (
            <div key={e} className="size-24 bg-surface-default rounded-md flex items-center justify-center text-label-12"
              style={{ boxShadow: `var(--elevation-${e})` }}>
              elevation-{e}
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
