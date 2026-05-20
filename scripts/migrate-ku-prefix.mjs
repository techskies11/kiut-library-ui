#!/usr/bin/env node
/**
 * Antepone el prefijo Tailwind v4 `ku:` a utilidades en class strings.
 * Uso: node scripts/migrate-ku-prefix.mjs [--write]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const write = process.argv.includes('--write');

const CUSTOM_CLASS = new Set([
  'group',
  'peer',
  'light-mode',
  'dark-mode',
  'story',
  'true',
  'false',
]);

const CUSTOM_PREFIXES = [
  'kiut-',
  'chart-',
  'storybook-',
  'metric-',
  'dn-',
  'boxplot-',
  'hover-circle',
  'primary-rail',
  'secondary-panel',
  'footer-section',
  'ksn-',
  'container-value',
  'stats-section',
  'chart-line-canvas-host',
  'kiut-modal',
  'kiut-range-input',
  'csat-p95-metric',
  'ai-revenue-metric',
];

const VARIANT_RE =
  /^(?:(?:sm|md|lg|xl|2xl|max-sm|max-md|max-lg|max-xl|min-sm|min-md|min-lg|min-xl|hover|focus|focus-visible|focus-within|active|disabled|visited|first|last|only|odd|even|empty|open|checked|indeterminate|default|required|valid|invalid|in-range|out-of-range|placeholder|autofill|read-only|group-hover|group-focus|group-focus-within|group-active|group-disabled|peer-hover|peer-focus|peer-focus-within|peer-active|peer-disabled|dark|light|rtl|ltr|before|after|placeholder|file|marker|selection|first-line|first-letter|backdrop|details|summary)-)+/;

const UTILITY_RE =
  /^(?:flex|inline-flex|grid|inline-grid|block|inline-block|inline|hidden|contents|absolute|relative|fixed|sticky|static|inset|top|right|bottom|left|z-|w-|h-|min-|max-|size-|p-|px-|py-|pt-|pr-|pb-|pl-|m-|mx-|my-|mt-|mr-|mb-|ml-|gap-|space-|divide-|bg-|text-|font-|leading-|tracking-|antialiased|border|rounded|shadow|ring|outline|opacity|transition|duration|ease|delay|animate|truncate|whitespace|break|overflow|overscroll|scroll|items-|justify-|content-|self-|place-|shrink|grow|basis|order|col-|row-|object-|aspect-|cursor|pointer-events|select|resize|list-|tabular-nums|sr-only|not-sr-only|visible|invisible|backdrop-|from-|via-|to-|fill-|stroke-|accent-|caret-|decoration-|underline|overline|line-through|no-underline|uppercase|lowercase|capitalize|normal-case|italic|not-italic|align-|vertical-align|clear-|float-|isolate|isolation|box-|break-|columns-|table-|caption-|border-collapse|border-separate|table-layout|origin-|transform|scale-|rotate-|translate-|skew-|transform-none|filter|blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|saturate|sepia|will-change|contain|content|snap-|touch-|scroll-|hyphens|mix-|appearance|\[)/;

function isCustomClass(token) {
  if (!token || CUSTOM_CLASS.has(token)) return true;
  if (token.startsWith('ku:')) return true;
  if (/^[\[{]/.test(token) || /^[}\]]/.test(token)) return true;
  return CUSTOM_PREFIXES.some((p) => token === p || token.startsWith(p) || token.includes(p));
}

function isTailwindUtility(token) {
  if (isCustomClass(token)) return false;
  if (token.includes(':') || token.startsWith('[')) return true;
  if (VARIANT_RE.test(token)) return true;
  if (UTILITY_RE.test(token)) return true;
  if (/^(flex|grid|inline|block|hidden|fixed|relative|absolute|sticky|static|border|rounded|shadow|ring|truncate)$/.test(token))
    return true;
  if (/^(border-|rounded-|shadow-|ring-|text-|bg-|font-|leading-|tracking-|items-|justify-|self-|place-|shrink|grow|order-|col-|row-|gap-|space-|divide-|p-|m-|w-|h-|min-|max-|size-|z-|overflow-|opacity-|transition-|duration-|ease-|animate-|cursor-|pointer-events-|select-|resize-|list-|tabular-|sr-only|visible|invisible|backdrop-|from-|via-|to-|object-|aspect-|box-|break-|columns-|table-|float-|clear-|isolate|origin-|scale-|rotate-|translate-|skew-|filter|blur|brightness|contrast|grayscale|invert|saturate|sepia|fill-|stroke-|accent-|caret-|decoration-|underline|overline|capitalize|uppercase|lowercase|italic|not-italic|align-|vertical-align|snap-|touch-|scroll-|overscroll-|hyphens|mix-|appearance|will-change|contain|content|flex-|grid-)/.test(token))
    return true;
  return false;
}

function prefixToken(token) {
  const t = token.trim();
  if (!t || t.startsWith('ku:')) return t;
  if (!isTailwindUtility(t)) return t;
  return `ku:${t}`;
}

function prefixClassString(str) {
  if (!str || typeof str !== 'string') return str;
  if (str.includes('${') || str.includes('[') && str.includes(',')) return str;
  return str
    .split(/\s+/)
    .filter(Boolean)
    .map(prefixToken)
    .join(' ');
}

/** Strings entre comillas simples/dobles (contenido de clases en TS/arrays). */
function processQuotedStrings(content) {
  return content.replace(/'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, s1, s2) => {
    const inner = s1 ?? s2;
    if (!inner || inner.length > 800) return match;
    if (/^[\s:]*$/.test(inner) || inner.length <= 2) return match;
    if (!/[\s:]/.test(inner) && !/^(flex|grid|block|hidden|w-|h-|p-|m-|bg-|text-|border|rounded|shadow|ring|dark:|hover:|focus:|sm:|md:|lg:)/.test(inner))
      return match;
    if (!/(?:^|\s)(?:flex|grid|block|hidden|w-|h-|p-|m-|bg-|text-|border|rounded|shadow|ring|dark:|hover:|focus:|sm:|md:|lg:|items-|justify-|gap-|space-|min-|max-|rounded|transition|opacity|pointer-events|cursor|overflow|truncate|inset|absolute|relative|fixed|sticky|z-|from-|via-|to-|ring-|divide-|place-|self-|shrink|grow|order-|col-|row-|object-|aspect-|\[)/.test(inner))
      return match;
    const next = prefixClassString(inner);
    if (next === inner) return match;
    const q = s1 !== undefined ? "'" : '"';
    return q + next + q;
  });
}

function processFileContent(content) {
  let changed = false;

  const attrPatterns = [
    /(?<![:\w])(class\s*=\s*")([^"]*)(")/g,
    /(?<![:\w])(class\s*=\s*')([^']*)(')/g,
  ];

  let result = content;
  for (const re of attrPatterns) {
    result = result.replace(re, (match, before, classes, after) => {
      const next = prefixClassString(classes);
      if (next !== classes) changed = true;
      return before + next + after;
    });
  }

  const quoted = processQuotedStrings(result);
  if (quoted !== result) {
    changed = true;
    result = quoted;
  }

  return { content: result, changed };
}

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      if (name === 'node_modules' || name === 'dist') continue;
      walk(full, files);
    } else if (/\.(vue|ts)$/.test(name) && !name.endsWith('.d.ts')) {
      files.push(full);
    }
  }
  return files;
}

const srcDir = path.join(root, 'src');
const files = walk(srcDir);
let totalChanged = 0;

for (const file of files) {
  const original = fs.readFileSync(file, 'utf8');
  const { content, changed } = processFileContent(original);
  if (changed) {
    totalChanged++;
    if (write) fs.writeFileSync(file, content, 'utf8');
    else console.log('would change:', path.relative(root, file));
  }
}

console.log(`${write ? 'Updated' : 'Would update'} ${totalChanged} files`);
if (!write) console.log('Run with --write to apply changes');
