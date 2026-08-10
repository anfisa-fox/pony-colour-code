# Handover — Pony Colour Code

**Audience:** Developer joining with **no prior chat history**.  
**Last updated:** 10 August 2026

---

## 1. Product purpose

**Pony Colour Code** is a family browser game: guess a hidden 4-pony code using Mastermind-style feedback. Target user: child in a family creative-world context. Thematic tie to **My World** (separate site); Beta 1 is **standalone** at https://pony-colour-code.pages.dev/

---

## 2. Current release

| | |
|---|---|
| Release | **Beta 1** |
| Status | Published, frozen for user testing |
| Runtime baseline | `6353feceb2d4712697466672339842cdb0a384a1` |
| Production | https://pony-colour-code.pages.dev/ |
| Repo | https://github.com/anfisa-fox/pony-colour-code |

See [RELEASE_BETA_1.md](RELEASE_BETA_1.md) and [PROJECT_STATUS.md](PROJECT_STATUS.md).

---

## 3. Game rules & invariants (DO NOT BREAK without PO approval)

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

**Duplicates are not bugs.**  
**Scoring was exhaustively validated** pre-freeze — re-run diagnostic before changing Engine.

Implementation: `src/game/engine.ts` → `evaluateGuess()`.

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
└──────────────┬──────────────────────────┘
               │ evaluateGuess, generateSecret
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

---

## 5. Repository structure

```
pony-colour-code/
├── README.md                 ← entry point
├── docs/                     ← project docs (this file, status, backlog, release)
├── public/
│   ├── characters/           ← 6 production PNG
│   └── feedback/             ← 3 feedback PNG
├── src/
│   ├── game/                 ← Engine + Session + tests
│   ├── screens/              ← START, GAME, RESULT
│   ├── components/           ← UI building blocks
│   ├── data/characters.ts    ← names, colors, images, mirror flags
│   └── styles/               ← global.css, game.css
├── index.html
├── vite.config.ts
├── package.json
└── tsconfig*.json
```

---

## 6. Important modules

| File | Role |
|------|------|
| `src/game/config.ts` | `CODE_LENGTH=4`, `MAX_ATTEMPTS=10`, `ALLOW_DUPLICATES`, pony IDs |
| `src/game/engine.ts` | `generateSecret`, `evaluateGuess`, `isWinningGuess` |
| `src/game/sessionReducer.ts` | Phases: start / playing / won / lost |
| `src/data/characters.ts` | Russian names, colors, PNG paths, `mirrored` |
| `src/components/feedbackUtils.ts` | exact/partial → medallion sequence |
| `src/components/MyWorldLink.tsx` | **Disabled placeholder** in Beta 1 |

---

## 7. Test strategy

```bash
npm run test:run   # CI-style single run
npm test           # watch mode
```

| File | Coverage |
|------|----------|
| `src/game/engine.test.ts` | Scoring, duplicates, win detection, validation |
| `src/game/sessionReducer.test.ts` | Phase transitions, history, attempt limits |

**Gaps (backlog P3):** property tests, multi-attempt scenarios, feedbackUtils tests.

---

## 8. Local development

```bash
npm install
npm run dev        # http://localhost:5173 (Vite default)
npm run test:run
npm run build      # → dist/
npm run preview
```

No `.env` required for local run.

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

**Independent** from My World deploy (ADR-001). Push to `main` triggers Cloudflare build.

---

## 10. My World relationship

- **Separate** GitHub repo and Cloudflare project
- Integration = **HTML links only** (no shared code, iframe, monorepo)
- Beta 1: **no working cross-links** (backlog P1-02, P1-03)
- My World repo: `github.com/anfisa-fox/my-world` — **do not modify** during Beta 1 freeze

See [architecture/ADR-001-project-boundaries.md](architecture/ADR-001-project-boundaries.md).

---

## 11. Key architectural decisions

| Decision | Document |
|----------|----------|
| Separate deployment from My World | ADR-001 |
| Vite SPA, not Next.js | ARCHITECTURE_v1.0 |
| Fixed MVP rules (4/6/10/duplicates) | MVP_CONTRACT_v1.0 |
| UX screens & sections | UI_SPECIFICATION_v1.0 |
| Product goals | PRODUCT_VISION.md |

---

## 12. Current backlog

See [BACKLOG.md](BACKLOG.md) — P1 integration + beta test, P2 UX, P3 quality.

---

## 13. Beta testing phase

1. Child plays on **production URL**
2. Observer uses [BETA_TEST_PLAN.md](BETA_TEST_PLAN.md)
3. PO reviews observations
4. Update BACKLOG; **then** plan Beta 2 / integration work

**Do not** fix backlog items during freeze without PO approval.

---

## 14. Recommended restart after freeze

1. Read [PROJECT_STATUS.md](PROJECT_STATUS.md) and [BACKLOG.md](BACKLOG.md)
2. Clone repo; `npm install`; `npm run test:run && npm run build`
3. Confirm production matches runtime baseline commit (see RELEASE_BETA_1.md)
4. Review Beta test observations with PO
5. Prioritize P1 items (playtest results, My World links)
6. Only touch Engine/Session after re-running tests and PO sign-off on rule changes
7. Deploy via push to `main` (Cloudflare auto-build)

---

## 15. Historical artifacts (preserved)

| Artifact | Classification | Notes |
|----------|----------------|-------|
| `docs/vision/PRODUCT_VISION.md` | CURRENT (vision) | Product direction |
| `docs/planning/MVP_CONTRACT_v1.0.md` | CURRENT (rules scope) | Status "Draft" in file — rules implemented in Beta 1 |
| `docs/architecture/ARCHITECTURE_v1.0.md` | CURRENT | Technical architecture v1 |
| `docs/architecture/ADR-001-project-boundaries.md` | CURRENT | Accepted |
| `docs/ux/UI_SPECIFICATION_v1.0.md` | CURRENT | UX spec for implemented screens |
| `mlp_codecracker_concept.html` | HISTORICAL | Early HTML concept prototype |
| `PonyColourCode_BizVision_v1.0.docx` | HISTORICAL | Business vision document |

Do not delete historical files without PO approval.
