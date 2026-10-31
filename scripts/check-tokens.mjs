// Guardrail: fails if UI code uses raw values instead of Titan tokens.
// Runs as part of `npm run lint`. Generated files in src/styles are skipped.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'src';
const SKIP = ['src/styles'];
const rules = [
  { re: /#[0-9a-fA-F]{3,8}\b/, msg: 'hex color: use a color token (e.g. bg-surface-default, text-text-secondary)' },
  { re: /\brgba?\(/, msg: 'rgb() color: use a color token' },
  { re: /\b(?:bg|text|border|fill|stroke|ring|outline|from|to|via)-\[[^\]]+\]/, msg: 'arbitrary Tailwind color/size: use a token class' },
  { re: /\b(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-x|space-y)-\[[^\]]+\]/, msg: 'arbitrary spacing: use a spacing token (e.g. p-inset-card, gap-stack-default)' },
  { re: /\brounded-\[[^\]]+\]/, msg: 'arbitrary radius: use rounded-sm|md|lg|xl|full' },
  { re: /\b(?:p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y)-(?:5|7|9|10|11|13|14|15)\b/, msg: 'off-scale spacing: Titan scale is 0, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16' },
];

const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (SKIP.some((s) => p.startsWith(s))) continue;
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|jsx?|css)$/.test(p) && !p.endsWith('globals.css')) files.push(p);
  }
};
walk(ROOT);

const problems = [];
for (const file of files) {
  readFileSync(file, 'utf8').split('\n').forEach((line, i) => {
    if (line.includes('tokens-ignore')) return;
    for (const { re, msg } of rules) if (re.test(line)) problems.push(`${file}:${i + 1}  ${msg}\n    ${line.trim()}`);
  });
}

if (problems.length) {
  console.error(`✗ ${problems.length} hardcoded value(s) found:\n\n${problems.join('\n\n')}\n`);
  process.exit(1);
}
console.log(`✓ token check passed (${files.length} files)`);
