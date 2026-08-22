# Android Readiness — Constraints for Sprint 2

**Status:** APPROVED (constraints only)  
**Last updated:** 22 August 2026  
**Implementation:** OUT OF SCOPE for Sprint 2

---

## 1. Future direction (context)

```
React/Vite web application
        ↓
shared responsive UI / codebase
        ↓
Capacitor (future)
        ↓
Android application (APK)
```

**Goal:** ONE shared gameplay/UI codebase for Web and Android wherever practical.

Sprint 2 mobile web UI should become the Android interface with **minimal or no visual redesign** later.

Capacitor installation, `android/` project, and Play Store work are **explicitly out of Sprint 2 scope**.

---

## 2. Constraints Sprint 2 developers MUST respect

### Layout and CSS

| Constraint | Rationale |
|------------|-----------|
| Use responsive CSS, not browser-only hacks | WebView behaves like mobile Chrome |
| Prefer `100dvh` over `100vh` where full-height layouts matter | Mobile browser chrome / WebView insets |
| Apply `env(safe-area-inset-*)` on bottom-fixed or sticky UI | Notched devices, gesture bar |
| Avoid `position: fixed` unless tested with safe-area padding | Reduces Android migration surprises |
| Mobile GAME layout per [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md) | Becomes Android primary UI |

### Assets and paths

| Constraint | Rationale |
|------------|-----------|
| Keep asset paths as `/characters/…`, `/feedback/…` (root-relative) | Capacitor serves from `dist/` with configurable `base` |
| Do not hardcode full production URLs for game assets | Local WebView bundle |
| Avoid new dependencies that assume Node/browser-only APIs | Capacitor runs standard WebView |

### Navigation and links

| Constraint | Rationale |
|------------|-----------|
| My World links (when enabled later): use normal `<a href="https://…">` | Capacitor Browser plugin can open externally |
| No iframe embedding of external sites | ADR-001 |
| In-app navigation stays state machine (no React Router required) | Simple WebView single-activity pattern |

### Touch and interaction

| Constraint | Rationale |
|------------|-----------|
| Touch targets ≥44px | Android HIG alignment |
| No hover-only critical actions | Touch-first |
| Real `<button>` elements for actions | Accessibility + WebView consistency |

### Fonts

| Constraint | Rationale |
|------------|-----------|
| Google Fonts CDN acceptable for Sprint 2 web Beta 2 | Future Android may require self-host (P3-05) |
| If implementing font changes, prefer self-host path compatible with offline APK | Document in release notes |

### State and APIs

| Constraint | Rationale |
|------------|-----------|
| In-memory session only (no required localStorage) | Simpler WebView lifecycle |
| Keep Engine free of DOM/window | Already portable |
| `Math.random()` acceptable for secret generation | No crypto requirement for family game |

---

## 3. Already compatible (no Sprint 2 action required)

- React 19 + Vite SPA architecture
- Pure TypeScript game engine
- Minimal dependencies (`react`, `react-dom`)
- Static PNG assets in `public/`
- No service worker / PWA requirement
- No backend API calls

---

## 4. Android-only work (later phase)

Not Sprint 2:

- `npm install @capacitor/core @capacitor/android` etc.
- `capacitor.config.ts`, `android/` project
- App icons, splash screens, signing, Play Store
- Status bar / navigation bar styling plugins
- Deep links My World ↔ app
- Optional: self-hosted fonts, asset size optimization for APK
- Vite `base: './'` if required by Capacitor build pipeline

---

## 5. Verification hint (future)

When Capacitor phase starts:

1. `npm run build` → copy `dist/` to Capacitor `webDir`
2. Open Android emulator — confirm GAME mobile layout matches mobile web Beta 2
3. Test safe-area on notched device
4. Test offline play (fonts/assets)

---

## References

- [SPRINT_2_SCOPE.md](./SPRINT_2_SCOPE.md)
- [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md)
- [ADR-001-project-boundaries.md](../architecture/ADR-001-project-boundaries.md)
