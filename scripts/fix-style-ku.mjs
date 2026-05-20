#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (!['node_modules', 'dist'].includes(name)) walk(full, files);
    } else if (/\.(vue|ts)$/.test(name)) files.push(full);
  }
  return files;
}

function fix(content) {
  let c = content;
  // Inline style="..." — quitar ku: antes de propiedades CSS
  c = c.replace(/(style="[^"]*)/g, (m) => m.replace(/\bku:([a-z-]+):/gi, '$1:'));
  c = c.replace(/(style='[^']*)/g, (m) => m.replace(/\bku:([a-z-]+):/gi, '$1:'));
  // :style="{ ku:color: ... }" — claves de objeto JS
  c = c.replace(/\{\s*ku:([a-zA-Z]+):/g, '{ $1:');
  // Funciones JS prefijadas por error
  c = c.replace(/\bku:(borderFromBg|borderColor)\b/g, '$1');
  c = c.replace(/ku:borderFromBg/g, 'borderFromBg');
  return c;
}

let n = 0;
for (const file of walk(path.join(root, 'src'))) {
  const orig = fs.readFileSync(file, 'utf8');
  const next = fix(orig);
  if (next !== orig) {
    fs.writeFileSync(file, next, 'utf8');
    n++;
  }
}
console.log(`Fixed style artifacts in ${n} files`);
