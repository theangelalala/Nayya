# Titan component catalog

Read this before building a screen. Use these components; don't rebuild them.
Each has a Storybook story showing every variant (`npm run storybook`).
Figma names are in brackets, so you can match the design file.

## Primitives (`src/components/primitives/`)

### Button [New_Buttons]
`<Button variant="primary" | "secondary" | "text" destructive? iconLeft? iconRight? disabled?>`
- **primary**: the one main action on a surface. **Max one per view** (or per modal / wizard step).
- **secondary**: supporting actions: Cancel, Back, alternatives. Pair with a primary.
- **text**: low-emphasis actions inside content ("See all", "Edit").
- **destructive**: removing or discarding (secondary or text only, never primary).
- Icons: `caret-right-16` after the label for forward/continue, `caret-left-16` before it for back.
- Order: secondary left, primary right. On mobile, stack full-width with primary on top.
- Labels are verbs in sentence case: "Save changes", "Continue", not "OK" or "SUBMIT".

### TextField / DateField [Input Field, Dropdown Type=Date]
`<TextField label helperText? status="default" | "error" | "warning" iconRight? disabled? …input props>`
- Floating label: inside the field when empty, small above the value once filled or focused.
- **error**: input is invalid; helperText says how to fix it ("Enter a full email address").
- **warning**: allowed but unusual; helperText explains ("This looks low. Please double-check.").
- `DateField`: dates as MM/DD/YYYY with the calendar icon.
- Always give a `label`. Never use placeholder text as the only label.

### SelectField [Dropdown Type=Text]
`<SelectField label options={[{value, label}]} helperText? status? disabled?>`
- Pick one option from 5+ choices. For 2–4 choices, use **Radio** (cards) so all options are visible.

### Checkbox [Checkbox / Selectors]
`<Checkbox label appearance="card" | "plain" …>`
- Choose **any number** of options.
- **card** (default): bordered, whole row clickable. Use for answers in forms and wizards.
- **plain**: dense lists, settings, "I agree" lines.

### Radio [Radio buttons]
`<Radio name label appearance="plain" | "card" …>`
- Choose **exactly one**. Give options in a group the same `name`, and wrap them in a `<fieldset>` with a `<legend>`.
- Use **card** for important choices (coverage level, plan type).

### Toggle [Toggle]
`<Toggle label …>`
- On/off settings that **take effect immediately** (notifications). If the change needs a Save button, use a Checkbox instead.

### Icon
`<Icon name="…" />`. Takes its color from the text color around it. Names are in `Icon.tsx`.

### Logo
`<Logo variant="full" | "mark" />`. Wordmark (open rail, mobile header) or N mark (closed rail).

## Widgets (`src/components/widgets/`)

### ReminderCard [Reminder Card]
`<ReminderCard title description icon due? progress? href?>`
- Time-sensitive tasks for the user. `due` shows a date pill; `progress` shows a bar with "2 of 10 tasks".
- Lives in the left rail's Reminders section and the mobile card carousel.

### ChatInput [AI Prompt]
`<ChatInput placeholder? onSubmit showSparkle?>`. The pill-shaped message box with the send button. One per chat surface.

### PromptSuggestions [Suggestions / _ Bullet Item]
`<PromptSuggestions suggestions onSelect heading?>`. 2–4 starter prompts under the chat input, written as things the user would say.

## Surfaces (`src/components/surfaces/`)
See `docs/breakpoints.md` for layout rules.

| Surface | Component | Status |
|---|---|---|
| App shell (rail + mobile header) | `AppShell`, `Sidebar` | ✅ |
| Default Chat | `DefaultChat` | ✅ |
| Content Wizard | | to build |
| Onboarding | | to build |
| Single Screen | | to build |
| Modal | | to build |

## Not built yet (exist in Figma)
Tabs [Tab Comp], Modal [Modals], Bottom navigation [Bottom_Nav], Mobile header [Mobile_Header_1], Selector Input (multi-select list), List Item, Inline Table (scroll / responsive), Inline Information, AI Message Block, User Message, AI Loading (text / mask), Action Feedback, Checklist Item, Example Scenario, Extended description + bullets, User Relevance.
If a screen needs one of these, build it from the Figma component first, add a story and add it to this catalog.
