# Handover — Pony Colour Code

**Audience:** Developer joining with **no prior chat history**.  
**Last updated:** 23 August 2026

---

## 0. Start here

| Phase | Document |
|-------|----------|
| **Current: Sprint 3 — Android v0.1 Step 1 complete** | [planning/ANDROID_TOOLCHAIN_DECISIONS.md](planning/ANDROID_TOOLCHAIN_DECISIONS.md) |
| Beta 2 release record | [RELEASE_BETA_2.md](RELEASE_BETA_2.md) |
| Beginner scoring | [planning/BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md) |
| Mode selection UX | [planning/MODE_SELECTION_UX.md](planning/MODE_SELECTION_UX.md) |
| Mobile GAME (P1-04) | [planning/MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md) |
| Android constraints | [planning/ANDROID_READINESS.md](planning/ANDROID_READINESS.md) |
| Status | [PROJECT_STATUS.md](PROJECT_STATUS.md) |
| Tasks | [BACKLOG.md](BACKLOG.md) |

**Beta 1** remains the historical runtime baseline. Do not rewrite Beta 1 history.

---

## 1. Where the project is now

| | |
|---|---|
| Production (live) | **Beta 2** — https://pony-colour-code.pages.dev/ |
| Sprint 2 | **COMPLETE** |
| Beta 2 | **Published** — tag `beta-2` |
| Sprint 3 | **Step 1 done** — toolchain discovery; Step 2 not started |
| Tests | **64/64** PASS (Engine, Session, mode flow, presentation, mobile/history) |

**What Beta 1 is:** the validated, published web game (Classic mode only in GAME UI). Tag `beta-1` marks the historical project freeze; runtime baseline `6353fec`.

**What changed in Sprint 2 so far:**

- **Steps 1–3:** dual-mode mechanics, START mode selection, GAME dual-mode feedback UI
- **P1-04 / S2-04:** mobile GAME flex layout; actions without mandatory page scroll (414×896 accepted)
- **S2-05:** mobile START/RESULT verified on 414×896 and 360×780 (no runtime changes)
- **S2-09:** START hero mirrored orientation for Pinkie / Fluttershy / Rarity (matches GAME)
- **Tutorial polish:** «Как играть?»; «нет совпадений»; My World link removed

**Production serves Beta 2** — PO visual acceptance complete (desktop + mobile).

---

## 2. Product purpose

**Pony Colour Code** is a family browser game: guess a hidden 4-pony code using Mastermind-style feedback. Target user: child in a family creative-world context. Thematic tie to **My World** (separate site); production Beta 1 at https://pony-colour-code.pages.dev/

---

## 3. Game rules & invariants

### Beta 1 / Classic Mode (DO NOT BREAK)

| Rule | Value |
|------|-------|
| Secret length | **4** positions |
| Character pool | **6** G4 Mane 6 (see `src/data/characters.ts`) |
| Duplicate characters | **ALLOWED** in secret and guess |
| Max attempts | **10** |
| **Exact** | Same character **and** same position |
| **Partial** | Character in secret, **wrong** position (after exact pass) |
| **Miss** | No match after Mastermind accounting |
| Scoring accounting | Each secret element used **at most once**; each guess element **at most once** |
| Win | 4 exact |
| Loss | 10 attempts without win |
| Flow | START → GAME → RESULT → new game |
| Feedback (Classic) | **Aggregate** — tokens ≠ positions |

**Duplicates are not bugs.**  
Classic `evaluateGuess()` was exhaustively validated pre-freeze — do **not** modify without PO approval and full regression.

Implementation: `src/game/engine.ts` → `evaluateGuess()`.

### Sprint 2 / Beginner Mode (engine — implemented)

Positional GREEN / YELLOW / PINK per slot via `evaluateGuessPositional()`. Algorithm and Classic invariant: [planning/BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md).

**GAME UI for Beginner feedback:** Step 3 — not yet implemented.

---

## 4. Architecture overview

```
┌─────────────────────────────────────────┐
│  UI (React)                             │
│  StartScreen / GameScreen / ResultScreen│
│  Components: cards, feedback, palette   │
└──────────────┬──────────────────────────┘
               │ dispatch actions
┌──────────────▼──────────────────────────┐
│  Session (useReducer)                   │
│  sessionReducer.ts — phase, history     │
│  + gameMode (Sprint 2)                  │
└──────────────┬──────────────────────────┘
               │ evaluateGuess, evaluateGuessPositional, generateSecret
┌──────────────▼──────────────────────────┐
│  Engine (pure TS, no React/DOM)         │
│  engine.ts — scoring, secret generation │
└─────────────────────────────────────────┘
```

**Boundaries:**

- **Engine** — no React, no UI, no browser APIs
- **Session** — state machine; calls Engine; no DOM
- **UI** — presentation only; no scoring logic in components

App routing: **state machine in `App.tsx`** (no React Router).

Sprint 2 extends architecture with dual mode — see planning docs; [ARCHITECTURE_v1.0.md](architecture/ARCHITECTURE_v1.0.md) remains Beta 1 baseline.

---

## 5. Repository structure

```
pony-colour-code/
├── README.md
├── docs/
│   ├── planning/           ← Sprint 2 specs (SPRINT_2_SCOPE, etc.)
│   ├── architecture/       ← v1 + ADR-001
│   ├── ux/                 ← UI spec v1 (Beta 1 baseline)
│   └── vision/
├── public/
│   ├── characters/
│   └── feedback/
├── src/
│   ├── game/
│   ├── screens/
│   ├── components/
│   ├── data/characters.ts
│   └── styles/
├── index.html
├── vite.config.ts
└── package.json
```

---

## 6. Important modules

| File | Role |
|------|------|
| `src/game/config.ts` | `CODE_LENGTH=4`, `MAX_ATTEMPTS=10`, `ALLOW_DUPLICATES`, `DEFAULT_GAME_MODE=beginner` |
| `src/game/engine.ts` | `generateSecret`, `evaluateGuess`, `evaluateGuessPositional`, `isWinningGuess` |
| `src/game/sessionReducer.ts` | Phases: start / playing / won / lost; `gameMode`; mode-aware guess records |
| `src/screens/StartScreen.tsx` | Mode selection, Secret/Guess example, `startGame(mode)` |
| `src/components/ModeSelector.tsx` | Beginner / Classic radio cards with feedback preview |
| `src/components/GameExample.tsx` | Shared Secret/Guess illustration on START |
| `src/data/characters.ts` | Russian names, colors, PNG paths, `mirrored` |
| `src/components/GuessRow.tsx` | History row — Beginner positional / Classic aggregate |
| `src/components/FeedbackLegend.tsx` | Mode-aware legend in GAME |
| `src/components/feedbackUtils.ts` | Positional → medallion mapping; presentation helpers |
| `src/components/MyWorldLink.tsx` | **Disabled placeholder** — P1-02 deferred |

---

## 7. Test strategy

```bash
npm run test:run   # CI-style single run
npm test           # watch mode
```

| File | Coverage |
|------|----------|
| `src/game/engine.test.ts` | Classic + Beginner scoring, duplicates, invariant |
| `src/game/sessionReducer.test.ts` | Phase transitions, history, mode persistence |
| `src/game/modeSelectionFlow.test.ts` | START → session mode wiring |
| `src/components/feedbackPresentation.test.ts` | Presentation mode + positional mapping |

**57 tests** as of Step 3 checkpoint.

---

## 8. Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run test:run
npm run build      # → dist/
npm run preview
```

No `.env` required.

---

## 9. Deployment

| | |
|---|---|
| Platform | Cloudflare Pages |
| Project | `pony-colour-code` |
| Branch | `main` |
| Build | `npm run build` |
| Output | `dist/` |
| URL | https://pony-colour-code.pages.dev/ |

Independent from My World (ADR-001). Beta 2 deploy when PO authorizes after Sprint 2 completion.

---

## 10. My World relationship

- **Separate** GitHub repo and Cloudflare project
- Integration = **HTML links only** (ADR-001)
- **Not in Sprint 2 scope:** P1-02, P1-03
- My World repo: `github.com/anfisa-fox/my-world` — do not modify for Sprint 2

---

## 11. Key architectural decisions

| Decision | Document |
|----------|----------|
| Separate deployment from My World | ADR-001 |
| Vite SPA, not Next.js | ARCHITECTURE_v1.0 |
| Fixed MVP rules (4/6/10/duplicates) | MVP_CONTRACT_v1.0 |
| UX screens & sections (Beta 1) | UI_SPECIFICATION_v1.0 |
| Dual mode + mobile (Sprint 2) | planning/SPRINT_2_SCOPE.md |
| Product goals | PRODUCT_VISION.md |

---

## 12. Current backlog

See [BACKLOG.md](BACKLOG.md) — S2-01…S2-07, S2-04/05/09/10 done; S2-08 Beta 2 release prep next; deferred P1-02/P1-03.

---

## 13. Beta 1 testing (completed)

Beta 1 user testing is **complete and successful**. Observations informed Sprint 2 scope (Beginner Mode, mobile GAME, mode selection).

Historical test plan: [BETA_TEST_PLAN.md](BETA_TEST_PLAN.md).

---

## 14. Recommended next work (Sprint 3 — Android v0.1)

Planning is **approved**. Step 1 toolchain discovery **complete**. Step 2 requires PO authorization.

1. Review [planning/ANDROID_TOOLCHAIN_DECISIONS.md](planning/ANDROID_TOOLCHAIN_DECISIONS.md) — PO decisions PO-01…PO-04
2. Step 2: Capacitor integration on `feature/android-v0.1`

Web Beta 2 on `main` must remain regression-free throughout.

---

## 15. Historical artifacts (preserved)

| Artifact | Classification | Notes |
|----------|----------------|-------|
| `docs/planning/MVP_CONTRACT_v1.0.md` | **HISTORICAL (Beta 1 MVP)** | Single-mode scope; superseded for Sprint 2 by planning package |
| `docs/ux/UI_SPECIFICATION_v1.0.md` | **HISTORICAL (Beta 1 UX)** | Aggregate feedback; Classic baseline |
| `docs/architecture/ARCHITECTURE_v1.0.md` | **HISTORICAL (Beta 1 arch)** | No mode system; still valid for layering |
| `docs/architecture/ADR-001-project-boundaries.md` | **CURRENT** | Accepted — My World boundaries |
| `docs/architecture/ADR-002-single-repo-capacitor-android.md` | **CURRENT** | Accepted — Sprint 3 Android |
| `docs/vision/PRODUCT_VISION.md` | **CURRENT (vision)** | Long-term direction; Sprint 2 uses Beginner/Classic naming |
| `docs/RELEASE_BETA_1.md` | **HISTORICAL** | Beta 1 release record |
| `mlp_codecracker_concept.html` | **HISTORICAL** | Early prototype |

Do not delete historical files without PO approval.
