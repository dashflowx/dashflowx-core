#!/usr/bin/env node
/**
 * npmjs / GitHub Packages: if the package is not on the registry, set version to 1.0.0
 * so the next `npm publish --access public` creates it.
 *
 * Usage: node scripts/ensure-publish-version.mjs <dir> <registry>
 */
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const FIRST = '1.0.0';
const dir = resolve(process.argv[2] || '.');
const registry = process.argv[3] || 'https://registry.npmjs.org';
const pkgPath = join(dir, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const name = pkg.name;

function view() {
  try {
    const out = execFileSync(
      'npm',
      ['view', name, 'version', '--registry', registry, '--loglevel', 'error'],
      {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
        env: process.env,
      }
    ).trim();
    return out && out !== 'undefined' ? out : '';
  } catch (e) {
    const err = `${e.stderr || ''}${e.stdout || ''}${e.message || ''}`;
    if (
      /E404|404 Not Found|not in this registry|code E404|is not in this registry|404 '@/i.test(
        err
      )
    ) {
      return '';
    }
    console.error(err);
    process.exit(1);
  }
}

const existing = view();
if (!existing) {
  pkg.version = FIRST;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(
    `${name} not found on ${registry} — creating ${name}@${FIRST} (first npm publish)`
  );
  process.exit(0);
}

console.log(`${name} already on ${registry} as ${existing}; this run uses ${pkg.version}`);
if (pkg.version === existing) {
  console.error(
    `Refusing to publish ${name}@${pkg.version} — that version is already on the registry. Bump package.json.`
  );
  process.exit(1);
}
