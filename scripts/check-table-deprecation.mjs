#!/usr/bin/env node
/**
 * G02: table primitives stay exported from core with a deprecation pointer to datagrid.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'src/components/Table/index.tsx',
  'src/components/Tr/index.tsx',
  'src/components/Th/index.tsx',
  'src/components/Td/index.tsx',
];

for (const rel of files) {
  const src = readFileSync(join(root, rel), 'utf8');
  if (!src.includes('@deprecated')) {
    throw new Error(`${rel} must be @deprecated (G02 shim)`);
  }
  if (!src.includes('@dashflowx/datagrid')) {
    throw new Error(`${rel} must point consumers at @dashflowx/datagrid`);
  }
}

const barrel = readFileSync(join(root, 'src/components/index.tsx'), 'utf8');
if (!barrel.includes("from './Table'") || !barrel.includes("from './Tr'")) {
  throw new Error('core barrel must still export table/tr/th/td so old imports compile');
}
console.log('G02 ok: core table/tr/th/td shims are deprecated and still exported');
