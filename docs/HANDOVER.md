# Handover — Pony Colour Code

**Audience:** Developer joining with **no prior chat history**.  
**Last updated:** 22 August 2026

---

## 0. Sprint 2 — start here

| Phase | Document |
|-------|----------|
| **Current: Sprint 2 — Mobile GAME / P1-04** | [planning/SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) |
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
| Production (live) | **Beta 1** — https://pony-colour-code.pages.dev/ |
| Sprint 2 | **IN PROGRESS** — Steps 1–3 **accepted**; **Mobile GAME / P1-04 next** |
| Beta 2 | **Not released**; no deployment from Step 3 checkpoint |
| Tests | **57/57** PASS (Engine, Session, mode flow, presentation) |

**What Beta 1 is:** the validated, published web game (Classic mode only in GAME UI). Tag `beta-1` marks the historical project freeze; runtime baseline `6353fec`.

**What changed in Sprint 2 so far:**

- **Step 1:** dual-mode mechanics in Engine/Session (`beginner` positional, `classic` aggregate unchanged)
- **Step 2:** START screen mode selection with shared Secret/Guess example and feedback inside mode cards
- **Step 3:** GAME dual-mode feedback UI — Beginner positional history; Classic aggregate preserved; `state.gameMode` drives presentation

**What production still shows:** Beta 1 until Beta 2 deploy. Local main includes Steps 1–3 (not yet released).

**Beta 2 polish (documented, not implemented):** S2-09 START hero orientation; S2-10 RESULT → START mode flow.

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

See [BACKLOG.md](BACKLOG.md) — S2-01…S2-03, S2-07 done; S2-04 next; S2-09/S2-10 Beta 2 polish; deferred P1-02/P1-03.

---

## 13. Beta 1 testing (completed)

Beta 1 user testing is **complete and successful**. Observations informed Sprint 2 scope (Beginner Mode, mobile GAME, mode selection).

Historical test plan: [BETA_TEST_PLAN.md](BETA_TEST_PLAN.md).

---

## 14. Recommended next work (Mobile GAME / P1-04)

1. Read [planning/SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) progress section
2. `npm install`; `npm run test:run && npm run build` — confirm 57/57 baseline
3. **Mobile GAME / P1-04:** reorder hierarchy; actions near current guess (~375 px portrait)
4. Mobile START/RESULT polish (S2-05)
5. Beta 2 polish: S2-09 orientation, S2-10 RESULT → START (before release)
6. Beta 2 checklist [RELEASE_BETA_2.md](RELEASE_BETA_2.md)

Do not modify Classic `evaluateGuess()` semantics.

**Android / Capacitor:** planned as a separate major phase **after Beta 2** — constraints in [ANDROID_READINESS.md](planning/ANDROID_READINESS.md); not started.

---

## 15. Historical artifacts (preserved)

| Artifact | Classification | Notes |
|----------|----------------|-------|
| `docs/planning/MVP_CONTRACT_v1.0.md` | **HISTORICAL (Beta 1 MVP)** | Single-mode scope; superseded for Sprint 2 by planning package |
| `docs/ux/UI_SPECIFICATION_v1.0.md` | **HISTORICAL (Beta 1 UX)** | Aggregate feedback; Classic baseline |
| `docs/architecture/ARCHITECTURE_v1.0.md` | **HISTORICAL (Beta 1 arch)** | No mode system; still valid for layering |
| `docs/architecture/ADR-001-project-boundaries.md` | **CURRENT** | Accepted |
| `docs/vision/PRODUCT_VISION.md` | **CURRENT (vision)** | Long-term direction; Sprint 2 uses Beginner/Classic naming |
| `docs/RELEASE_BETA_1.md` | **HISTORICAL** | Beta 1 release record |
| `mlp_codecracker_concept.html` | **HISTORICAL** | Early prototype |

Do not delete historical files without PO approval.
