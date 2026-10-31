# Titan Design System: Token Audit & Proposed Tokens

Source: Figma file "[Testing] Nayya Titan Design System", page *Design System (2026-Q1)*. Audited Oct 30, 2026.
Status: **APPROVED Oct 30, 2026. Colors matched to the Titan Color and Typography System file.** Primary #223C45 · Söhne (web license needed) · colors & type matched to the Titan Color and Typography System · light theme only · primary/900 #0F232A.

---

## 1. What I found

**The good news:** about 40% of the layers on the design system page (10,022 of 25,908) are already linked to variables, and most text uses text styles. The structure (Components, Widgets, Surfaces) is already there.

**The problems to fix:**

| Issue | What it looks like | Why it matters for code/AI |
|---|---|---|
| **6 competing color sources** | Variables come from `Titan`, `Colors`, `Theming Colors`, `Variable collection`, `Tokens`, plus paint styles (`Core/Cobalt-6`, `Core/Isabelline-9`) | Claude can't tell which one is "the" system |
| **Same name, different color** | `neutral/600` = #9A9692 in one library, #625D59 or #9E9E9E in others. `neutral/900` = #2D2A28, #333333 or #1E1C1B | Tokens must mean one thing |
| **Inverted naming** | In the `Colors` library, `core/content` = #FBFBFB (light) and `core/background` = #1A1A1A (dark). In `Titan` it's the opposite | Looks like a dark-theme library mixed into light screens |
| **Two different brand blues** | Titan teal-navy **#223C45** (~670 uses) vs. cobalt **#003184 / #003DA5** (~390 uses) | Need one primary |
| **Two fonts** | Söhne (~3,800 text layers) and Inter (~1,600), plus a little Circular | Pick one |
| **Duplicate text styles** | `Label/16`, `Label/Label 16` and `Label/Label M (16-18)` are the same thing. Body 16 exists as 16/24 *and* 16/26 | ~70 styles where ~15 are needed |
| **Off-scale spacing** | Mostly 4, 6, 8, 12, 16, 24, 48, but also 10, 14, 15, 18, 36, and fractional values like 1.577, 4.73, 7.88 | Snap to one scale |
| **Off-scale radius** | 4 dominates (1,762 uses), then 8, 10, 13, 16, 24 and many one-offs (3.33, 19.3, 29, 54, 94) | Snap to 5 steps |
| **Shadows** | No effect styles; one 0-blur 25% "shadow" used 374× (probably acting as a hairline border) | Define 2 to 3 elevations |
| **Library sprawl** | 7 community kits attached (Material 3, Simple DS, iOS 18/26, macOS, watchOS, visionOS) | Pollutes search results for AI |
| **File hygiene** | Duplicate `Widgets_Q1` / `Components__Q1` frames, unnamed frames ("Frame 2147258463"), `Component 6` | Hard for AI to find the right one |

**Accessibility flags** (contrast on the #FBFBFB background, needs 4.5:1 for body text):
- #9A9692 (neutral 500) is **2.84:1** ✗. Use only for disabled text or placeholders, never body text.
- #15A961 (success green) is **2.95:1** ✗ as text. It's fine as a fill or icon; success *text* needs a darker green.
- #F9B12A (warning) is **1.8:1** ✗ as text. Same rule.
- #1A1A1A, #625D59, #223C45, #003184 and #D53119 all pass ✓.

---

## 2. Decisions needed from you

1. **Primary brand color:** Titan teal-navy **#223C45**, or cobalt **#003184**? (Cobalt shows up as the `Core/Cobalt-6` style and in `Theming Colors`. Is that a separate client theme?)
2. **Font:** **Söhne** (used most) or **Inter**? Note that Söhne is a paid Klim font, so a **web license** is needed to use it in the app. Inter is free.
3. **Themes:** light only for now, or should we plan for dark mode or white-label client themes? (`Colors` looks like a dark theme and `Theming Colors` looks like a client theme.)
4. **Darkest brand shade:** primary 900 = **#0F232A** (Titan) or **#003142** (`brand/nayya/blue/900`)?

**Decided (Oct 30, 2026):** 1 → #223C45 · 2 → Söhne · 3 → light only (names allow themes later) · 4 → #0F232A.

---

## 3. Proposed tokens

### 3a. Primitives (raw palette, never used directly in components)

**Source of truth:** [Titan Color and Typography System](https://www.figma.com/design/EbjAj6saBxpkAcBrcSl2g9/Titan-Color-and-Typography-System?node-id=2001-5714). Every value below matches that file except `base/white` (marked **Addition**).

**color/primary**
| Token | Value |
|---|---|
| color/primary/50 | #F1F5F7 |
| color/primary/100 | #A8BECB |
| color/primary/200 | #648393 |
| color/primary/400 | #3F5764 |
| color/primary/600 | #223C45 |
| color/primary/900 | #0F232A |

**color/neutral** (warm grays)
| Token | Value |
|---|---|
| color/neutral/50 | #FCFBF9 |
| color/neutral/100 | #F3F2F1 |
| color/neutral/200 | #E7E5E3 |
| color/neutral/300 | #D8D5D2 |
| color/neutral/400 | #BCB8B5 |
| color/neutral/500 | #9A9692 |
| color/neutral/600 | #625D59 |
| color/neutral/700 | #463F3C |
| color/neutral/800 | #2D2A28 |
| color/neutral/900 | #1E1C1B |

**color/base** (Titan "One-offs")
| Token | Value | Note |
|---|---|---|
| color/base/background | #FBFBFB | Titan "Background" |
| color/base/content | #1A1A1A | Titan "Content" |
| color/base/overlay | #2D2A28 @ 60% | Titan "Modal" |
| color/base/white | #FFFFFF | **Addition**: card and modal surfaces |

**color/status**
| Token | Value | Note |
|---|---|---|
| color/success/50 | #D0EEDF | |
| color/success/600 | #15A961 | fills and icons only (3:1 as text) |
| color/success/800 | #15A961 | success text (same as 600, per your decision; 3:1, below AA) |
| color/warning/50 | #FEEFD4 | |
| color/warning/600 | #F9B12A | fills and icons only (1.8:1 as text); put dark text on top |
| color/warning/800 | #FFB52C | warning text (per your decision; 1.8:1, below AA) |
| color/error/50 | #FADBD6 | |
| color/error/600 | #D53119 | passes as text ✓ |

**color/chart:** blue #5D819E, green #559E7F

> Note: in the Titan file, 50/100/200 and 400/600/900 of Success, Warning and Error are duplicates of the same two values. They are collapsed to 50 and 600 here.

### 3b. Semantic tokens (what components use)

| Token | → Primitive | Use |
|---|---|---|
| **Surfaces** | | |
| surface/page | base/background | app background |
| surface/default | base/white | cards, modals |
| surface/subtle | neutral/100 | secondary panels, table stripes |
| surface/brand | primary/600 | brand blocks, primary buttons |
| surface/brand-subtle | primary/50 | highlighted cards, selected rows |
| surface/inverse | base/content | dark tooltips and banners |
| surface/overlay | base/overlay | modal scrim |
| **Text** | | |
| text/primary | base/content | body and headings |
| text/secondary | neutral/600 | supporting text |
| text/disabled | neutral/500 | disabled and placeholder text only |
| text/inverse | base/background | text on dark or brand surfaces |
| text/brand | primary/600 | links, emphasis |
| text/error | error/600 | |
| text/success | success/800 | |
| text/warning | warning/800 | |
| **Borders** | | |
| border/subtle | neutral/200 | dividers |
| border/default | neutral/400 | inputs, cards |
| border/strong | base/content | selected or emphasized items |
| border/focus | primary/400 | focus ring |
| border/error | error/600 | |
| **Actions** | | |
| action/primary | primary/600 | primary button fill |
| action/primary-hover | primary/900 | |
| action/secondary | base/white | secondary button fill (with border/strong) |
| action/disabled | neutral/200 | |
| **Status backgrounds** | | |
| status/error-subtle | error/50 | |
| status/success-subtle | success/50 | |
| status/warning-subtle | warning/50 | |

### 3c. Spacing (4px base, plus 2 and 6 for tight UI)

| Token | Value | Replaces |
|---|---|---|
| space/0 | 0 | |
| space/0-5 | 2 | |
| space/1 | 4 | |
| space/1-5 | 6 | |
| space/2 | 8 | 7.88, 9, 10 |
| space/3 | 12 | 11, 14, 14.5, 15 |
| space/4 | 16 | 18 |
| space/6 | 24 | 20 |
| space/8 | 32 | 36 |
| space/12 | 48 | 40 |
| space/16 | 64 | 56, 72 |

Semantic spacing:
| Token | → | Use |
|---|---|---|
| spacing/inline/tight | space/1 | icon ↔ label |
| spacing/inline/default | space/2 | between buttons and chips |
| spacing/stack/tight | space/1-5 | label ↔ input |
| spacing/stack/default | space/3 | items in a list or form |
| spacing/inset/compact | space/3 | buttons, inputs, tags |
| spacing/inset/card | space/6 | inside cards and widgets |
| spacing/stack/section | space/12 | between page sections |
| spacing/page/margin-mobile | space/4 | |
| spacing/page/margin-desktop | space/12 | |

### 3d. Radius
| Token | Value | Replaces |
|---|---|---|
| radius/sm | 4 | 2, 3, 5 |
| radius/md | 8 | 6, 10 |
| radius/lg | 16 | 12, 13, 14 |
| radius/xl | 24 | 29, 30 |
| radius/full | 9999 | pills and avatars (54, 94, 100) |

### 3e. Typography

**Source of truth:** [Titan Color and Typography System → Typography](https://www.figma.com/design/EbjAj6saBxpkAcBrcSl2g9/Titan-Color-and-Typography-System?node-id=7-584). Names and values match that file 1:1, so a Figma style and its code token share the same name (`Body/16 Bold` ↔ `typography.body.16-bold`).

Font: **Söhne**. Regular = Buch (400), Bold = Halbfett (600). Letter spacing 0 throughout.

| Style | Size / line height | Bold variant |
|---|---|---|
| Heading/51 | 51 / 68 | (always bold) |
| Heading/38 | 38 / 52 | (always bold) |
| Heading/28 | 28 / 38 | (always bold) |
| Heading/21 | 21 / 30 | (always bold) |
| Heading/16 | 16 / 22 | (always bold) |
| Body/21 | 21 / 36 | Body/21 Bold |
| Body/16 | 16 / 26 | Body/16 Bold |
| Body/14 | 14 / 24 | Body/14 Bold |
| Fine print/12 | 12 / 20 | Fine print/12 Bold |
| Label/16 | 16 / 18 | Label/16 Bold |
| Label/14 | 14 / 16 | Label/14 Bold |
| Label/12 | 12 / 14 | Label/12 Bold |
| Label/10 | 10 / 12 | Label/10 Bold |

That's 21 styles, down from ~70 in the working file. Mapping the old duplicates: `Body/Body 16`, `Body M (16-24)` → **Body/16** (line height becomes 26). `Label/Label 14`, `Label S (14-16)` → **Label/14**. `Heading/Heading 28`, `H1 (28-38)` → **Heading/28**. `H2 (21-30)` → **Heading/21**. `H3 (16-22)` → **Heading/16**. Inter and Circular text → the same-size Söhne style.

### 3f. Elevation
| Token | Value | Use |
|---|---|---|
| elevation/1 | 0 1 4 rgba(0,0,0,.08) | cards |
| elevation/2 | 0 4 8 rgba(0,0,0,.15) | dropdowns, popovers |
| elevation/3 | 0 4 20 rgba(0,0,0,.25) | modals |

The 0-blur, 25% "shadow" used 374× should become a **border** (`border/subtle`) instead.

---

## 4. Next steps after approval
1. Create these as variables and styles in a clean Figma **Titan Foundations** collection (primitives hidden from publishing).
2. Rebind the existing components to the new tokens, starting with the most-used: buttons, inputs, cards, modals.
3. Detach the unused community libraries and remove duplicate frames.
4. Export to `tokens/tokens.json` in the GitHub repo, then set up Style Dictionary, Tailwind and `CLAUDE.md`.
