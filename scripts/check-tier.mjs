#!/usr/bin/env node
/** C06: registry tiers used for Storybook badges — Command is pro, Button is free. */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'src/registry.ts'), 'utf8');

function tier(id) {
  const m = src.match(new RegExp(`id: '${id}', title: '[^']+', tier: '(free|pro)'`));
  if (!m) throw new Error(`missing ${id}`);
  return m[1];
}

if (tier('core.button') !== 'free') throw new Error('Button must be free');
if (tier('core.command') !== 'pro') throw new Error('Command must be pro');
if (tier('core.menubar') !== 'pro') throw new Error('Menubar must be pro');
console.log('C06 ok: Button=free Command=pro Menubar=pro (Storybook badges read CORE_REGISTRY)');
