# Nayya: rules for Claude

@AGENTS.md

## Who you're working with
Angela is a product designer building Nayya solo. She is not an engineer.
- Explain changes in plain language: what changed and how to see it, not how the code works.
- Work on a branch and open a pull request for anything beyond a tiny fix, so she can review and undo.
- After UI changes, take a screenshot (the app at `/` or the Storybook story) and show it.

## What this is
A Next.js web app (TypeScript, Tailwind v4) built on the **Titan design system**.

| Thing | Where |
|---|---|
| Design tokens (source of truth for code) | `tokens/tokens.json` |
| Generated CSS variables / Tailwind theme | `src/styles/tokens.css`, `src/styles/theme.css`. **Never edit by hand.** |
| Components | `src/components/` (primitives → widgets → surfaces) |
| Foundations reference page | `/` in the app, "Foundations/Titan tokens" in Storybook |
| Token audit and decisions | `docs/titan-token-audit.md` |
| Figma source of truth | `[Angela] Nayya Titan Design System`, fileKey `GCDJjCVAQ6OeblnieKKxBa` (variables: Primitives, Semantic, Spacing, Radius, Typography; 21 text styles; elevation effect styles) |

## Commands
- `npm run dev`: run the app at http://localhost:3000
- `npm run storybook`: component catalog at http://localhost:6006
- `npm run tokens`: rebuild CSS/Tailwind from `tokens/tokens.json` (runs automatically before dev, build and storybook)
- `npm run lint`: ESLint plus the token check (`scripts/check-tokens.mjs`)
- `npm run build`: production build

## Design system rules (non-negotiable)
1. **Only use Titan tokens.** No hex/rgb colors, no arbitrary Tailwind values (`bg-[#…]`, `p-[13px]`), no default Tailwind palette. Default colors, radii, shadows and font sizes are switched off, so `bg-blue-500` or `text-2xl` won't work.
2. **Use semantic color tokens, never primitives.** Use `bg-surface-brand`, not `--color-primary-600`.
3. **Spacing comes from the scale:** 0, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16 (×4px), or a named spacing token. Prefer the named ones for meaning.
4. **Typography uses the 21 Titan styles only**, via `text-<style>` classes. Never set font size, line height or weight separately.
5. **Reuse before building.** Check `src/components/` first, then the Figma file (search_design_system / get_design_context) for an existing component.
6. **Every component gets a story** (`*.stories.tsx`) covering its variants and states, and must pass the Storybook a11y panel.
7. **Status colors** (success #15A961, warning #FFB52C) are below AA contrast as text on light backgrounds. Always pair status text with an icon, or place it on `bg-status-*-subtle` with `text-text-primary`.
8. To change a token, edit `tokens/tokens.json` **and** the matching Figma variable, so the two stay identical. Never only one.

## Token → class cheat sheet
| Need | Class examples |
|---|---|
| Backgrounds | `bg-surface-page` `bg-surface-default` `bg-surface-subtle` `bg-surface-brand` `bg-surface-brand-subtle` `bg-surface-inverse` `bg-surface-overlay` |
| Text color | `text-text-primary` `text-text-secondary` `text-text-disabled` `text-text-inverse` `text-text-brand` `text-text-error` `text-text-success` `text-text-warning` |
| Borders | `border-border-subtle` `border-border-default` `border-border-strong` `border-border-focus` `border-border-error` |
| Buttons/actions | `bg-action-primary` `hover:bg-action-primary-hover` `bg-action-secondary` `bg-action-disabled` |
| Status | `bg-status-error` `bg-status-success` `bg-status-warning` `bg-status-*-subtle` |
| Type | `text-heading-51/38/28/21/16` `text-body-21/16/14` (+ `-bold`) `text-fine-print-12` (+ `-bold`) `text-label-16/14/12/10` (+ `-bold`) |
| Spacing | `p-inset-card` `p-inset-compact` `gap-stack-default` `gap-stack-tight` `gap-stack-section` `gap-inline-default` `gap-inline-tight` `px-page-margin-mobile` `tablet:px-page-margin-desktop` |
| Radius | `rounded-sm` (4) `rounded-md` (8) `rounded-lg` (16) `rounded-xl` (24) `rounded-full` |
| Elevation | `shadow-elevation-1` (cards) `shadow-elevation-2` (dropdowns) `shadow-elevation-3` (modals) |
| Screen sizes | mobile = no prefix · `tablet:` (926px+) · `desktop:` (1440px+) · `widescreen:` (1920px+). Tailwind's `sm/md/lg/xl` are switched off |
| Layout sizes | `w-rail-closed` (90) `w-rail-open` (364) `h-header-mobile` (72) `max-w-chat-column` (670) `w-wizard-chat` (428) `max-w-onboarding-form` (638) `max-w-modal` (736) |
| Responsive (auto-switch at tablet) | `p-inline-element-padding` (0 → 24) `rounded-inline-element` (0 → 12) `ml-user-message-offset` (64 → 128) |
| Page padding | mobile `px-page-margin-mobile` (24) · tablet+ `tablet:px-page-margin-desktop` (16) `py-page-top` (24) |

## Components
Read `docs/components.md` before building any screen. It lists every component, what it's for and when to use it. Use them; don't rebuild them. When you add a component, add a story and a catalog entry.

## Breakpoints & surfaces
Read `docs/breakpoints.md` before building any page. Every screen is one of 5 **surfaces**: Default Chat, Content Wizard, Onboarding, Single Screen, Modal. Build mobile-first:
- **Mobile (<926):** 72px black top header plus a menu drawer. No left rail.
- **Tablet+:** left rail (90 closed / 364 open). Content = viewport − rail.
- Default Chat column is fixed at 670 and centered. Wizard: chat 428 + fluid right panel. Onboarding: no rail, form 638 centered. Modal: 736 centered (mobile: full width minus 32 margins).

## Component structure
- `src/components/primitives/`: Button, Input, Checkbox, Toggle, Tag, Icon…
- `src/components/widgets/`: composed from primitives (BenefitCard, ClaimStatusTile, ReminderCard…)
- `src/components/surfaces/`: page shells and containers (AppShell, Sidebar, Modal, Drawer…)
- Name props the way the Figma component properties are named (`variant`, `size`, `disabled`, `hasIcon`).
- Put a short JSDoc comment on each component and prop saying what it is for and when to use it.

## Font
The app uses **Inter as a placeholder**. Söhne (Buch 400 / Halbfett 600) is the real Titan font and needs a Klim web license. When licensed: add the font files with `next/font/local`, keep the family name "Söhne", and swap the 21 Figma text styles. No other changes needed.
