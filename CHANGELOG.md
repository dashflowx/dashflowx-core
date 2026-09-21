# Change Log

## 1.0.0 — 2026-09-21

First publish on the new npm account (`@dashflow` scope). Not a continuation of `@dashflowx/core` 2.0.x.

- Free package (`@dashflow/core`) ships `src/components` only (registry + free primitives).
- Pro package (`@dashflow/core-pro@1.0.0`) ships `src/pro` to GitHub Packages. Peer-depends on `@dashflow/core` >= 1.0.0.
- `CORE_REGISTRY` lists every component with `{ id, title, tier, editor }`.
- Storybook shows a Free or Pro badge from the registry.

If `npm view @dashflow/core` is empty, CI creates **1.0.0**. Install Pro from GitHub Packages, not npmjs.
