# Pony Colour Code

Браузерная игра «угадай код» в духе Mastermind с персонажами G4 Mane 6. Часть семейного проекта **My World**, опубликована как **отдельное standalone-приложение**.

## Status: Beta 2 published — Sprint 3 Android v0.1 planning

| | |
|---|---|
| **Production (Beta 2)** | https://pony-colour-code.pages.dev/ |
| **Repository** | https://github.com/anfisa-fox/pony-colour-code |
| **Sprint 3** | Android v0.1 **planned** — implementation not started |

Beta 2 is live. Next phase: Capacitor Android shell over the same codebase ([ANDROID_V0_1_SCOPE.md](docs/planning/ANDROID_V0_1_SCOPE.md)).

> **Sprint 3 entry point:** [`docs/planning/ANDROID_V0_1_SCOPE.md`](docs/planning/ANDROID_V0_1_SCOPE.md)

## Stack

- React 19, TypeScript, Vite 7
- Vitest (unit tests)
- Pure static SPA — без backend, без database
- Hosting: Cloudflare Pages (`npm run build` → `dist/`)

## Quick start

```bash
npm install
npm run dev        # Vite dev server (default http://localhost:5173)
npm run test:run   # 57 unit tests
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
```

## Game rules (summary)

- Secret code: **4 positions**, **6 characters**, **duplicates allowed**
- **10 attempts** per game
- **Classic Mode (Beta 1):** aggregate Mastermind feedback (exact / partial / miss)
- **Beginner Mode (Sprint 2):** positional feedback per pony — see planning docs
- Flow: **START → GAME → RESULT** (win or loss) → new game

Full Beta 1 rules and invariants: [`docs/HANDOVER.md`](docs/HANDOVER.md)

## Documentation

| Document | Purpose |
|----------|---------|
| [`docs/planning/SPRINT_2_SCOPE.md`](docs/planning/SPRINT_2_SCOPE.md) | **Sprint 2 start here** — scope, DoD, acceptance |
| [`docs/HANDOVER.md`](docs/HANDOVER.md) | Full handover for a new team |
| [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) | Current project status |
| [`docs/BACKLOG.md`](docs/BACKLOG.md) | Open tasks |
| [`docs/RELEASE_BETA_1.md`](docs/RELEASE_BETA_1.md) | Beta 1 release snapshot (historical) |
| [`docs/RELEASE_BETA_2.md`](docs/RELEASE_BETA_2.md) | Beta 2 checklist (not released) |
| [`docs/planning/BEGINNER_MODE_SPEC.md`](docs/planning/BEGINNER_MODE_SPEC.md) | Beginner scoring algorithm |
| [`docs/planning/MODE_SELECTION_UX.md`](docs/planning/MODE_SELECTION_UX.md) | START mode selection UX |
| [`docs/planning/MOBILE_GAME_UX_SPRINT_2.md`](docs/planning/MOBILE_GAME_UX_SPRINT_2.md) | Mobile GAME / P1-04 |
| [`docs/planning/ANDROID_V0_1_SCOPE.md`](docs/planning/ANDROID_V0_1_SCOPE.md) | Sprint 3 Android v0.1 scope |
| [`docs/planning/ANDROID_READINESS.md`](docs/planning/ANDROID_READINESS.md) | Web + Android shared constraints |
| [`docs/BETA_TEST_PLAN.md`](docs/BETA_TEST_PLAN.md) | Beta 1 test plan (completed) |
| [`docs/architecture/ARCHITECTURE_v1.0.md`](docs/architecture/ARCHITECTURE_v1.0.md) | Architecture v1 (Beta 1 baseline) |
| [`docs/architecture/ADR-001-project-boundaries.md`](docs/architecture/ADR-001-project-boundaries.md) | My World boundaries |
| [`docs/architecture/ADR-002-single-repo-capacitor-android.md`](docs/architecture/ADR-002-single-repo-capacitor-android.md) | Single repo + Capacitor Android |
| [`docs/planning/MVP_CONTRACT_v1.0.md`](docs/planning/MVP_CONTRACT_v1.0.md) | MVP scope (Beta 1 historical) |
| [`docs/ux/UI_SPECIFICATION_v1.0.md`](docs/ux/UI_SPECIFICATION_v1.0.md) | UX spec v1 (Beta 1 baseline) |
| [`docs/vision/PRODUCT_VISION.md`](docs/vision/PRODUCT_VISION.md) | Product vision |

## My World

Independent deployment unit. Navigation My World ↔ game is **planned** (backlog P1-02/P1-03) but **not in Sprint 2 scope**. See ADR-001.
