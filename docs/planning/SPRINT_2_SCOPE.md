# Sprint 2 Scope — Pony Colour Code

**Status:** IN PROGRESS — Steps 1–2 accepted  
**Last updated:** 22 August 2026  
**Product Owner:** Approved after Beta 1 user testing; Steps 1+2 accepted 22 Aug 2026

---

## Product goal

**Make Pony Colour Code easier for a child to learn and substantially better to play on a phone, while preserving the validated Classic game and preparing the UI/codebase for a future Android application.**

Sprint 2 produces the next **web release** (Beta 2). Native Android implementation is **not** part of Sprint 2.

---

## Beta 1 outcome (context)

Beta 1 user testing is **complete and successful**:

- Game concept validated
- Game is playable and enjoyable
- No critical defects discovered
- User testing generated UX/product improvements for Sprint 2

Beta 1 runtime remains the immutable historical baseline (`6353fec`). See [RELEASE_BETA_1.md](../RELEASE_BETA_1.md).

---

## Approved scope — workstreams

| # | Workstream | Spec document | Size |
|---|------------|---------------|------|
| 1 | **Beginner Mode** — positional feedback, duplicate-safe algorithm | [BEGINNER_MODE_SPEC.md](./BEGINNER_MODE_SPEC.md) | L |
| 2 | **Classic Mode regression preservation** — Beta 1 semantics unchanged | [BEGINNER_MODE_SPEC.md](./BEGINNER_MODE_SPEC.md) §Classic | M |
| 3 | **Mode Selection UX** — START screen, Beginner default/recommended | [MODE_SELECTION_UX.md](./MODE_SELECTION_UX.md) | M |
| 4 | **App-ready Mobile GAME UX** — resolve P1-04 | [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md) | L |
| 5 | **START + RESULT mobile review** | [MODE_SELECTION_UX.md](./MODE_SELECTION_UX.md), [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md) | S–M |
| 6 | **Android/Capacitor readiness constraints** | [ANDROID_READINESS.md](./ANDROID_READINESS.md) | S |
| 7 | **Automated tests** — Beginner positional, Classic regression, mode session | [BEGINNER_MODE_SPEC.md](./BEGINNER_MODE_SPEC.md) §Tests | M |
| 8 | **Web Beta 2 release preparation** | [RELEASE_BETA_2.md](../RELEASE_BETA_2.md) | S |

---

## Explicitly OUT OF SCOPE

| Item | Reason |
|------|--------|
| Native Android implementation | Future phase after web Beta 2 |
| Capacitor installation / configuration | Document constraints only |
| Android Studio project / APK / Play Store | Future phase |
| My World integration (P1-02, P1-03) | Deferred; ADR-001 unchanged |
| RESULT purple orb redesign (P2-02) | Cosmetic; not Sprint 2 |
| General asset optimization (P3-04) | Unless required by Sprint 2 implementation |
| Google Fonts self-hosting (P3-05) | Unless required by agreed implementation |
| Backend, persistence, PWA, tutorial, hot-seat | Post-Sprint 2 |

---

## Dependencies

```
PO decisions (approved)
        ↓
Sprint 2 planning docs (this package)
        ↓
┌───────────────────────────────────────────────────┐
│  Beginner spec + Classic invariant                │
│  Mode selection UX spec                           │
│  Mobile GAME UX spec                              │
└───────────────────────────────────────────────────┘
        ↓
Implementation (authorized separately)
        ↓
Tests → Beta 2 release checklist → deploy
```

| Dependency | Blocks |
|------------|--------|
| [BEGINNER_MODE_SPEC.md](./BEGINNER_MODE_SPEC.md) finalized | Beginner engine, GuessRow rendering, Beginner tests |
| [MODE_SELECTION_UX.md](./MODE_SELECTION_UX.md) finalized | START screen, session `gameMode` field |
| [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md) finalized | GAME layout/CSS refactor |
| Classic regression tests | Any engine refactor |

---

## Acceptance criteria (Sprint 2 complete)

### Beginner Mode

- [ ] Positional feedback per guess slot: GREEN / YELLOW / PINK
- [ ] Algorithm matches [BEGINNER_MODE_SPEC.md](./BEGINNER_MODE_SPEC.md) (PASS 1 + PASS 2)
- [ ] Invariant holds: `count(GREEN) == Classic exact`, `count(YELLOW) == Classic partial` for all secret+guess pairs
- [ ] Duplicates allowed; duplicate-heavy test matrix passes
- [ ] Classic `evaluateGuess()` unchanged

### Classic Mode

- [ ] Aggregate feedback unchanged from Beta 1 (tokens ≠ positions)
- [ ] All existing 24 unit tests pass
- [ ] No regression in scoring for documented Beta 1 cases

### Mode Selection

- [ ] Two mode options on START with child-readable descriptions
- [ ] Beginner selected by default and visually recommended
- [ ] Selected mode passed to session on «Играть»
- [ ] START usable on phone portrait (see MODE_SELECTION_UX)

### Mobile GAME (P1-04)

- [ ] After choosing characters, primary actions (`Удалить`, `Подтвердить`) usable **without mandatory scroll to page bottom**
- [ ] Mobile hierarchy follows [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md)
- [ ] Desktop layout not regressed (PO sign-off on representative desktop viewport)
- [ ] Safe-area and viewport considerations applied where layout is mobile-specific

### START + RESULT mobile

- [ ] START mode cards and «Играть» usable on ~375 px portrait without horizontal overflow
- [ ] RESULT primary action reachable without excessive scrolling on mobile

### Tests

- [ ] Beginner positional tests per spec matrix
- [ ] Classic regression suite intact (24+ tests)
- [ ] Session tests cover mode selection → gameplay

### Release

- [ ] [RELEASE_BETA_2.md](../RELEASE_BETA_2.md) checklist completed
- [ ] `npm run test:run` PASS
- [ ] `npm run build` PASS
- [ ] Deploy to Cloudflare Pages (when PO authorizes)

---

## Definition of Done

Sprint 2 is **done** when:

1. All acceptance criteria above are met.
2. Product Owner accepts Beta 2 on production URL (or staging, if PO specifies).
3. Documentation updated: `PROJECT_STATUS.md`, `RELEASE_BETA_2.md`, `BACKLOG.md` Sprint 2 items closed.
4. No known blocker defects in Beginner, Classic, or mobile GAME loop on PO test devices.

---

## Major risks

| Risk | Mitigation |
|------|------------|
| Beginner duplicate edge cases | Formal spec + exhaustive test matrix before coding |
| Classic regression during engine refactor | Separate `evaluateGuessPositional()`; do not modify `evaluateGuess()` |
| Mobile layout breaks desktop | Mobile changes scoped to media queries; desktop snapshot review |
| History compaction confuses child | Preserve full history access; compact presentation only on narrow viewports |
| Scope creep (My World, Capacitor, assets) | Out-of-scope list enforced; PO approval required for additions |

---

## Documentation map (Sprint 2 entry point)

| Start here | Purpose |
|------------|---------|
| **This file** | Scope, DoD, acceptance |
| [BEGINNER_MODE_SPEC.md](./BEGINNER_MODE_SPEC.md) | Scoring algorithm |
| [MODE_SELECTION_UX.md](./MODE_SELECTION_UX.md) | START screen UX |
| [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md) | P1-04 mobile GAME |
| [ANDROID_READINESS.md](./ANDROID_READINESS.md) | Future Capacitor constraints |
| [RELEASE_BETA_2.md](../RELEASE_BETA_2.md) | Release checklist |

Historical Beta 1 specs remain unchanged except supersession notes — see [HANDOVER.md](../HANDOVER.md) §15.

---

## Supersedes (partial)

Sprint 2 **extends** Beta 1 MVP. The following v1 documents remain historical baseline for Beta 1; Sprint 2 behaviour is defined in this planning package:

- `MVP_CONTRACT_v1.0.md` — single-mode MVP scope
- `UI_SPECIFICATION_v1.0.md` — aggregate-only feedback
- `ARCHITECTURE_v1.0.md` — no mode configuration

Do not silently rewrite v1 documents.

---

## Progress (22 August 2026)

| Step / workstream | ID | Status | Notes |
|-------------------|-----|--------|-------|
| **Шаг 1 — Dual-mode mechanics** | S2-01, S2-02, S2-07 (partial) | **DONE / ACCEPTED** | `beginner` + `classic`; `evaluateGuessPositional()`; Classic unchanged; 48 tests |
| **Шаг 2 — START / Mode Selection UX** | S2-03 | **DONE / ACCEPTED** | Mode cards, Secret/Guess example, feedback in cards, `startGame(mode)` |
| **Шаг 3 — GAME dual-mode feedback UI** | S2-01 (UI), S2-07 | **DONE / ACCEPTED** | Positional history Beginner; Classic aggregate; 57 tests |
| Mobile GAME / P1-04 | S2-04 | **NEXT / NOT STARTED** | `Удалить` / `Подтвердить` without mandatory scroll |
| Mobile START/RESULT polish | S2-05 | **NOT STARTED** | Narrow viewport review |
| Beta 2 polish — START orientation | S2-09 | **NOT STARTED** | Hero mirror consistency with GAME |
| Beta 2 polish — RESULT → START | S2-10 | **NOT STARTED** | Mode re-selection before new game |
| Android/Capacitor readiness | S2-06 | **OUT OF SPRINT** | Constraints documented; implementation after Beta 2 |
| Regression + expanded tests | S2-07 | **DONE** | Engine/Session/mode + presentation unit tests |
| Beta 2 release | S2-08 | **NOT STARTED** | Production still Beta 1 |

**Current validation:** `npm run test:run` — 57/57 PASS; `npm run build` — PASS.

**Production:** Beta 1 live; Beta 2 **NOT RELEASED**; no deployment in Step 3 checkpoint.
