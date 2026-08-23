# Android v0.1 — Scope & Plan (Sprint 3)

**Status:** PLANNING APPROVED — implementation **NOT STARTED**  
**Last updated:** 23 August 2026  
**Entry point after Beta 2**

---

## 1. Goal

Take the **accepted Beta 2 web game** and deliver an **installable Android APK** without changing game mechanics.

Product Owner must be able to:

1. transfer the APK to an Android phone;
2. install manually;
3. launch as a standalone app;
4. complete the main game flow.

**Google Play, AAB, and developer account are out of scope.**

---

## 2. Architecture principle (mandatory)

**Pony Colour Code is one game with multiple delivery platforms — not separate web and Android project copies.**

| Rule | Detail |
|------|--------|
| Repository | Single repo: `anfisa-fox/pony-colour-code` |
| Branch strategy | `main` = shared integration branch for Web + Android |
| No forks | No separate Android repo; no permanent `main-web` / `main-android` branches |
| Shared core | One Engine, one Session, one React UI codebase |
| Platform code | Only when a real platform-specific need exists |

See [ADR-002-single-repo-capacitor-android.md](../architecture/ADR-002-single-repo-capacitor-android.md).

---

## 3. Repository layout (target)

```
pony-colour-code/
├── src/
│   ├── game/           # shared Engine
│   ├── screens/
│   ├── components/
│   ├── styles/
│   └── platform/     # only when platform differences are required
├── public/
├── android/            # Capacitor Android project (created in implementation)
├── capacitor.config.*
├── package.json
└── ...
```

`android/` will be committed to Git when created. Android shell is part of the same project.

---

## 4. Source of truth (Web + Android)

Shared without forking:

- `src/game/` — scoring, duplicate semantics, Beginner/Classic, session rules
- characters, feedback semantics
- main React UI (START / GAME / RESULT)
- tutorial «Как играть?»

Game mechanic changes are made **once** and apply to both web and Android builds.

Engine must not know whether it runs in browser, Cloudflare Pages, or Android WebView.

---

## 5. Platform-specific layer

Add platform code **only** when a real platform-specific feature appears.

| Android-only (future examples) | Web-only (future examples) |
|--------------------------------|----------------------------|
| Android Back | My World link / integration |
| status / navigation bars | browser-specific navigation |
| safe-area (native chrome) | |
| haptics, native share | |
| native lifecycle, permissions | |

**Do not** put Android logic in Engine.

If abstraction is needed later:

```
Game / UI → Platform services → Web / Android implementations
```

Do **not** build abstractions preemptively (Occam's razor).

---

## 6. Git strategy

| Item | Decision |
|------|----------|
| Integration branch | `main` (Web + Android) |
| Development branch | Temporary e.g. `feature/android-v0.1` allowed |
| Merge policy | Accepted Android work merges back to `main` |
| Anti-pattern | Permanent Android-only branch |

Goal: prevent Engine / Session / UI divergence between web and Android.

---

## 7. Primary test device

**TECNO Spark Go 2024 (BG6)** — **PRIMARY REAL DEVICE** for Android v0.1 acceptance.

| Spec | Value |
|------|-------|
| Model | BG6 |
| OS | Android 13 Go Edition |
| Display | 720×1612 |
| Class | Budget |

**Important:** Android 13 on this device is the **tested** configuration, **not** automatically `minSdk`.

| Term | Meaning |
|------|---------|
| Tested Android | Android 13 Go / TECNO BG6 |
| Minimum supported Android | TBD — from Capacitor / Android toolchain requirements (Step 1) |

Do not set `minSdk` / `targetSdk` without technical basis.

---

## 8. In scope (Android v0.1 MVP)

1. Install and configure Capacitor
2. Add Android platform; create `android/` in repo
3. Use existing Vite `dist/` as Capacitor web assets
4. Native shell: app name, package id, launcher icon, basic splash, status/navigation bars, safe areas, fullscreen/viewport behaviour
5. Android Back behaviour (design + implement)
6. Lifecycle: foreground / background / return — no crash on normal use
7. Build installable **APK**
8. Install APK on TECNO BG6
9. Real-device smoke: START → GAME → RESULT → START
10. Verify «Как играть?»
11. Verify Beginner and Classic — at least one attempt each

---

## 9. Out of scope

- Google Play / AAB / Play Store publishing
- Developer account setup
- Backend, accounts, cloud sync
- Saving in-progress games across app kill
- Local statistics, achievements
- Sound, push notifications
- New game modes, scoring changes, gameplay features
- My World integration

Offline play via bundled assets is acceptable if it works naturally; not a separate feature scope.

---

## 10. Android Back (requirement — design in Step 3)

Expected behaviour to define and implement:

| Context | Expected Back behaviour |
|---------|-------------------------|
| «Как играть?» modal open | Back **closes modal** |
| GAME | Must not accidentally lose session without clear behaviour |
| RESULT | Predictable Back behaviour (PO acceptance) |
| START | System Back may exit app |

Not implemented in this planning pass.

---

## 11. Android lifecycle

Android v0.1 does **not** require persisting a game after full app termination.

Must not break on normal:

- Home → background
- return from background
- temporary suspend

No local persistence layer required if WebView retains in-memory session.

---

## 12. minSdk / targetSdk — RESOLVED (Step 1)

See [ANDROID_TOOLCHAIN_DECISIONS.md](./ANDROID_TOOLCHAIN_DECISIONS.md):

| Setting | Value |
|---------|-------|
| Capacitor | **8.5.0** |
| minSdk | **24** |
| compileSdk / targetSdk | **36** |
| Test device BG6 (API 33) | Compatible |

---

## 13. Definition of Done — Android v0.1

Android v0.1 is **done** when:

- [ ] Web Beta 2 still works (no regression)
- [ ] Engine / scoring not forked
- [ ] Android project in same repo (`android/` committed)
- [ ] Android build PASS
- [ ] APK created and path documented
- [ ] APK installed on TECNO BG6
- [ ] App launches; START works
- [ ] «Как играть?» works
- [ ] Beginner: start + at least one attempt
- [ ] Classic: start + at least one attempt
- [ ] RESULT works; RESULT → START works
- [ ] Android Back behaviour **PO accepted**
- [ ] background → foreground: no crash
- [ ] No critical clipping/overflow on TECNO BG6 (720×1612)
- [ ] PO real-device acceptance complete

Tag / release naming: **only after PO acceptance** (Step 6).

---

## 14. Sprint 3 flow (Steps 1–6)

| Step | Name | Deliverables |
|------|------|--------------|
| **1** | Android discovery / toolchain | **DONE** — [ANDROID_TOOLCHAIN_DECISIONS.md](./ANDROID_TOOLCHAIN_DECISIONS.md) |
| **2** | Capacitor integration | **NEXT** — awaiting PO Step 2 authorization |
| **3** | Native shell polish | name, icon, splash, bars, safe areas, Back, lifecycle |
| **4** | APK | installable APK, artifact path for PO |
| **5** | Real device acceptance | TECNO BG6 smoke per §8 |
| **6** | Checkpoint | docs, tests/build, Git; tag/release decision after PO only |

**Do not start these steps without separate PO authorization for implementation.**

---

## 15. Unresolved decisions (track in Step 1 / 3)

| ID | Topic | Status |
|----|-------|--------|
| U-01 | Capacitor version | **Resolved** — Step 1 |
| U-02 | `minSdk` / `targetSdk` | **Resolved** — Step 1 |
| U-03 | Application / package id | **PO approval** |
| U-04 | Vite `base` | **Resolved** — `./` in Step 2 |
| U-05 | Google Fonts offline | **Deferred** — P3-05 |
| U-06 | Android Back per screen | **PO decision** — Step 3 |
| U-07 | APK signing | **Resolved** — debug APK |
| U-08 | Android v0.1 tag name | Step 6 (after PO) |
| U-09 | Launcher icon | **PO decision** |

Detail: [ANDROID_TOOLCHAIN_DECISIONS.md](./ANDROID_TOOLCHAIN_DECISIONS.md).

---

## References

- [ANDROID_TOOLCHAIN_DECISIONS.md](./ANDROID_TOOLCHAIN_DECISIONS.md) — Step 1 toolchain decisions
- [ADR-002-single-repo-capacitor-android.md](../architecture/ADR-002-single-repo-capacitor-android.md)
- [RELEASE_BETA_2.md](../RELEASE_BETA_2.md) — accepted web baseline
