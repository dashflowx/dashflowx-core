# Change Log

## 1.0.0 — 2026-09-21

First publish on the new npm account (`@dashflowx` scope). Not a continuation of `@dashflowx/core` 2.0.x.

- Free package (`@dashflowx/core`) ships `src/components` only (registry + free primitives).
- Pro package (`@dashflowx/core-pro@1.0.0`) ships `src/pro` to GitHub Packages. Peer-depends on `@dashflowx/core` >= 1.0.0.
- `CORE_REGISTRY` lists every component with `{ id, title, tier, editor }`.
- Storybook shows a Free or Pro badge from the registry.

If `npm view @dashflowx/core` is empty, CI creates **1.0.0**. Install Pro from GitHub Packages, not npmjs.
