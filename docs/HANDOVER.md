# Handover — Pony Colour Code

**Audience:** Developer joining with **no prior chat history**.  
**Last updated:** 22 August 2026

---

## 0. Sprint 2 — start here

| Phase | Document |
|-------|----------|
| **Current: Sprint 2 implementation** | [planning/SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) |
| Beginner scoring | [planning/BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md) |
| Mode selection UX | [planning/MODE_SELECTION_UX.md](planning/MODE_SELECTION_UX.md) |
| Mobile GAME (P1-04) | [planning/MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md) |
| Android constraints | [planning/ANDROID_READINESS.md](planning/ANDROID_READINESS.md) |
| Status | [PROJECT_STATUS.md](PROJECT_STATUS.md) |
| Tasks | [BACKLOG.md](BACKLOG.md) |

**Beta 1** remains the historical runtime baseline. Do not rewrite Beta 1 history.

---

## 1. Product purpose

**Pony Colour Code** is a family browser game: guess a hidden 4-pony code using Mastermind-style feedback. Target user: child in a family creative-world context. Thematic tie to **My World** (separate site); production Beta 1 at https://pony-colour-code.pages.dev/

---

## 2. Current release state

| | |
|---|---|
| Production (live) | **Beta 1** — https://pony-colour-code.pages.dev/ |
| Beta 1 runtime baseline | `6353feceb2d4712697466672339842cdb0a384a1` |
| Beta 1 tag | `beta-1` (historical) |
| User testing | **Complete and successful** (22 Aug 2026) |
| Next release | **Beta 2** (Sprint 2 web) — not yet released |
| Implementation | Ready when PO authorizes — see Sprint 2 docs above |

See [RELEASE_BETA_1.md](RELEASE_BETA_1.md), [RELEASE_BETA_2.md](RELEASE_BETA_2.md), [PROJECT_STATUS.md](PROJECT_STATUS.md).

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

### Sprint 2 / Beginner Mode (new — see spec)

Positional GREEN / YELLOW / PINK per slot. Algorithm and Classic invariant: [planning/BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md).

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
| `src/game/config.ts` | `CODE_LENGTH=4`, `MAX_ATTEMPTS=10`, `ALLOW_DUPLICATES`, pony IDs |
| `src/game/engine.ts` | `generateSecret`, `evaluateGuess`, `isWinningGuess` (+ `evaluateGuessPositional` Sprint 2) |
| `src/game/sessionReducer.ts` | Phases: start / playing / won / lost |
| `src/data/characters.ts` | Russian names, colors, PNG paths, `mirrored` |
| `src/components/feedbackUtils.ts` | exact/partial → medallion sequence (Classic) |
| `src/components/MyWorldLink.tsx` | **Disabled placeholder** — P1-02 deferred |

---

## 7. Test strategy

```bash
npm run test:run   # CI-style single run
npm test           # watch mode
```

| File | Coverage |
|------|----------|
| `src/game/engine.test.ts` | Classic scoring, duplicates, win detection |
| `src/game/sessionReducer.test.ts` | Phase transitions, history, attempt limits |

Sprint 2 adds Beginner positional tests — see [BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md) §7.

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

Independent from My World (ADR-001). Beta 2 deploy when PO authorizes post-implementation.

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

See [BACKLOG.md](BACKLOG.md) — Sprint 2 items S2-01…S2-08; deferred P1-02/P1-03; P2/P3 polish.

---

## 13. Beta 1 testing (completed)

Beta 1 user testing is **complete and successful**. Observations informed Sprint 2 scope (Beginner Mode, mobile GAME, mode selection).

Historical test plan: [BETA_TEST_PLAN.md](BETA_TEST_PLAN.md).

---

## 14. Recommended start for Sprint 2 implementation

1. Read [planning/SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) and linked specs
2. `npm install`; `npm run test:run && npm run build` — confirm 24/24 baseline
3. Implement Beginner engine + tests first (S2-01, S2-07)
4. Mode selection + session (S2-03)
5. Mobile GAME layout (S2-04) — verify P1-04 acceptance
6. Classic regression pass (S2-02)
7. Beta 2 checklist [RELEASE_BETA_2.md](RELEASE_BETA_2.md)

Do not modify Classic `evaluateGuess()` semantics.

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
