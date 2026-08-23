# ADR-002: Single Repository — Shared Game Core + Capacitor Android Shell

**Status:** Accepted  
**Date:** 23 August 2026

---

## Context

Beta 2 web release is **published and accepted**. Product Owner approved the next phase: **Android v0.1** — a thin native shell over the same game.

The codebase already has:

- pure TypeScript Engine in `src/game/`
- React UI in `src/screens/`, `src/components/`
- Vite SPA build → Cloudflare Pages
- no Capacitor, no `android/` directory

Alternatives considered implicitly:

- separate Android repository with copied or submodule game code;
- permanent `main-android` branch diverging from web;
- rewriting game logic in native Kotlin.

These would risk Engine/Session/UI drift and duplicate maintenance.

---

## Decision

**One repository, one shared game core, Capacitor Android as a delivery shell.**

| Aspect | Decision |
|--------|----------|
| Repository | `anfisa-fox/pony-colour-code` (existing) |
| Integration branch | `main` for Web + Android |
| Shared | `src/game/`, Session, React UI, assets, tutorial |
| Android project | `android/` inside same repo, committed after creation |
| Platform-specific code | `src/platform/` (or equivalent) **only when needed** |
| Temporary dev branch | e.g. `feature/android-v0.1` — merge to `main` after acceptance |
| Forbidden | Separate Android repo; permanent web/android branch forks |

Capacitor serves the Vite `dist/` bundle in Android WebView. Web deployment (Cloudflare Pages) continues from the same `main`.

---

## Consequences

### Positive

- Single source of truth for scoring, modes, and UI
- One test suite (`npm run test:run`) guards shared Engine
- Sprint 2 mobile web layout becomes Android primary UI with minimal redesign
- ADR-001 deploy independence (My World vs game) unchanged — Android is a third delivery unit from the **same game repo**

### Negative / risks

- `main` must stay green for both web and Android builds
- Capacitor/Android toolchain adds repo size and CI complexity
- Platform-specific bugs (Back, lifecycle, safe-area) require careful isolation from Engine

### Follow-up

- Implement per [ANDROID_V0_1_SCOPE.md](../planning/ANDROID_V0_1_SCOPE.md)
- minSdk/targetSdk decided in Step 1 discovery — not in this ADR

---

## References

- [ADR-001-project-boundaries.md](./ADR-001-project-boundaries.md)
- [ANDROID_V0_1_SCOPE.md](../planning/ANDROID_V0_1_SCOPE.md)
- [ANDROID_READINESS.md](../planning/ANDROID_READINESS.md)
