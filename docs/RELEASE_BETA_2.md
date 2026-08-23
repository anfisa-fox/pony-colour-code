# Release Notes — Beta 2

**Release:** Beta 2  
**Status:** **PUBLISHED**  
**Last updated:** 23 August 2026

---

## Production

| Item | Value |
|------|-------|
| **URL** | https://pony-colour-code.pages.dev/ |
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
- **How-to-play tutorial** — dual-mode visual example on START
- **Feedback label** — «нет совпадений» for positional miss
- Expanded automated tests (64)

See [SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md).

---

## Release status — COMPLETE

| Area | Status |
|------|--------|
| Sprint 2 scope | **COMPLETE** |
| Production deploy | **COMPLETE** |
| PO visual acceptance (desktop + mobile) | **ACCEPTED** |
| Tutorial polish | **ACCEPTED** |
| `beta-2` tag | **Created** on release commit |

### PO production acceptance (23 August 2026)

- Desktop visual check: **ACCEPTED**
- Mobile visual check: **ACCEPTED**
- «Как играть?» tutorial: **ACCEPTED**
- Beginner positional connectors: **ACCEPTED**
- Classic 2×2 aggregate feedback: **ACCEPTED**
- Medal legend; «нет совпадений»; My World link removed: **ACCEPTED**

---

## Pre-release checklist — all complete

### Code and tests

- [x] `npm run test:run` — PASS (64 tests)
- [x] `npm run build` — PASS
- [x] Beginner positional tests pass
- [x] Classic regression — Beta 1 scoring unchanged

### Functional QA

- [x] Beginner / Classic modes; mobile GAME; START/RESULT; S2-09/S2-10
- [x] Production visual QA — desktop + mobile — PO accepted

### Documentation & release

- [x] Release documentation finalized
- [x] Production deploy
- [x] PO sign-off
- [x] `beta-2` tag created

---

## Commits

| | |
|---|---|
| **Beta 2 runtime (accepted production)** | `d83626c75b85dad9c1474b5878093915c09909eb` — `fix: polish how-to-play tutorial presentation` |
| **Release documentation** | _final release commit on `main`_ |
| **Beta 2 tag** | `beta-2` → release commit HEAD |
| **Previous baseline** | `6353fec` — Beta 1 initial playable release |
| **Beta 1 tag** | `beta-1` → `1b272866ed85b66dea7e6fbf5c91089507c1395f` (unchanged) |

---

## Validation log

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — 64/64 |
| `npm run build` | PASS |
| Manual regression / smoke | **COMPLETE** |
| Production deploy | **COMPLETE** |
| PO production acceptance | **ACCEPTED** |

---

## Known limitations (carry-forward)

- My World integration deferred (P1-02/P1-03)
- Decorative RESULT purple orb (P2-02 deferred)
- ~19 MB static assets (P3-04 deferred)
- Google Fonts via CDN (P3-05 deferred)

---

## References

- [RELEASE_BETA_1.md](RELEASE_BETA_1.md) — Beta 1 historical release
- [SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) — Sprint 2 Definition of Done
