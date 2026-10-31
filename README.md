# Nayya

Web app built on the **Titan design system**.

## Run it on your computer
You need [Node.js](https://nodejs.org) (LTS) installed. Then, in this folder:

```bash
npm install          # first time only
npm run dev          # the app → http://localhost:3000
npm run storybook    # component catalog → http://localhost:6006
```

Or just ask Claude Code: *"run the app and Storybook"*.

## How it fits together
```
Figma variables & styles  ⇄  tokens/tokens.json  →  src/styles/*.css  →  components  →  screens
   (design source)            (code source)          (generated)
```

- `tokens/`: design tokens. `tokens.json` is the source of truth; `build.mjs` turns it into CSS and Tailwind classes.
- `src/components/`: primitives → widgets → surfaces.
- `src/foundations/`: the live token reference page (shown at `/` and in Storybook).
- `docs/titan-token-audit.md`: the audit and the decisions behind the tokens.
- `CLAUDE.md`: the rules Claude follows when building here.
- `scripts/check-tokens.mjs`: blocks hardcoded colors and off-scale spacing (`npm run lint`).
