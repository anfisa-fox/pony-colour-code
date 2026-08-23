# Android v0.1 — Toolchain Decisions (Step 1)

**Status:** DISCOVERY COMPLETE — Step 2 prerequisites documented  
**Last updated:** 23 August 2026  
**Sources:** [Capacitor v8 docs](https://capacitorjs.com/docs), npm `@capacitor/*@8.5.0` (23 Aug 2026)

Implementation **not started**. Capacitor **not installed**.

---

## 1. Capacitor version (recommended)

| Package | Version | Notes |
|---------|---------|-------|
| `@capacitor/core` | **8.5.0** (`^8.5.0`) | Latest stable on npm; Active support per Capacitor support policy |
| `@capacitor/cli` | **8.5.0** (`^8.5.0`) | Dev dependency |
| `@capacitor/android` | **8.5.0** (`^8.5.0`) | Android platform |

**Why Capacitor 8 (not 7):** v8 is current Active release (Dec 2025); v7 is Extended Support only. New project should target v8.

**Additional plugins (Step 2–3, not Step 1 install):**

| Plugin | Purpose | When |
|--------|---------|------|
| `@capacitor/app` | Hardware Back, lifecycle events | Step 3 |
| `@capacitor/splash-screen` | Startup splash | Step 3 (optional, native template includes baseline) |

**Node.js:** Capacitor 8 requires **Node 22+** ([Updating to 8.0](https://capacitorjs.com/docs/updating/8-0)). Verify local Node before Step 2.

---

## 2. Android SDK (Capacitor 8 defaults)

Values from official Capacitor 8 Android template / [Updating to 8.0 — Android](https://capacitorjs.com/docs/updating/8-0):

| Setting | Value | Mandatory? | Source |
|---------|-------|------------|--------|
| `minSdkVersion` | **24** (Android 7.0) | **Required** by Capacitor 8 | Capacitor 8 `variables.gradle` template |
| `compileSdkVersion` | **36** | **Required** | Capacitor 8 template |
| `targetSdkVersion` | **36** | **Required** | Capacitor Android support matrix — custom target SDK **not supported** ([Setting Target SDK](https://capacitorjs.com/docs/android/setting-target-sdk)) |
| Android Gradle Plugin | **8.13.0** | **Required** for Cap 8 upgrade path | Capacitor 8 updating guide |
| Gradle wrapper | **8.14.3** | **Required** | Capacitor 8 updating guide |

**Do not change** `targetSdk` / `compileSdk` independently of Capacitor major version.

---

## 3. JDK

| Item | Decision |
|------|----------|
| JDK for Android builds | **JDK 21** (bundled with Android Studio as JBR) |
| Source | Android Studio Otter ships JBR 21; Capacitor 7+ documented JDK 21; Gradle 8.14 supports JDK 21 |
| CLI builds | Set **Gradle JDK = jbr-21** in Android Studio, or `JAVA_HOME` / `GRADLE_LOCAL_JAVA_HOME` to JDK 21 for `./gradlew` |

**Mandatory:** JDK 21-compatible toolchain for Gradle builds.  
**Optional:** Standalone JDK install if building only from CLI without AS.

---

## 4. Android Studio / SDK (Mac)

### Mandatory for Step 2+

| Component | Requirement |
|-----------|-------------|
| **Android Studio** | **Otter \| 2025.2.1+** ([Capacitor 8](https://capacitorjs.com/docs/updating/8-0)) |
| **Android SDK Platform** | **API 36** (compileSdk) |
| **Android SDK Build-Tools** | Latest compatible with AGP 8.13 (install via SDK Manager) |
| **Android SDK Command-line Tools** | Latest (for SDK Manager / headless updates) |
| **JDK 21** | Via Android Studio bundled JBR |

### Optional

| Component | When |
|-----------|------|
| Android Emulator | Useful for smoke tests; **not required** — primary acceptance is TECNO BG6 |
| USB debugging + `adb` | Optional; simplifies install (`adb install`) but **not required** for manual APK file install |

---

## 5. TECNO Spark Go 2024 (BG6) compatibility

| Check | Result |
|-------|--------|
| Device OS | Android **13** (API 33) Go Edition |
| vs `minSdk 24` | **Compatible** — API 33 ≫ 24 |
| Android Go special handling | **None required** for Capacitor WebView SPA — standard System WebView; no known Go-specific blockers |
| CPU | Unisoc T606 — **ARM64** (ARMv8.1-A) + 32-bit support |
| APK ABI | Default Capacitor/Gradle debug APK includes **arm64-v8a** (and typically armeabi-v7a) — **no custom ABI filter needed** for BG6 |
| Display | 720×1612 — aligns with Sprint 2 mobile acceptance (360×780 logical width) |

**Tested Android ≠ minSdk:** We test on API 33; minimum supported devices start at API 24 per Capacitor 8.

---

## 6. Package / application ID (recommendation — PO approval)

| | |
|---|---|
| **Primary (recommended)** | `com.anfisafox.ponycolourcode` |
| **Alternative** | `io.anfisafox.ponycolourcode` |

Stable, Play Store–compatible reverse-DNS. **Not committed** until PO confirms.

Display name: **`Pony Colour Code`** — no Android-specific restriction; set in `strings.xml` / Capacitor `appName`. Unicode/spaces OK in display name.

---

## 7. Vite / Capacitor integration (Step 2 plan)

| Item | Decision |
|------|----------|
| `webDir` | **`dist`** — matches current `npm run build` output |
| `capacitor.config` | `webDir: 'dist'`, `appId` (PO-approved), `appName: 'Pony Colour Code'` |
| Current Vite `base` | **unset** (default `/`) — produces absolute `/assets/...` in `dist/index.html` |
| **Recommended for Step 2** | Set **`base: './'`** in `vite.config.ts` — relative asset URLs; standard Capacitor + Vite practice; compatible with Cloudflare Pages at domain root |
| Public assets | `/characters/…`, `/feedback/…` in source — copied to `dist/`; resolve under Capacitor `https://localhost` origin — **verify on device in Step 2** |
| Dual deploy | Same `npm run build` → `dist/` → Cloudflare **and** `npx cap sync` — no separate web/Android builds unless verification fails |
| **Do not change** in Step 1 | `vite.config.ts` unchanged per PO instruction |

**Risk:** If relative `base` causes Cloudflare regression, fallback is env-specific base (`CAPACITOR=true`) — only if needed.

---

## 8. Fonts / offline

| Item | Finding |
|------|---------|
| Current | Google Fonts CDN in `index.html` (Comfortaa, Nunito) |
| Offline APK | Fonts **do not load** without network; CSS fallbacks (`Nunito`, `sans-serif`) apply |
| Blocks v0.1? | **No** — game fully playable; typography differs slightly offline |
| Step 2 action | **Defer self-host** to backlog **P3-05** unless PO wants pixel-perfect offline in v0.1 |
| Bundled game assets | PNG in `public/` — **offline OK** |

---

## 9. Android Back — v0.1 design (implement Step 3)

Use `@capacitor/app` `backButton` listener ([App API](https://capacitorjs.com/docs/apis/app)). Registering a listener **disables default** — app must handle explicitly.

| Screen / state | Recommended v0.1 behaviour | PO decision? |
|----------------|--------------------------|--------------|
| «Как играть?» open | **Close modal** | No — clear requirement |
| START | **`App.exitApp()`** | No |
| GAME | **Do nothing** (ignore Back) — prevents accidental session loss | **Yes — PO option B:** confirm dialog «Выйти на START?» |
| RESULT | **Navigate to START** (same as flow intent, no new game) | **Yes — PO option B:** `App.exitApp()` instead |

**Default recommendation if PO defers:** GAME = no-op; RESULT → START via existing session action.

---

## 10. Lifecycle expectation

| Scenario | Expected v0.1 behaviour |
|----------|-------------------------|
| Home → background → return | WebView + React state **retained in memory** — session continues |
| Screen lock / unlock | Same — no extra code expected |
| Low memory process kill | Session **lost** — acceptable for v0.1; app restarts at START |
| Activity recreation | Capacitor 8 adds `density` to `configChanges` — reduces WebView reload risk |

**Step 3:** smoke-test background/foreground on BG6. **No persistence** in v0.1 unless testing shows crash (unlikely).

---

## 11. Status bar / navigation / safe areas (Occam)

| Item | v0.1 strategy |
|------|---------------|
| Capacitor 8 default | **SystemBars** in `@capacitor/core`; `insetsHandling: "css"` injects `--safe-area-inset-*` |
| Extra plugins | **None initially** — avoid `@capacitor/status-bar` unless needed |
| `index.html` | Add `viewport-fit=cover` in Step 3 if edge-to-edge gaps appear |
| CSS | Project already uses `env(safe-area-inset-*)` in mobile GAME — combine with `var(--safe-area-inset-*, env(...))` if needed |
| Edge-to-edge | **Do not force** aggressive fullscreen in v0.1 — use Capacitor 8 defaults; fix clipping only if BG6 shows issues |

---

## 12. APK strategy

| Type | Use for v0.1? | Signing | Path (typical) |
|------|---------------|---------|----------------|
| **Debug APK** | **Yes — primary for PO handoff** | Auto debug keystore | `android/app/build/outputs/apk/debug/app-debug.apk` |
| Release APK | No (unless PO requests) | Requires release keystore | `android/app/build/outputs/apk/release/` |

**Build command (Step 4):** `cd android && ./gradlew assembleDebug` (or Android Studio *Build → Build APK(s)*)

**Release keystore:** **Not needed** for family manual install v0.1.

---

## 13. Installation on TECNO BG6

### Recommended: manual APK file (simplest for PO)

1. Build `app-debug.apk`
2. Transfer to phone (USB file copy, cloud, messenger, email)
3. Open APK with Files app
4. Enable **Install unknown apps** for that app (Android 13 one-time per source)
5. Confirm install prompt

**USB debugging:** **Not required** for manual install.

### Optional: developer paths

| Method | Requires |
|--------|----------|
| `adb install app-debug.apk` | USB debugging + adb |
| Android Studio *Run* | USB debugging + driver |

---

## 14. Git / branch flow (Step 2)

| Item | Decision |
|------|----------|
| Create branch | **`feature/android-v0.1`** at **start of Step 2** |
| Push to origin | **Yes** — backup + visibility |
| Merge | **`main`** after Step 5 PO acceptance (Step 6 checkpoint) |
| Commit Capacitor/android on branch | Yes; merge as single integrated feature |

---

## 15. Step 2 prerequisites checklist

- [ ] PO approves package id
- [ ] PO resolves GAME / RESULT Back options (or accepts defaults)
- [ ] PO provides / approves launcher icon source
- [ ] Mac: Node **22+**
- [ ] Mac: Android Studio **Otter 2025.2.1+** installed (PO permission to install)
- [ ] SDK Platform **API 36** + Build-Tools installed
- [ ] JDK 21 available to Gradle
- [ ] Separate PO authorization for **Step 2 implementation**

---

## 16. Unresolved PO decisions only

| ID | Topic | Options |
|----|-------|---------|
| PO-01 | **Package id** | Confirm `com.anfisafox.ponycolourcode` or alternative |
| PO-02 | **GAME Back** | (A) ignore Back — recommended (B) confirm → START |
| PO-03 | **RESULT Back** | (A) go to START — recommended (B) exit app |
| PO-04 | **Launcher icon** | No dedicated icon in repo — PO to supply asset or approve generated placeholder |

All other items resolved from official Capacitor 8 documentation.

---

## References

- [Capacitor 8 — Updating](https://capacitorjs.com/docs/updating/8-0)
- [Capacitor — Setting Target SDK](https://capacitorjs.com/docs/android/setting-target-sdk)
- [Capacitor — Getting Started](https://capacitorjs.com/docs/getting-started)
- [Capacitor — Config](https://capacitorjs.com/docs/config)
- [Capacitor App API — backButton](https://capacitorjs.com/docs/apis/app)
- [Capacitor Support Policy](https://capacitorjs.com/docs/main/reference/support-policy)
