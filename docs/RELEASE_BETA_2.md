# Release Notes — Beta 2

**Release:** Beta 2  
**Status:** **RELEASE CANDIDATE READY** — not deployed, not tagged  
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

## Beta 2 product summary

Sprint 2 web release building on validated Beta 1:

- **Beginner Mode** — positional feedback per pony (recommended default)
- **Classic Mode** — preserved Beta 1 aggregate Mastermind feedback
- **Mode selection** on START screen
- **Mobile GAME UX** — P1-04 resolved (no mandatory scroll to actions)
- **START / RESULT** mobile review
- Expanded automated tests (64)

See [SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md).

---

## Implementation status

| Area | Status |
|------|--------|
| Beginner + Classic modes | **Done** (Steps 1–3) |
| Mode selection START | **Done** |
| Mobile GAME / P1-04 | **Done / Accepted** |
| Mobile START/RESULT (S2-05) | **Verified** (414×896, 360×780) |
| S2-09 START hero orientation | **Done** |
| S2-10 RESULT → START flow | **Done** |
| S2-08 release preparation | **Done** |
| Deploy + `beta-2` tag | **Awaiting PO GO** |

---

## Manual regression / smoke validation — COMPLETE

**PO decision:** Minimal sufficient release gate. A separate extended manual Regression Pass is **not required** — critical changed flows were verified during development, mobile acceptance, and the final desktop end-to-end smoke-check.

| Validation | Result | Notes |
|------------|--------|-------|
| Mobile acceptance (P1-04, S2-05) | **PASS** | 414×896 primary; 360×780 lower bound |
| S2-09 / S2-10 manual checks | **PASS** | Accepted during Sprint 2 |
| Desktop end-to-end smoke (23 Aug 2026) | **PASS** | localhost; Beginner mode; win after 5 attempts |
| Extended separate regression pass | **Not required** | PO-approved minimal gate |

### Desktop smoke-check detail (23 August 2026)

**START:** layout correct; mode selection works; Beginner selected; «Играть» → GAME works.

**GAME:** 10/10 attempts; Beginner feedback legend correct; attempts 10→9→8→7; history grows correctly; multi-row history OK; layout stable (no overlap/clipping/overflow); current guess, palette, legend, controls functional.

**RESULT:** win after 5 attempts; attempts count shown; secret code fully visible; layout correct; «Новая партия» → START; START normal, mode re-selectable.

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
- [x] Classic GAME matches Beta 1 behaviour *(covered by automated tests + prior acceptance)*
- [x] Mobile GAME: actions usable without mandatory bottom scroll (P1-04)
- [x] Desktop layout not regressed *(desktop smoke-check 23 Aug 2026)*
- [x] START + RESULT usable on mobile portrait (S2-05)
- [x] Win/loss flow; new game preserves mode
- [x] S2-09: START hero character orientation matches GAME (mirrored row 2)
- [x] S2-10: RESULT → START → mode confirm → Играть → GAME

### Documentation

- [x] Release prep documentation updated (S2-08 checkpoint)
- [ ] [PROJECT_STATUS.md](PROJECT_STATUS.md) updated to Beta 2 **published** *(after deploy)*
- [ ] Release commit hash + tag recorded below *(after deploy/tag)*

### Deploy *(awaiting PO GO)*

- [ ] Push to `main` triggers Cloudflare build
- [ ] Production smoke test: `/`, assets, one full game per mode
- [ ] PO sign-off for deploy
- [ ] Create `beta-2` tag

---

## Commits

| | |
|---|---|
| **Release candidate runtime** | `ad2ac0ae54c46240aec852c5a43a6e9fa94d3463` — `chore: complete Sprint 2 mobile polish` |
| **Release prep checkpoint** | _recorded at S2-08 commit_ |
| **Deploy commit** | _TBD — after PO GO_ |
| **Previous baseline** | `6353fec` — Beta 1 initial playable release |
| **Beta 1 tag** | `beta-1` → `1b272866ed85b66dea7e6fbf5c91089507c1395f` (unchanged) |
| **Beta 2 tag** | **Not created** |

---

## Validation log

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — 64/64 *(final checkpoint)* |
| `npm run build` | PASS *(final checkpoint)* |
| Manual regression / smoke | **COMPLETE** |
| Production deploy | **NOT PERFORMED** |
| Mobile P1-04 verification | PASS (prior Sprint 2 acceptance) |

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
