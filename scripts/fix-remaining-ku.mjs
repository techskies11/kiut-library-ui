#!/usr/bin/env node
/** Segunda pasada: prefija utilidades que quedaron sin ku: al inicio del token. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const CUSTOM_CLASS = new Set(['group', 'peer', 'light-mode', 'dark-mode', 'story']);
const CUSTOM_PREFIXES = [
  'kiut-', 'chart-', 'storybook-', 'metric-', 'dn-', 'boxplot-', 'hover-circle',
  'primary-rail', 'secondary-panel', 'footer-section', 'ksn-', 'container-value',
  'stats-section', 'chart-line-canvas-host', 'kiut-modal', 'kiut-range-input',
  'csat-p95-metric', 'ai-revenue-metric', 'value',
];

function isCustomClass(token) {
  if (!token || CUSTOM_CLASS.has(token)) return true;
  if (token.startsWith('ku:')) return true;
  return CUSTOM_PREFIXES.some((p) => token === p || token.startsWith(p));
}

function needsKu(token) {
  if (!token || isCustomClass(token)) return false;
  if (token.startsWith('ku:')) return false;
  return (
    token.includes(':') ||
    token.startsWith('[') ||
    /^(flex|grid|inline|block|hidden|fixed|relative|absolute|sticky|static|border|rounded|shadow|ring|truncate|pointer-events|opacity|transition|inset|visible|invisible|group-hover|peer-|sm:|md:|lg:|xl:|2xl:|dark:|hover:|focus|active:|disabled:|placeholder:|text-|bg-|border-|ring-|focus-|dark-|hover-|active-|placeholder-|w-|h-|min-|max-|p-|px-|py-|pt-|pb-|pl-|pr-|m-|mx-|my-|mt-|mb-|ml-|mr-|gap-|space-|items-|justify-|self-|place-|shrink|grow|order-|col-|row-|object-|aspect-|overflow-|z-|from-|via-|to-|font-|leading-|tracking-|cursor-|select-|resize-|list-|tabular-|sr-only|backdrop-|will-change|box-|break-|columns-|table-|float-|clear-|isolate|origin-|scale-|rotate-|translate-|skew-|filter|blur|brightness|contrast|grayscale|invert|saturate|sepia|fill-|stroke-|accent-|caret-|decoration-|underline|overline|capitalize|uppercase|lowercase|italic|not-italic|align-|vertical-align|snap-|touch-|scroll-|overscroll-|hyphens|mix-|appearance|contain|content|duration-|ease-|delay-|animate-|bottom-|top-|left-|right-|whitespace-)/.test(
      token
    )
  );
}

function prefixClassString(str) {
  if (!str || str.includes('${')) return str;
  return str
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => (needsKu(t) ? `ku:${t}` : t))
    .join(' ');
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', 'dist'].includes(name)) walk(full, files);
    } else if (/\.(vue|ts)$/.test(name)) files.push(full);
  }
  return files;
}

let n = 0;
for (const file of walk(path.join(root, 'src'))) {
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;
  c = c.replace(/(?<![:\w])(class\s*=\s*")([^"]*)(")/g, (_, a, b, d) => a + prefixClassString(b) + d);
  c = c.replace(/(?<![:\w])(class\s*=\s*')([^']*)(')/g, (_, a, b, d) => a + prefixClassString(b) + d);
  c = c.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'/g, (match, inner) => {
    if (!inner || inner.length > 800 || /^[\s:]*$/.test(inner) || inner.length <= 2) return match;
    const tokens = inner.split(/\s+/).filter(Boolean);
    if (!tokens.some(needsKu)) return match;
    const next = prefixClassString(inner);
    return next === inner ? match : `'${next}'`;
  });
  if (c !== orig) {
    fs.writeFileSync(file, c, 'utf8');
    n++;
  }
}
console.log(`Fixed remaining prefixes in ${n} files`);
