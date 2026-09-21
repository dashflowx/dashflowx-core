#!/usr/bin/env node
/**
 * C03/C04: registry row count equals free folders + pro folders; ids unique.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function dirs(rel) {
  return readdirSync(join(root, rel), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

const free = dirs('src/components');
const pro = dirs('src/pro');
const folders = [...free, ...pro].sort();

const registrySrc = readFileSync(join(root, 'src/registry.ts'), 'utf8');
const ids = [...registrySrc.matchAll(/id: '(core\.[^']+)'/g)].map((m) => m[1]);
const unique = new Set(ids);
if (unique.size !== ids.length) {
  throw new Error(`Duplicate registry ids: ${ids.length} vs ${unique.size}`);
}
if (ids.length !== folders.length) {
  throw new Error(
    `registry count ${ids.length} !== component folders ${folders.length} (free ${free.length} + pro ${pro.length})`
  );
}
console.log(
  `C03 ok: ${ids.length} registry rows = ${free.length} free + ${pro.length} pro folders`
);
