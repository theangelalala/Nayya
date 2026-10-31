// Turns tokens/tokens.json (the source of truth) into the files the app uses.
//   src/styles/tokens.css  -> CSS variables, e.g. --surface-page (same names as Figma code syntax)
//   src/styles/theme.css   -> Tailwind classes, e.g. bg-surface-page, text-body-16, p-inset-card
// Run with: npm run tokens   (also runs automatically before dev, build and storybook)

import StyleDictionary from 'style-dictionary';

const isPrimitive = (t) => t.path[0] === 'color' || t.path[0] === 'space' || t.path[0] === 'font';
const px = (v) => (typeof v === 'number' ? `${v}px` : v);

// Tailwind v4 theme. Default Tailwind palettes, radii, shadows and font sizes are switched off,
// so only Titan tokens can be used (no bg-blue-500, no rounded-3xl, no text-2xl).
StyleDictionary.registerFormat({
  name: 'tailwind/theme',
  format: ({ dictionary }) => {
    const weights = Object.fromEntries(
      dictionary.allTokens.filter((t) => t.path[0] === 'font' && t.path[1] === 'weight').map((t) => [t.path[2], t.$value]),
    );
    const lines = [];
    const add = (s) => lines.push(`  ${s}`);
    add('--color-*: initial;');
    add('--radius-*: initial;');
    add('--shadow-*: initial;');
    add('--text-*: initial;');
    add('--color-transparent: transparent;');
    add('--font-sans: var(--font-family-base);');
    for (const t of dictionary.allTokens) {
      const type = t.$type;
      if (isPrimitive(t) && type !== 'dimension') continue; // components use semantic colors only
      // Spacing and radius use resolved values: their Tailwind names match the CSS variable
      // names exactly, and var(--x) inside --x would be a loop.
      if (type === 'color' && !isPrimitive(t)) add(`--color-${t.name}: var(--${t.name});`);
      else if (t.path[0] === 'spacing') add(`--spacing-${t.path.slice(1).join('-')}: ${t.$value};`);
      else if (t.path[0] === 'radius') add(`--radius-${t.path[1]}: ${t.$value};`);
      else if (t.path[0] === 'elevation') add(`--shadow-elevation-${t.path[1]}: var(--${t.name});`);
      else if (type === 'typography') {
        const v = t.original.$value;
        const weight = (ref) => weights[ref.replace(/[{}]/g, '').split('.').pop()];
        const n = t.path.slice(1).join('-');
        add(`--text-${n}: ${px(v.fontSize)};`);
        add(`--text-${n}--line-height: ${px(v.lineHeight)};`);
        add(`--text-${n}--font-weight: ${weight(v.fontWeight)};`);
      }
    }
    return `/* Generated from tokens/tokens.json by tokens/build.mjs. Do not edit by hand. */\n@theme inline {\n${lines.join('\n')}\n}\n`;
  },
});

const sd = new StyleDictionary({
  source: ['tokens/tokens.json'],
  usesDtcg: true,
  log: { warnings: 'disabled' },
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true, fileHeader: () => ['Generated from tokens/tokens.json. Do not edit by hand.'] },
        },
      ],
    },
    tailwind: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [{ destination: 'theme.css', format: 'tailwind/theme' }],
    },
  },
});

await sd.buildAllPlatforms();
console.log('✓ tokens built → src/styles/tokens.css, src/styles/theme.css');
