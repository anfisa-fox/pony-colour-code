# Backlog — Pony Colour Code

**Source of truth** for open work.  
**Last updated:** 23 August 2026

**Sprint 3 entry point:** [planning/ANDROID_V0_1_SCOPE.md](planning/ANDROID_V0_1_SCOPE.md)

---

## Sprint 3 — Android v0.1 (planning)

| Step | Status |
|------|--------|
| S3-01 Toolchain discovery | **Planned** |
| S3-02 Capacitor integration | **Not started** |
| S3-03 Native shell polish | **Not started** |
| S3-04 APK build | **Not started** |
| S3-05 Real device acceptance (TECNO BG6) | **Not started** |
| S3-06 Checkpoint / tag | **Not started** |

Capacitor **not installed**. `android/` **not created**.

---

## Sprint 2 — completed

Do **not** treat duplicate characters or Classic scoring engine as defects — see [HANDOVER.md](HANDOVER.md) invariants.

---

## Sprint 2 — progress summary

| Step | Status |
|------|--------|
| Шаг 1 — Dual-mode mechanics | **Done / Accepted** |
| Шаг 2 — START / Mode Selection | **Done / Accepted** |
| Шаг 3 — GAME dual-mode UI | **Done / Accepted** |
| Mobile GAME / P1-04 (S2-04) | **Done / Accepted** |
| Mobile START/RESULT (S2-05) | **Done / Verified** |
| S2-09 START hero orientation | **Done / Accepted** |
| S2-10 RESULT → START | **Done** |
| Beta 2 release (S2-08) | **Done / Released** |

---

## Beta 1 — completed

| ID | Priority | Status | Description | Outcome |
|----|----------|--------|-------------|---------|
| P1-01 | P1 | **Done** | Real child Beta 1 playtest | **Complete and successful.** Game concept validated; playable and enjoyable; no critical defects. UX improvements captured for Sprint 2. PO approved 22 Aug 2026. |

---

## Sprint 2 — in scope

| ID | Priority | Status | Description | Spec / acceptance |
|----|----------|--------|-------------|-------------------|
| S2-01 | P0 | **Done** | **Beginner Mode** — positional feedback, duplicate-safe algorithm | Engine + Session + GAME UI (Step 3 accepted) |
| S2-02 | P0 | **Done** | **Classic Mode regression preservation** | `evaluateGuess()` unchanged; Classic tests pass |
| S2-03 | P0 | **Done** | **Mode Selection UX** on START — Beginner default | [MODE_SELECTION_UX.md](planning/MODE_SELECTION_UX.md); PO accepted 22 Aug 2026 |
| S2-04 | P0 | **Done** | **Mobile GAME UX** — resolve P1-04 | [MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md); PO accepted 414×896 |
| S2-05 | P1 | **Done** | **START + RESULT mobile review** | Verified 414×896 / 360×780; no runtime changes; 375×667 stress only |
| S2-06 | P1 | **Planned → S3** | **Android readiness** | Constraints in [ANDROID_READINESS.md](planning/ANDROID_READINESS.md); scope in [ANDROID_V0_1_SCOPE.md](planning/ANDROID_V0_1_SCOPE.md) |
| S2-07 | P0 | **Done** | **Automated tests** | 64 tests |
| S2-08 | P1 | **Done** | **Web Beta 2 release** | Published; PO accepted 23 Aug 2026 |
| S2-09 | P1 | **Done** | **START hero character orientation** | Mirrored Pinkie/Fluttershy/Rarity on hero ensemble |
| S2-10 | P1 | **Done** | **RESULT → START mode-selection flow** | `returnToStart`; last mode pre-selected |

### P1-04 traceability (origin → Sprint 2)

| ID | Priority | Status | Description | Sprint 2 mapping |
|----|----------|--------|-------------|------------------|
| P1-04 | P1 | **Done** | Mobile GAME controls require scrolling | Resolved by **S2-04** (accepted). Historical observation below. |

#### P1-04: Mobile GAME controls require scrolling (historical observation)

**Problem (Beta 1 production):** On a real mobile device the primary controls `Удалить` and `Подтвердить` are positioned below the Character Palette. After selecting characters, the player must scroll down each turn.

**Evidence:** Observed by Product Owner on https://pony-colour-code.pages.dev/

**Sprint 2 resolution:** [MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md) — mobile reorder hierarchy; actions usable without mandatory scroll to page bottom.

#### S2-09: START hero character orientation consistency

**Problem:** На START в верхнем hero/showcase все шесть персонажей визуально ориентированы одинаково. В GAME и в примере выбора режима персонажи 4–6 (Pinkie, Fluttershy, Rarity) используют предусмотренную зеркальную ориентацию (`mirrored: true`).

**Status:** **COMPLETED** — `start-hero-ensemble__figure--mirrored` for characters with `mirrored: true`; characters 1–3 unchanged.

#### S2-10: RESULT → START mode-selection flow

**Status:** **COMPLETED** — `RETURN_TO_START` action; `RESULT → START → Играть → GAME`; last mode pre-selected via `initialMode`.

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
| P3-06 | P3 | **Done** | Verify START layout on real narrow devices | S2-05 verified 414×896 / 360×780 |

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
