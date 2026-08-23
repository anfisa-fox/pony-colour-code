# Android Readiness — Constraints & Sprint 3 Direction

**Status:** ACTIVE — constraints for Web + Android shared codebase  
**Last updated:** 23 August 2026  
**Implementation scope:** [ANDROID_V0_1_SCOPE.md](./ANDROID_V0_1_SCOPE.md) (planning approved; **not started**)

---

## 1. Architecture (accepted)

```
React/Vite web application (Beta 2)
        ↓
shared Engine + Session + UI  ← single source of truth
        ↓
Capacitor Android shell (Sprint 3 — planned)
        ↓
installable APK (Android v0.1)
```

**One game, multiple platforms.** See [ADR-002-single-repo-capacitor-android.md](../architecture/ADR-002-single-repo-capacitor-android.md).

| Rule | Detail |
|------|--------|
| Repository | `anfisa-fox/pony-colour-code` only |
| Branch | `main` integrates Web + Android |
| Engine | Platform-agnostic — no WebView/browser knowledge |
| Platform code | Add only for real Android/web-specific features |

Capacitor is **not installed yet**. `android/` does **not exist yet**.

---

## 2. Constraints developers MUST respect (Web + future Android)

### Layout and CSS

| Constraint | Rationale |
|------------|-----------|
| Responsive CSS, not browser-only hacks | WebView ≈ mobile Chrome |
| Prefer `100dvh` over `100vh` for full-height GAME | WebView insets |
| `env(safe-area-inset-*)` on bottom-fixed UI | Gesture bar, notches |
| Avoid untested `position: fixed` without safe-area | Android migration |
| Mobile GAME layout per [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md) | Android primary UI |

### Assets and paths

| Constraint | Rationale |
|------------|-----------|
| Root-relative paths `/characters/…`, `/feedback/…` | Capacitor `dist/` bundle |
| No hardcoded production URLs for game assets | Local WebView bundle |
| Avoid Node/browser-only API dependencies | Standard WebView |

### Navigation and links

| Constraint | Rationale |
|------------|-----------|
| External links: normal `<a href="https://…">` when added | Capacitor Browser plugin |
| No iframe embedding | ADR-001 |
| In-app flow: state machine (no React Router required) | Single-activity WebView |

### Touch and interaction

| Constraint | Rationale |
|------------|-----------|
| Touch targets ≥44px | Android HIG |
| No hover-only critical actions | Touch-first |
| Real `<button>` elements | Accessibility + WebView |

### Fonts

| Constraint | Rationale |
|------------|-----------|
| Google Fonts CDN on web Beta 2 | May need self-host for offline APK (track U-05 in ANDROID_V0_1_SCOPE) |

### State and APIs

| Constraint | Rationale |
|------------|-----------|
| In-memory session (no required localStorage) | WebView lifecycle |
| Engine free of DOM/window | Portable |
| `Math.random()` for secrets | Family game — acceptable |

---

## 3. Already compatible

- React 19 + Vite SPA
- Pure TypeScript Engine
- Minimal deps (`react`, `react-dom`)
- Static PNG in `public/`
- No backend API
- Beta 2 mobile layout accepted on real devices

---

## 4. Android v0.1 work (Sprint 3 — planned, not started)

See [ANDROID_V0_1_SCOPE.md](./ANDROID_V0_1_SCOPE.md):

1. Toolchain discovery (Capacitor, minSdk, targetSdk)
2. Capacitor + `android/` in repo
3. Native shell polish (icon, splash, bars, Back, lifecycle)
4. APK build
5. TECNO Spark Go 2024 BG6 acceptance
6. Checkpoint / tag after PO

**Out of scope:** Google Play, AAB, backend, persistence, new gameplay.

---

## 5. Primary test device

**TECNO Spark Go 2024 (BG6)** — Android 13 Go, 720×1612 — primary acceptance device for Android v0.1.

---

## References

- [ANDROID_V0_1_SCOPE.md](./ANDROID_V0_1_SCOPE.md)
- [ADR-002-single-repo-capacitor-android.md](../architecture/ADR-002-single-repo-capacitor-android.md)
- [SPRINT_2_SCOPE.md](./SPRINT_2_SCOPE.md)
- [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md)
- [ADR-001-project-boundaries.md](../architecture/ADR-001-project-boundaries.md)
