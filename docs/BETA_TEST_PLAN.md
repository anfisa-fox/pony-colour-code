# Beta 1 Test Plan — Pony Colour Code

**Purpose:** Observe real child usage. **Do not** teach the game during the session unless the child is stuck and PO approves minimal help.

**Production URL:** https://pony-colour-code.pages.dev/

**Last updated:** 10 August 2026

---

## Goals

- Understand whether a child can play independently
- Identify confusion points in START, feedback, duplicates, history, RESULT
- Capture replay motivation
- Feed Product Owner decisions — **not** automatic bug fixes

---

## Observation questions

During or after the session, note:

1. Is **START** understandable without adult explanation?
2. Does the child understand they must pick **4 ponies**?
3. Does the child understand **feedback** after submit?
4. Can they distinguish **three feedback types** (exact / partial / miss)?
5. Do they notice or use **duplicate** characters correctly?
6. Do they use **attempt history**?
7. Is **RESULT** (win/loss) clear?
8. Do they want to play again?
9. Where do they stop or ask for help?
10. On **mobile**, does repeated scrolling between Current Guess, Character Palette, and primary controls (`Удалить` / `Подтвердить`) cause confusion, accidental actions, loss of context, or frustration?

---

## Pre-existing Beta observations (do not treat as newly discovered)

The following was **already confirmed by Product Owner** on production before or during Beta 1 testing. Future testers reporting the same behaviour should reference backlog **P1-04**, not file a new defect.

| ID | Observation | Status |
|----|-------------|--------|
| P1-04 | **Mobile GAME controls require scrolling** — after selecting characters on a real mobile device, `Удалить` and `Подтвердить` are below the Character Palette; player must scroll down each turn | CONFIRMED on https://pony-colour-code.pages.dev/ |

During Beta testing, still observe **behavioural impact** of this layout (confusion, frustration, accidental taps) — but do **not** prescribe a layout solution in test notes. Evidence informs post-Beta design choice (see BACKLOG P1-04 directions A/B).

---

## Observation log format

| Field | Description |
|-------|-------------|
| **Date** | Session date |
| **Device** | e.g. iPhone 13, Chrome desktop |
| **Scenario** | e.g. first play, second play same day |
| **Observation** | What happened (factual) |
| **User quote** | Optional, verbatim |
| **Severity** | info / minor / major / blocker |
| **Possible issue** | Hypothesis — not confirmed bug |
| **Decision** | PO: backlog / no action / needs investigation |

### Example row

| Date | Device | Scenario | Observation | Quote | Severity | Possible issue | Decision |
|------|--------|----------|-------------|-------|----------|----------------|----------|
| 2026-08-11 | iPad Safari | First play | Submitted 3 ponies, confused why button disabled | «Почему не нажимается?» | minor | Submit affordance | PO review |

---

## Session protocol (suggested)

1. Open production URL (not localhost)
2. Minimal intro: «Это новая игра, попробуй» — **no rule lecture**
3. Observe silently when possible
4. Note timestamps for confusion points
5. After session: fill log row(s)
6. **Do not** add to BACKLOG until PO reviews observation

---

## Out of scope for this test

- Comparing to commercial Mastermind apps
- Performance benchmarking
- Accessibility audit (separate task if needed)
- My World navigation (not wired in Beta 1)

---

## References

- [PROJECT_STATUS.md](PROJECT_STATUS.md)
- [BACKLOG.md](BACKLOG.md)
- [HANDOVER.md](HANDOVER.md) — game rules invariants
