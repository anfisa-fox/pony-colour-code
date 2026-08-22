# Backlog — Pony Colour Code

**Source of truth** for open work.  
**Last updated:** 22 August 2026

**Sprint 2 entry point:** [planning/SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md)

Do **not** treat duplicate characters or Classic scoring engine as defects — see [HANDOVER.md](HANDOVER.md) invariants.

---

## Sprint 2 — progress summary

| Step | Status |
|------|--------|
| Шаг 1 — Dual-mode mechanics | **Done / Accepted** |
| Шаг 2 — START / Mode Selection | **Done / Accepted** |
| Шаг 3 — GAME dual-mode UI | **Not started** |
| Mobile GAME / P1-04 | **Not started** |
| Beta 2 release | **Not started** |

---

## Beta 1 — completed

| ID | Priority | Status | Description | Outcome |
|----|----------|--------|-------------|---------|
| P1-01 | P1 | **Done** | Real child Beta 1 playtest | **Complete and successful.** Game concept validated; playable and enjoyable; no critical defects. UX improvements captured for Sprint 2. PO approved 22 Aug 2026. |

---

## Sprint 2 — in scope

| ID | Priority | Status | Description | Spec / acceptance |
|----|----------|--------|-------------|-------------------|
| S2-01 | P0 | **Done** | **Beginner Mode** — positional feedback, duplicate-safe algorithm | Engine + Session; GAME UI — Step 3 |
| S2-02 | P0 | **Done** | **Classic Mode regression preservation** | `evaluateGuess()` unchanged; Classic tests pass |
| S2-03 | P0 | **Done** | **Mode Selection UX** on START — Beginner default | [MODE_SELECTION_UX.md](planning/MODE_SELECTION_UX.md); PO accepted 22 Aug 2026 |
| S2-04 | P0 | Open | **Mobile GAME UX** — resolve P1-04 | [MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md) |
| S2-05 | P1 | Open | **START + RESULT mobile review** | Usable on 375px portrait; see planning docs |
| S2-06 | P1 | Open | **Android readiness constraints** in implementation | [ANDROID_READINESS.md](planning/ANDROID_READINESS.md) — out of sprint implementation |
| S2-07 | P0 | **Partial** | **Automated tests** for Beginner + mode session | Engine/Session/mode flow — done; GAME UI tests — Step 3 |
| S2-08 | P1 | Open | **Web Beta 2 release preparation** | [RELEASE_BETA_2.md](RELEASE_BETA_2.md) checklist |

### P1-04 traceability (origin → Sprint 2)

| ID | Priority | Status | Description | Sprint 2 mapping |
|----|----------|--------|-------------|------------------|
| P1-04 | P1 | **CONFIRMED** → **Sprint 2** | Mobile GAME controls require scrolling | Addressed by **S2-04**. Original Beta 1 observation preserved below. |

#### P1-04: Mobile GAME controls require scrolling (historical observation)

**Problem (Beta 1 production):** On a real mobile device the primary controls `Удалить` and `Подтвердить` are positioned below the Character Palette. After selecting characters, the player must scroll down each turn.

**Evidence:** Observed by Product Owner on https://pony-colour-code.pages.dev/

**Sprint 2 resolution:** [MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md) — mobile reorder hierarchy; actions usable without mandatory scroll to page bottom.

---

## Deferred (not Sprint 2)

| ID | Priority | Status | Description | Notes |
|----|----------|--------|-------------|-------|
| P1-02 | P1 | Deferred | Pony Colour Code → My World navigation | Out of Sprint 2 scope |
| P1-03 | P1 | Deferred | My World → Pony Colour Code entry point | Out of Sprint 2 scope; requires `my-world` repo |

---

## P2 — UX / product clarity

| ID | Priority | Status | Description | Notes |
|----|----------|--------|-------------|-------|
| P2-01 | P2 | **Informing Sprint 2** | Validate feedback mechanics understandability | Beta outcome: Beginner Mode addresses learning curve; close after Beta 2 PO review |
| P2-02 | P2 | Deferred | Resolve / remove / redesign decorative purple RESULT orb | Out of Sprint 2 scope |

---

## P3 — Quality, performance, polish

| ID | Priority | Status | Description | Notes |
|----|----------|--------|-------------|-------|
| P3-01 | P3 | **Partial** | Extend scoring regression / property test coverage | Beginner invariant tests done (S2-07 partial) |
| P3-02 | P3 | Open | Duplicate-heavy multi-attempt scenario regression | Consider in S2-07 |
| P3-03 | P3 | Open | `feedbackUtils` / session round-trip tests | Consider in S2-07 |
| P3-04 | P3 | Deferred | Optimize static character assets | Out of Sprint 2 unless required |
| P3-05 | P3 | Deferred | Google Fonts self-hosting | Out of Sprint 2 unless required |
| P3-06 | P3 | Partial → S2-05 | Verify START layout on real narrow devices (~421–480 px) | Address in START mobile review |

---

## Explicitly NOT backlog (by design)

| Topic | Reason |
|-------|--------|
| Duplicate characters in secret/guess | Allowed by game rules (`ALLOW_DUPLICATES = true`) |
| Classic scoring engine correctness (Beta 1) | Validated pre-freeze; Beginner adds new function, Classic unchanged |
| My World monorepo / shared build | Rejected in ADR-001 |
| Capacitor / Android native (Sprint 2) | Future phase — constraints only in [ANDROID_READINESS.md](planning/ANDROID_READINESS.md) |

---

## How to add items

1. Product Owner decides priority and sprint assignment  
2. Add row with ID, acceptance criteria, spec link  
3. Update [SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md) if scope changes require PO approval
