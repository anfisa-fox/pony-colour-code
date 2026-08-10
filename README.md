# Pony Colour Code

Браузерная игра «угадай код» в духе Mastermind с персонажами G4 Mane 6. Часть семейного проекта **My World**, опубликована как **отдельное standalone-приложение**.

## Status: Beta 1 — Published

| | |
|---|---|
| **Production** | https://pony-colour-code.pages.dev/ |
| **Repository** | https://github.com/anfisa-fox/pony-colour-code |
| **Runtime baseline** | `6353feceb2d4712697466672339842cdb0a384a1` — *Beta 1: initial playable release* |

> Текущая фаза: **real user Beta 1 testing**. Runtime и UX заморожены до решения Product Owner после тестирования.

## Stack

- React 19, TypeScript, Vite 7
- Vitest (unit tests)
- Pure static SPA — без backend, без database
- Hosting: Cloudflare Pages (`npm run build` → `dist/`)

## Quick start

```bash
npm install
npm run dev        # Vite dev server (default http://localhost:5173)
npm run test:run   # 24 unit tests
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
```

## Game rules (summary)

- Secret code: **4 positions**, **6 characters**, **duplicates allowed**
- **10 attempts** per game
- Feedback (Mastermind): **exact** (character + position), **partial** (character, wrong position), **miss**
- Flow: **START → GAME → RESULT** (win or loss) → new game

Full rules and invariants: [`docs/HANDOVER.md`](docs/HANDOVER.md)

## Documentation

| Document | Purpose |
|----------|---------|
| [`docs/HANDOVER.md`](docs/HANDOVER.md) | **Start here** — full handover for a new team |
| [`docs/PROJECT_STATUS.md`](docs/PROJECT_STATUS.md) | Beta 1 freeze status |
| [`docs/RELEASE_BETA_1.md`](docs/RELEASE_BETA_1.md) | Release snapshot |
| [`docs/BACKLOG.md`](docs/BACKLOG.md) | Open tasks after Beta 1 |
| [`docs/BETA_TEST_PLAN.md`](docs/BETA_TEST_PLAN.md) | User testing observation plan |
| [`docs/architecture/ARCHITECTURE_v1.0.md`](docs/architecture/ARCHITECTURE_v1.0.md) | Architecture |
| [`docs/architecture/ADR-001-project-boundaries.md`](docs/architecture/ADR-001-project-boundaries.md) | My World boundaries |
| [`docs/planning/MVP_CONTRACT_v1.0.md`](docs/planning/MVP_CONTRACT_v1.0.md) | MVP scope & rules |
| [`docs/ux/UI_SPECIFICATION_v1.0.md`](docs/ux/UI_SPECIFICATION_v1.0.md) | UX specification |
| [`docs/vision/PRODUCT_VISION.md`](docs/vision/PRODUCT_VISION.md) | Product vision |

## My World

Independent deployment unit. Navigation My World ↔ game is **planned** (backlog P1) but **not wired** in Beta 1. See ADR-001.
