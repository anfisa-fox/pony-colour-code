# Release Notes — Beta 2

**Release:** Beta 2  
**Status:** **NOT RELEASED** — checklist template for Sprint 2  
**Last updated:** 23 August 2026

---

## Planned production

| Item | Value |
|------|-------|
| **URL** | https://pony-colour-code.pages.dev/ (same Cloudflare project) |
| **GitHub** | https://github.com/anfisa-fox/pony-colour-code |
| **Cloudflare project** | `pony-colour-code` |
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Output directory** | `dist` |

---

## Beta 2 product summary (planned)

Sprint 2 web release building on validated Beta 1:

- **Beginner Mode** — positional feedback per pony (recommended default)
- **Classic Mode** — preserved Beta 1 aggregate Mastermind feedback
- **Mode selection** on START screen
- **Mobile GAME UX** — P1-04 resolved (no mandatory scroll to actions)
- **START / RESULT** mobile review
- Expanded automated tests

See [SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md).

---

## Implementation status (pre-release)

| Area | Status |
|------|--------|
| Beginner + Classic modes | **Done** (Steps 1–3) |
| Mode selection START | **Done** |
| Mobile GAME / P1-04 | **Done / Accepted** |
| Mobile START/RESULT (S2-05) | **Verified** (414×896, 360×780) |
| S2-09 START hero orientation | **Done** |
| S2-10 RESULT → START flow | **Done** |
| Full regression + deploy | **Pending (S2-08)** |

---

## Pre-release checklist

### Code and tests

- [x] `npm run test:run` — PASS (64 tests)
- [x] `npm run build` — PASS
- [x] Beginner positional tests pass per [BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md)
- [x] Classic regression — Beta 1 scoring unchanged
- [x] No changes to Classic `evaluateGuess()` semantics

### Functional QA

- [x] Beginner default on START; mode switch works
- [x] Beginner GAME shows per-slot feedback; invariant holds
- [x] Classic GAME matches Beta 1 behaviour
- [x] Mobile GAME: actions usable without mandatory bottom scroll (P1-04)
- [ ] Desktop layout not regressed *(full regression pending)*
- [x] START + RESULT usable on mobile portrait (S2-05)
- [x] Win/loss flow; new game preserves mode
- [x] S2-09: START hero character orientation matches GAME (mirrored row 2)
- [x] S2-10: RESULT → START → mode confirm → Играть → GAME

### Documentation

- [ ] [PROJECT_STATUS.md](PROJECT_STATUS.md) updated to Beta 2 published
- [ ] [BACKLOG.md](BACKLOG.md) Sprint 2 items closed
- [ ] Release commit hash recorded below

### Deploy

- [ ] Push to `main` triggers Cloudflare build
- [ ] Production smoke test: `/`, assets, one full game per mode
- [ ] PO sign-off

---

## Commits (fill at release)

| | |
|---|---|
| **Runtime release commit** | _TBD_ |
| **Message** | _TBD_ |
| **Previous baseline** | `6353fec` — Beta 1 initial playable release |
| **Beta 1 tag** | `beta-1` (unchanged — historical) |

---

## Validation log (fill at release)

| Check | Result |
|-------|--------|
| `npm run test:run` | _TBD_ |
| `npm run build` | _TBD_ |
| Production deploy | _TBD_ |
| Mobile P1-04 verification | _TBD_ |

---

## Known limitations (carry-forward unless fixed)

- My World navigation disabled (P1-02/P1-03 deferred)
- Decorative RESULT purple orb (P2-02 deferred)
- ~19 MB static assets (P3-04 deferred)
- Google Fonts via CDN (P3-05 deferred)

---

## References

- [RELEASE_BETA_1.md](RELEASE_BETA_1.md) — Beta 1 historical release
- [SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) — Sprint 2 Definition of Done
