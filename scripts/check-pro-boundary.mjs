#!/usr/bin/env node
/**
 * C04: Pro lives under src/pro; free entry does not import it; pack files list is dist only.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const freeIndex = readFileSync(join(root, 'src/components/index.tsx'), 'utf8');
if (freeIndex.includes("from '../pro") || freeIndex.includes('src/pro')) {
  throw new Error('Free index imports src/pro — public tarball would include Pro');
}
if (!existsSync(join(root, 'src/pro/index.ts'))) {
  throw new Error('src/pro/index.ts missing');
}

const proNames = readdirSync(join(root, 'src/pro'), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
const freeRoot = join(root, 'src/components');

function walk(dir) {
  for (const ent of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(ent.name)) {
      const src = readFileSync(p, 'utf8');
      for (const name of proNames) {
        if (src.includes(`../${name}/`) || src.includes(`'../${name}'`) || src.includes(`"./${name}`)) {
          throw new Error(`Free file ${p} still references Pro ${name}`);
        }
      }
    }
  }
}
walk(freeRoot);
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const files = pkg.files || [];
if (files.some((f) => String(f).includes('src'))) {
  throw new Error('package.json files must not ship src (including src/pro)');
}
if (!files.includes('dist')) {
  throw new Error('package.json files should list dist');
}
console.log(
  'C04 ok: Pro is under src/pro; free index does not import it; pack files are dist only'
);
