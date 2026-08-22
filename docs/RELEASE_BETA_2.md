# Release Notes — Beta 2

**Release:** Beta 2  
**Status:** **NOT RELEASED** — checklist template for Sprint 2  
**Last updated:** 22 August 2026

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

## Pre-release checklist

### Code and tests

- [ ] `npm run test:run` — PASS (57+ tests)
- [ ] `npm run build` — PASS
- [ ] Beginner positional tests pass per [BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md)
- [ ] Classic regression — Beta 1 scoring unchanged
- [ ] No changes to Classic `evaluateGuess()` semantics

### Functional QA

- [ ] Beginner default on START; mode switch works
- [ ] Beginner GAME shows per-slot feedback; invariant holds
- [ ] Classic GAME matches Beta 1 behaviour
- [ ] Mobile GAME: actions usable without mandatory bottom scroll (P1-04)
- [ ] Desktop layout not regressed
- [ ] START + RESULT usable on mobile portrait
- [ ] Win/loss flow; new game preserves mode
- [ ] S2-09: START hero character orientation matches GAME (mirrored row 2)
- [ ] S2-10: RESULT → START → mode confirm → Играть → GAME

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
