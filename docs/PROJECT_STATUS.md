# Project Status — Pony Colour Code

**Last updated:** 10 August 2026  
**Status:** **BETA 1 — PUBLISHED / FROZEN FOR USER TESTING**

---

## Summary

Pony Colour Code Beta 1 is **live in production** and **frozen** for real child beta testing. No further runtime, UX, or gameplay changes should be made until Product Owner review after testing.

| Item | Value |
|------|-------|
| Production URL | https://pony-colour-code.pages.dev/ |
| GitHub | https://github.com/anfisa-fox/pony-colour-code |
| Runtime baseline commit | `6353feceb2d4712697466672339842cdb0a384a1` |
| Runtime baseline message | `Beta 1: initial playable release` |

---

## What is implemented

- Full playable loop: **START → GAME → RESULT**
- Secret generation (4 positions, 6 Mane 6, duplicates allowed)
- Mastermind scoring (exact / partial / miss)
- 10 attempts, win/loss detection, new game
- Russian UI
- Character cards, feedback medallions, history
- START hero ensemble (6 characters + names)
- Standalone Cloudflare Pages deployment
- 24 unit tests (Engine + Session)

---

## What was verified before freeze

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — 24/24 |
| `npm run build` | PASS |
| Production deploy | SUCCESS — Cloudflare Pages |
| Production assets | HTTP 200 — `/`, JS/CSS, 6 characters, 3 feedback PNG |
| Scoring exhaustive validation | No Engine bug found (pre-freeze diagnostic) |

---

## What is intentionally not implemented

- My World navigation links (disabled placeholder only)
- Backend, persistence, statistics, PWA
- Game mode / difficulty configuration
- Tutorial, hot-seat, collections
- Custom domain
- Asset optimization, font self-hosting

See [`BACKLOG.md`](BACKLOG.md).

---

## Production deployment

| Setting | Value |
|---------|-------|
| Platform | Cloudflare Pages |
| Project | `pony-colour-code` |
| Production branch | `main` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Runtime env vars | None |
| GitHub source | `anfisa-fox/pony-colour-code` |

Deploy is **independent** from My World (see ADR-001).

---

## Known limitations (Beta 1)

- «Вернуться в My World» — disabled UI placeholder (non-blocking for standalone beta)
- Decorative purple orb on RESULT (cosmetic backlog)
- ~19 MB static assets (6 character + 3 feedback PNG)
- Google Fonts loaded from CDN (Comfortaa, Nunito)
- START layout may be tight on ~421–480 px widths (observation backlog)
- Duplicate characters in secret/guess are **allowed by design** — not a bug

---

## Next phase

**REAL USER BETA TESTING**

Follow [`BETA_TEST_PLAN.md`](BETA_TEST_PLAN.md). Observations → Product Owner decision → backlog updates. Do not auto-fix during testing phase.
