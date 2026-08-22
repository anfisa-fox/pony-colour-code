# Project Status — Pony Colour Code

**Last updated:** 22 August 2026  
**Status:** **SPRINT 2 — READY FOR IMPLEMENTATION**

---

## Summary

Beta 1 is **published**, user testing is **complete and successful**, and Sprint 2 planning documentation is **approved**. Implementation may begin when Product Owner authorizes.

| Item | Value |
|------|-------|
| Production URL (Beta 1) | https://pony-colour-code.pages.dev/ |
| GitHub | https://github.com/anfisa-fox/pony-colour-code |
| Beta 1 runtime baseline | `6353feceb2d4712697466672339842cdb0a384a1` |
| Beta 1 tag | `beta-1` (historical freeze — do not move) |
| Sprint 2 entry point | [`planning/SPRINT_2_SCOPE.md`](planning/SPRINT_2_SCOPE.md) |

---

## Beta 1 outcome (complete)

| Result | Detail |
|--------|--------|
| User testing | **Complete and successful** |
| Game concept | Validated |
| Playability | Playable and enjoyable |
| Critical defects | None discovered |
| Outcome | UX/product improvements captured for Sprint 2 |

Beta 1 runtime remains the **immutable historical baseline**. Production still serves Beta 1 until Beta 2 is deployed.

---

## Sprint 2 product goal

**Make Pony Colour Code easier for a child to learn and substantially better to play on a phone, while preserving the validated Classic game and preparing the UI/codebase for a future Android application.**

Sprint 2 delivers the next **web release** (Beta 2). Native Android is **not** Sprint 2 scope.

---

## What Beta 1 implemented (unchanged baseline)

- Full playable loop: **START → GAME → RESULT**
- Secret generation (4 positions, 6 Mane 6, duplicates allowed)
- Classic Mastermind scoring (exact / partial / miss)
- 10 attempts, win/loss detection, new game
- Russian UI, character cards, feedback medallions, history
- Standalone Cloudflare Pages deployment
- 24 unit tests (Engine + Session)

---

## Sprint 2 approved scope (not yet implemented)

| Workstream | Spec |
|------------|------|
| Beginner Mode (positional feedback) | [BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md) |
| Classic Mode regression preservation | [BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md) §8 |
| Mode selection on START (Beginner default) | [MODE_SELECTION_UX.md](planning/MODE_SELECTION_UX.md) |
| Mobile GAME UX — P1-04 | [MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md) |
| START + RESULT mobile review | Planning docs above |
| Android readiness constraints | [ANDROID_READINESS.md](planning/ANDROID_READINESS.md) |
| Expanded tests | [SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) |
| Beta 2 release | [RELEASE_BETA_2.md](RELEASE_BETA_2.md) |

---

## Verification baseline (pre-implementation)

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — 24/24 (22 Aug 2026 planning gate) |
| `npm run build` | PASS (22 Aug 2026 planning gate) |
| Runtime `src/` / `public/` | Unchanged since Beta 1 baseline |

---

## Known limitations (Beta 1 production, until Beta 2)

- «Вернуться в My World» — disabled UI placeholder
- Single Classic mode only (no Beginner yet)
- Mobile GAME requires scroll to actions — **P1-04**, Sprint 2 fix
- Decorative purple orb on RESULT (P2-02 deferred)
- ~19 MB static assets; Google Fonts CDN

---

## Explicitly out of Sprint 2 scope

- Native Android / Capacitor install
- My World integration (P1-02, P1-03)
- RESULT orb redesign (P2-02)
- Asset optimization / font self-hosting (unless implementation requires)

See [`BACKLOG.md`](BACKLOG.md) and [`planning/SPRINT_2_SCOPE.md`](planning/SPRINT_2_SCOPE.md).

---

## Timeline

```
Beta 1 published → user testing (complete) → Sprint 2 planning (complete) → implementation → Beta 2 web release
```

Historical Beta 1 freeze: [`RELEASE_BETA_1.md`](RELEASE_BETA_1.md), tag `beta-1`.
