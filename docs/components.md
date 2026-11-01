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

### SelectorInput [Selector Input]
`<SelectorInput legend options type="radio" | "checkbox" resizing="fill" | "hug" defaultValue? disabledOptions? onChange?>`
- A whole question: the legend plus bordered answer cards, grouped for screen readers. **Prefer this over loose Radio/Checkbox cards** in wizards and onboarding.
- **fill**: stacked full-width answers (long labels, most mobile cases). **hug**: short answers side by side (Yes / No / Not sure).

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

### Chat building blocks
A reply is `UserMessage` → `AiLoading` while waiting → one or more `AiMessage`s. Put the blocks below **inside** an `AiMessage`.

- **UserMessage** [User message]: `<UserMessage>text</UserMessage>`. Right-aligned gray bubble; always leaves a left gap.
- **AiMessage** [AI Message Block]: `<AiMessage aiAvatar?>…</AiMessage>`. Avatar on the first message of a reply only (`aiAvatar={false}` on follow-ups). Plain `<p>` inside gets Body/16; blocks are spaced 16px apart.
- **AiLoading** [AI Loading Text / Loading Mask]: `<AiLoading stage? skeleton?>`. Cycles "Gathering information… → Analyzing data… → Wrapping things up…" by itself. Use `skeleton` for long answers.
- **BulletList** [_ AI Bullet List / _ Bullet Item]: `<BulletList type="dot" | "number" | "letter" items>`. Numbers for steps in order. Use `<strong>Label:</strong> value` for key facts.
- **ActionFeedback** [Action Feedback]: `<ActionFeedback type="positive" | "negative" | "neutral" title? message?>`. Confirms the result of an action ("Contribution updated"). Not for general tips.
- **AiSelection** [_ AI Selection Item]: `<AiSelection options={[{label}]} selected? onSelect>`. 1–2 quick replies the AI offers ("Yes, update it" / "Not now"). Keep labels short; first person.
- **InlineInformation** [Inline Information]: `<InlineInformation items={[{label, value, muted?, dividerBefore?}]}>`. Gray box of label/value facts (before → after amounts).
- **InlineTable** [Inline Table – Responsive / – Scroll]: `<InlineTable columns rows layout="responsive" | "scroll" caption>`. Comparisons. **responsive** for 2–3 short columns, **scroll** for long text or 3+ columns.
- **ExampleScenario** [Example Scenario]: `<ExampleScenario title?>…</ExampleScenario>`. A worked example with numbers, between two rules.
- **UserRelevance** [User Relevance]: `<UserRelevance title?>…</UserRelevance>`. "How this applies to you": ties general info back to the person's own plan. Usually the last block of an explanation.
- Extended description + bullets [Figma] is just an `AiMessage` with paragraphs and a `BulletList`. There's no separate component.

### ChecklistItem [_ Checklist Item]
`<ChecklistItem title description? done? defaultOpen?>`. One task in a checklist; tap to expand. Stack them with no gap.

### ListItem [List Item]
`<ListItem label selected? onClick>`. One option in a dropdown menu or picker. Wrap the list in `role="listbox"` on a `shadow-elevation-2` panel.

## Surfaces (`src/components/surfaces/`)
See `docs/breakpoints.md` for layout rules.

| Surface | Component | Status |
|---|---|---|
| App shell (rail + mobile header) | `AppShell`, `Sidebar` | ✅ |
| Default Chat | `DefaultChat` | ✅ |
| Content Wizard | `ContentWizard` (inside `AppShell`) | ✅ sample at `/wizard` |
| Onboarding | `Onboarding` + `FormRow` (no `AppShell`) | ✅ sample at `/onboarding` |
| Single Screen | `SingleScreen` (inside `AppShell`) | ✅ sample at `/settings` |
| Modal | `Modal` | ✅ |

### Picking a surface
- **Default Chat**: open-ended questions; the chat is the whole page.
- **ContentWizard**: a guided, multi-step task (enrollment, leave planning). The step is on the right, the chat on the left for questions. Each step: one heading, one question or group of fields, Back/Next.
- **Onboarding**: account setup before entering the app. One centered form per page, one primary button.
- **SingleScreen**: a standalone page reached from the rail (Settings, Benefits Hub).
- **Modal**: a confirmation or short explanation over any surface. Bottom sheet on mobile.

### ContentWizard
`<ContentWizard flowTitle stepTitle stepDescription? chat? shortlist? nav={{backLabel?, nextLabel, nextDisabled?}} onExit onSend>{step content}</ContentWizard>`

### Onboarding
`<Onboarding title description? submitLabel? onSubmit>{fields}</Onboarding>`. Use `<FormRow>` for two short fields side by side.

### SingleScreen
`<SingleScreen title headerActions?>{content}</SingleScreen>`

### Modal [Modals]
`<Modal open onClose title size="small" | "large" actions>…</Modal>`
- **small**: confirm a decision ("You're about to exit this experience."). **large**: explain something with an image.
- Actions: secondary first, the one primary last ("No, stay" / "Yes, continue"). Esc, × and clicking outside all close it.

### FlowHeader [Tab Comp]
`<FlowHeader title shortlist?={{ total, onClick }} onExit>`. The dark bar across the top of a guided flow (Open Enrollment). Exit should open a small Modal to confirm.

### BottomNav [Bottom_Nav]
`<BottomNav backLabel? nextLabel variant="primary" | "secondary" nextDisabled? onBack onNext>`. Back/Next bar at the bottom of wizard and onboarding steps. Leave out `backLabel` on the first step.

## Not built yet
Mobile header [Mobile_Header_1] is part of `AppShell`. Everything else in the Figma page is built.
If a screen needs something new, build it from the Figma component first, add a story and add it to this catalog.
