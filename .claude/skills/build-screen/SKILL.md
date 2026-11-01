---
name: build-screen
description: Build a new Nayya screen or flow step from a plain-language prompt, using only the Titan surfaces, components and tokens. Use whenever Angela asks to design, make, mock up, add or change a screen, page, step, modal or flow in the Nayya app.
---

# Build a Nayya screen

Angela is a product designer, not an engineer. She describes a screen in plain words ("a leave-planning step that asks for the due date") and expects a working, on-system page she can open on the live site. Follow these steps in order.

## 1. Load the system (every time)
Read these before writing anything:
- `CLAUDE.md`: the non-negotiable token rules.
- `docs/components.md`: every component and surface, when to use each, and their props.
- `docs/breakpoints.md`: surface sizes per screen size.
- `docs/screens.md`: screens that already exist. Reuse their data and patterns, and add yours there.

## 2. Pick the surface
Use "Picking a surface" in `docs/components.md`. In short:

| The request is… | Surface |
|---|---|
| an open-ended chat, answer or explanation | Default Chat with `UserMessage` / `AiMessage` blocks |
| one step of a guided, multi-step task (enrollment, leave, claims) | `ContentWizard` |
| account setup before the person is in the app | `Onboarding` |
| a standalone page reached from the rail (Settings, Benefits Hub) | `SingleScreen` |
| a confirmation or short explanation over a page | `Modal` on top of one of the above |

Ask Angela only if two surfaces fit equally well **and** picking wrong would mean redoing the page. Otherwise pick, build, and say in one line which surface you used and why.

## 3. Write the content
The words are part of the design. Never use lorem ipsum: write realistic content for a Nayya member, following the voice rules below.
- **Voice:** warm, plain, confident. Second person ("you", "your plan"). Short sentences. No exclamation marks.
- **Explain jargon once, in place:** "deductible (what you pay before insurance starts sharing costs)".
- **Headings:** sentence case, phrased as the person's question or task ("Who will be covered?", "When is your baby due?").
- **Buttons:** a verb for what happens next ("Continue", "Add to checklist", "Save changes"). Never "OK", "Submit" or "Click here".
- **Numbers:** `$1,200`, `20%`, dates as `July 1, 2026`; form inputs use `MM/DD/YYYY`.
- **Errors:** say what happened and how to fix it ("Enter a date after today.").
- **AI replies:** answer first, then the detail. Use `BulletList` for 3+ facts, `InlineTable` to compare, `ExampleScenario` for worked numbers, `UserRelevance` to tie it back to their plan, and `ActionFeedback` after something is saved.
- One primary button per view.

## 4. Build it
- Page: `src/app/<short-name>/page.tsx`. If it needs clicks or state, put it in a `"use client"` component in the same folder (see `src/app/wizard/WizardDemo.tsx`), and keep `page.tsx` a thin wrapper that sets `metadata.title` to "<Screen> · Nayya".
- Sample data: `src/app/<short-name>/data.ts`. Reuse `src/app/chat/data.ts` for reminders.
- Compose **only** existing components from `src/components/`. Your own classes are limited to layout (flex, grid, gap, width) using Titan tokens. No colors, font sizes, shadows or radii outside the cheat sheet in `CLAUDE.md`.
- Mobile first: check that it works at 390px, then add `tablet:` changes only if needed. The surfaces already handle the rail, header and column widths.
- **Missing component?** Look in Figma first (file `GCDJjCVAQ6OeblnieKKxBa`, page 236:18381, via `search_design_system` / `get_design_context`). Build it in the right folder (primitives → widgets → surfaces) with JSDoc, a story covering its variants and states, and an entry in `docs/components.md`. Then use it. Mention it to Angela as a new component she should QA.
- Add a story for the screen to `src/components/surfaces/Screens.stories.tsx`, so it shows up in `/components`.
- Add a row to `docs/screens.md`.

## 5. Check it
1. `npm run lint`: ESLint and the token check must pass. Fix the code, never the rule.
2. `npm run build`.
3. `node scripts/screenshot.mjs /<short-name>`, then **look at both screenshots** (mobile and desktop). Fix anything cut off, overlapping, misaligned or off-system before showing her.

## 6. Hand it over
- Work on a new branch from `main`, then open a pull request **into `main`** (never into another feature branch). End the PR body with the attribution lines from the session.
- Wait for the Vercel check on the PR to pass.
- Reply to Angela in plain language:
  - What you built, and which surface and why (one line).
  - The address to open after merging: `nayya-seven.vercel.app/<short-name>`.
  - The mobile and desktop screenshots.
  - Any new components, and any place you couldn't follow Figma or the rules, as a short list of questions.
  - Never explain code unless she asks.
