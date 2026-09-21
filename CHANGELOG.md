# Change Log

## 3.0.0 — 2026-09-21

Breaking: Pro components are no longer in the public `@dashflowx/core` tarball.

- Free package (`@dashflowx/core`) ships `src/components` only (registry + free primitives).
- Pro package (`@dashflowx/core-pro`) ships `src/pro` (Command, Menubar, Carousel, DatePicker, InputOTP, and the rest of the Pro inventory). Peer-depends on `@dashflowx/core`.
- `CORE_REGISTRY` lists every component with `{ id, title, tier, editor }`.
- Storybook shows a Free or Pro badge from the registry.

Install Pro from GitHub Packages (private), not npmjs.

## 2.0.127

Previous public release on npmjs (pre-split).
