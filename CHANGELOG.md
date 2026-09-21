# Change Log

## 3.0.0 — 2026-09-21

Breaking: Pro components are no longer in the public `@dashflowx/core` tarball. Follows public **2.0.127**. **1.0.0** already exists on npmjs and cannot be republished.

- Free package (`@dashflowx/core`) ships `src/components` only (registry + free primitives).
- Pro package (`@dashflowx/core-pro@1.0.0`) ships `src/pro` to GitHub Packages. Peer-depends on `@dashflowx/core` >= 3.0.0.
- `CORE_REGISTRY` lists every component with `{ id, title, tier, editor }`.
- Storybook shows a Free or Pro badge from the registry.

Install Pro from GitHub Packages (private), not npmjs.

## 2.0.127

Previous public release on npmjs (pre-split).

## 1.0.0

Already on npmjs. Do not republish this version.
