# Backlog — Pony Colour Code

**Source of truth** for open work after Beta 1 freeze.  
**Last updated:** 10 August 2026

Do **not** treat duplicate characters or scoring engine as defects — see [HANDOVER.md](HANDOVER.md) invariants.

---

## P1 — After Beta 1 testing (high priority)

| ID | Priority | Status | Description | Acceptance / evidence |
|----|----------|--------|-------------|------------------------|
| P1-01 | P1 | Open | Real child Beta 1 playtest | Completed session(s) using [BETA_TEST_PLAN.md](BETA_TEST_PLAN.md); observations recorded; PO review |
| P1-02 | P1 | Open | Enable Pony Colour Code → My World navigation | `MyWorldLink` becomes working `<a href>` to My World production URL; accessible label; no broken link |
| P1-03 | P1 | Open | Add My World → Pony Colour Code entry point | Link in My World nav or home to `https://pony-colour-code.pages.dev/`; independent deploy preserved (ADR-001) |

---

## P2 — UX / product clarity

| ID | Priority | Status | Description | Acceptance / evidence |
|----|----------|--------|-------------|------------------------|
| P2-01 | P2 | Open | Validate feedback mechanics understandability | Beta observations show child understands exact/partial/miss without adult explanation |
| P2-02 | P2 | Open | Resolve / remove / redesign decorative purple RESULT orb | PO decision after beta; visual pass only; no gameplay change |

---

## P3 — Quality, performance, polish

| ID | Priority | Status | Description | Acceptance / evidence |
|----|----------|--------|-------------|------------------------|
| P3-01 | P3 | Open | Extend scoring regression / property test coverage | Invariants A–H from pre-freeze diagnostic encoded as automated tests |
| P3-02 | P3 | Open | Duplicate-heavy multi-attempt scenario regression | Test reproducing observed 4-attempt PO scenario; asserts consistent secret exists |
| P3-03 | P3 | Open | `feedbackUtils` / session round-trip tests | Unit tests for `buildFeedbackSequence`, aria labels, history storage |
| P3-04 | P3 | Open | Optimize static character assets | Deploy size reduced; visual quality acceptable to PO; no PNG edits without approval |
| P3-05 | P3 | Open | Consider Google Fonts self-hosting | Fonts work offline / without Google CDN; Cyrillic preserved |
| P3-06 | P3 | Open | Verify START layout on real narrow devices (~421–480 px) | No overflow/overlap on tested devices; PO sign-off |

---

## Explicitly NOT backlog (by design)

| Topic | Reason |
|-------|--------|
| Duplicate characters in secret/guess | Allowed by game rules (`ALLOW_DUPLICATES = true`) |
| Scoring engine correctness | Exhaustive validation found no bug; re-verify before any Engine change |
| My World monorepo / shared build | Rejected in ADR-001 |

---

## How to add items

1. Record observation in Beta test log (see BETA_TEST_PLAN.md)  
2. Product Owner decides: backlog / won't fix / defer  
3. Add row here with ID, priority, acceptance criteria  
4. Do **not** implement during user testing freeze without PO approval
