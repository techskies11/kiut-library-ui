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

for (const file of walk(path.join(root, 'src'))) {
  let c = fs.readFileSync(file, 'utf8');
  const orig = c;
  c = c.replace(/ ku:: /g, ' : ');
  c = c.replace(/\? ku:'/g, "? 'ku:");
  c = c.replace(/\? ku:"/g, '? "ku:');
  c = c.replace(/\{ ku:cursor:/g, '{ cursor:');
  c = c.replace(/ ku:: \[\]/g, ' : []');
  if (c !== orig) fs.writeFileSync(file, c, 'utf8');
}

console.log('Fixed ku:: artifacts');
