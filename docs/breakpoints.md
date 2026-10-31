# Titan breakpoints & surface layout rules

Source: Figma `[Angela] Nayya Titan Design System` → **Surfaces_Q1** frame (node 236:23544), read Oct 30, 2026.
Surfaces define the page structure. Widgets and components sit inside surfaces.

## 1. Breakpoints

| Name | Range | Design frame | Code variant |
|---|---|---|---|
| **Mobile** | 0 – 925px | 375 / 402px | *(default, no prefix)* |
| **Tablet** | 926 – 1439px | 1192px | `tablet:` |
| **Desktop** | 1440 – 1919px | 1440px | `desktop:` |
| **Widescreen** | 1920px + | 1920px | `widescreen:` |

Mobile-first: write the mobile layout, then add `tablet:` / `desktop:` / `widescreen:` overrides.
"Under 926px" is the exact mobile cut-off from the Surfaces frame. The tablet/desktop/widescreen ranges start at each design frame's width. *(Assumption, please confirm.)*

## 2. App shell (all surfaces except Onboarding)

| | Mobile | Tablet · Desktop · Widescreen |
|---|---|---|
| Navigation | **Top header**, 72px tall, black, logo centered, menu icon left. Menu opens a full-screen drawer | **Left rail** on the left edge |
| Left rail closed | n/a | **90px** fixed (icons only) |
| Left rail open | n/a | **364px** fixed (labels, Chat History, Reminders cards, Benefits Hub, Settings, Log out) |
| Content area | full width | viewport − rail width, fluid |
| Content padding | 24px sides | 24px top/bottom, 16px sides |

## 3. Surfaces

### Default Chat
| | Mobile | Tablet+ |
|---|---|---|
| Chat column | full width, 24px side margins | **fixed 670px**, centered in the content area |
| Chat input | pinned to bottom, full width (12px margins) | 670px, under the conversation |
| Rail | header + drawer | closed 90 or open 364; chat stays 670 and re-centers |

### Content Wizard (chat + right panel)
| | Mobile | Tablet+ (rail closed) | Tablet+ (rail open) |
|---|---|---|---|
| Chat panel | full screen | **fixed 428px** (padding 24/12) on the left | hidden behind the rail |
| Right panel (wizard content) | opens as full screen | **fluid**: viewport − 90 − 428 (674 @1192, 922 @1440, 1402 @1920) | fluid: viewport − 364, shown in "mobile design" |

### Onboarding
| | Mobile | Tablet+ |
|---|---|---|
| Navigation | header only, no rail | top header bar only, no rail |
| Form | full width, 24px side padding (327px form @375) | **fixed 638px**, centered |

### Single Screen
| | Mobile | Tablet+ |
|---|---|---|
| Screen | full width under header | fills the content area (1350 @1440 rail closed, 1076 rail open; fluid at tablet/widescreen) |

### Modal
| | Mobile | Tablet+ |
|---|---|---|
| Dialog | full width minus 32px margins (338px @402), anchored to the bottom | **fixed 736px**, centered |
| Scrim | `surface/overlay` over everything | same |

## 4. Responsive tokens (values change with breakpoint)
Replaces the old **Breakpoints** library collection.

| Token | Mobile | Tablet+ | Used by |
|---|---|---|---|
| `layout/inline-element/padding` | 0 | 24px | Inline Table, Inline Information (full-bleed on mobile, inset card on larger) |
| `layout/inline-element/radius` | 0 | 12px | same: square on mobile, rounded on larger |
| `layout/user-message/offset` | 64px | 128px | left offset of the user's chat bubble |

In **Figma** (free plan = one mode per collection) each is two variables, `…-mobile` and `…-desktop`. Pick the one that matches the frame you're designing.
In **code** each is one CSS variable that switches automatically at the Tablet breakpoint.

## 5. Fixed layout sizes

| Token | Value |
|---|---|
| `layout/rail-closed` | 90px |
| `layout/rail-open` | 364px |
| `layout/header-mobile` | 72px |
| `layout/chat-column` | 670px |
| `layout/wizard-chat` | 428px |
| `layout/onboarding-form` | 638px |
| `layout/modal` | 736px |

## 6. Open questions
1. **Breakpoint ranges.** Does a 1300px laptop get the Tablet layout (as written) or Desktop?
2. **Mobile side margin.** Designs use 24px (chat, onboarding) and 32px (home). Tokens now use **24px**. OK?
3. **Inline element radius 12px** isn't on the radius scale (4/8/16/24). Keep 12 as a layout exception, or snap to 8 or 16?
4. **User message offset on desktop.** The `User message_Desktop` component currently shows 64px (the mobile value), because no screen size was set. Should desktop use 128px?
