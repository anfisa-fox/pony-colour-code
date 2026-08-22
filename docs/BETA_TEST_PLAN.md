# Beta 1 Test Plan — Pony Colour Code

**Status:** **COMPLETED** — Beta 1 user testing finished successfully  
**Purpose:** Observe real child usage (historical record)  
**Production URL:** https://pony-colour-code.pages.dev/  
**Last updated:** 22 August 2026

---

## Outcome (Product Owner approved)

| Result | Detail |
|--------|--------|
| Status | **Complete and successful** |
| Game concept | Validated |
| Playability | Playable and enjoyable |
| Critical defects | None |
| Follow-up | UX/product improvements captured for Sprint 2 |

Backlog **P1-01** closed. Sprint 2 scope: [planning/SPRINT_2_SCOPE.md](planning/SPRINT_2_SCOPE.md).

---

## Goals (historical)

- Understand whether a child can play independently
- Identify confusion points in START, feedback, duplicates, history, RESULT
- Capture replay motivation
- Feed Product Owner decisions

---

## Observation questions (historical)

During or after the session, observers noted:

1. Is **START** understandable without adult explanation?
2. Does the child understand they must pick **4 ponies**?
3. Does the child understand **feedback** after submit?
4. Can they distinguish **three feedback types** (exact / partial / miss)?
5. Do they notice or use **duplicate** characters correctly?
6. Do they use **attempt history**?
7. Is **RESULT** (win/loss) clear?
8. Do they want to play again?
9. Where do they stop or ask for help?
10. On **mobile**, does repeated scrolling between Current Guess, Character Palette, and primary controls cause confusion or frustration?

---

## Confirmed observations (fed into Sprint 2)

| ID | Observation | Sprint 2 response |
|----|-------------|-------------------|
| P1-04 | **Mobile GAME controls require scrolling** — `Удалить` / `Подтвердить` below palette; mandatory scroll each turn | **S2-04** — [MOBILE_GAME_UX_SPRINT_2.md](planning/MOBILE_GAME_UX_SPRINT_2.md) |
| (product) | Aggregate Mastermind feedback learning curve for children | **S2-01** Beginner Mode — [BEGINNER_MODE_SPEC.md](planning/BEGINNER_MODE_SPEC.md) |
| (product) | Mode choice before play | **S2-03** — [MODE_SELECTION_UX.md](planning/MODE_SELECTION_UX.md) |

---

## Observation log format (template for future testing)

| Field | Description |
|-------|-------------|
| **Date** | Session date |
| **Device** | e.g. iPhone 13, Chrome desktop |
| **Scenario** | e.g. first play, Beginner vs Classic |
| **Observation** | What happened (factual) |
| **User quote** | Optional, verbatim |
| **Severity** | info / minor / major / blocker |
| **Decision** | PO: backlog / no action |

---

## Out of scope (Beta 1 plan)

- Comparing to commercial Mastermind apps
- Performance benchmarking
- Full accessibility audit
- My World navigation (not wired in Beta 1)

---

## References

- [PROJECT_STATUS.md](PROJECT_STATUS.md)
- [BACKLOG.md](BACKLOG.md)
- [HANDOVER.md](HANDOVER.md)
- [RELEASE_BETA_1.md](RELEASE_BETA_1.md)
