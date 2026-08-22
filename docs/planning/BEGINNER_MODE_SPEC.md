# Beginner Mode Specification — Pony Colour Code

**Status:** APPROVED  
**Last updated:** 22 August 2026  
**Applies to:** Sprint 2 implementation

---

## 1. Purpose

**Beginner Mode** helps a child enter the game easily, understand cause and effect quickly, and enjoy early sessions without first mastering abstract Mastermind aggregate feedback.

Beginner is the **recommended default mode** (see [MODE_SELECTION_UX.md](./MODE_SELECTION_UX.md)).

**Classic Mode** (Beta 1) is unchanged — see §8.

---

## 2. Child-facing semantics

Each selected pony in the current guess receives **its own** feedback after submit:

| Visual | Meaning (child-facing) |
|--------|------------------------|
| **GREEN** | Эта пони стоит на правильном месте |
| **YELLOW** | Такая пони есть в секретном коде, но в другом месте |
| **PINK** | Такой пони здесь нет (нет неиспользованного совпадения в секрете) |

Preferred conceptual wording (PO-approved meaning):

> Каждая выбранная пони получает собственную подсказку.  
> Зелёная — она стоит правильно.  
> Жёлтая — такая пони есть, но в другом месте.  
> Розовая — такой пони здесь нет.

Exact UI copy may be refined during implementation; **meaning must be preserved**.

---

## 3. Game rules (unchanged from Beta 1)

| Rule | Value |
|------|-------|
| Secret length | 4 |
| Character pool | 6 G4 Mane 6 |
| Max attempts | 10 |
| Duplicates | **ALLOWED** in secret and guess |
| Win | All 4 positions GREEN (equivalent to 4 Classic exact) |

---

## 4. Formal scoring algorithm

Beginner uses the same **one-use-per-secret-occurrence** principle as Classic Mastermind.

### PASS 1 — Exact matches

For each position `i` from 0 to 3:

- If `guess[i] === secret[i]`:
  - Position `i` → **GREEN**
  - Remove/reserve that occurrence from both secret and guess pools (it cannot participate in PASS 2)

### PASS 2 — Remaining positions, left to right

For each position `i` that is **not** GREEN, process in **increasing index order** (left to right):

- If `guess[i]` exists in the **remaining unmatched secret pool**:
  - Position `i` → **YELLOW**
  - **Consume exactly one** matching secret occurrence from the pool
- Otherwise:
  - Position `i` → **PINK**

### Pseudocode

```
function evaluateGuessPositional(secret, guess):
  result = [PINK, PINK, PINK, PINK]
  secretPool = copy of secret with indices
  guessPool = indices 0..3

  // PASS 1
  for i in 0..3:
    if secret[i] == guess[i]:
      result[i] = GREEN
      mark secret[i] and guess[i] as used (exclude from pools)

  // Build remaining secret multiset from unused secret positions
  remainingSecret = [secret[i] for i not used in PASS 1]

  // PASS 2 — left to right
  for i in 0..3:
    if result[i] == GREEN: continue
    pony = guess[i]
    if pony in remainingSecret:
      result[i] = YELLOW
      remove one occurrence of pony from remainingSecret
    else:
      result[i] = PINK  // already default

  return result
```

---

## 5. Invariant with Classic Mode

For **every** valid `secret` + `guess` pair:

```
count(GREEN)  == evaluateGuess(secret, guess).exact
count(YELLOW) == evaluateGuess(secret, guess).partial
count(PINK)   == 4 - exact - partial
```

**Beginner and Classic must never contradict** how many characters were correctly identified.

Implementation MUST verify this invariant in automated tests (property-style or exhaustive matrix).

Classic `evaluateGuess()` in `src/game/engine.ts` **must not be modified**. Add a new function (e.g. `evaluateGuessPositional`).

---

## 6. Worked examples

Legend: `Tw`=twilight, `RD`=rainbow, `AJ`=applejack, `PP`=pinkie, `FS`=fluttershy, `R`=rarity

### Example 1 — All exact (win)

| | Pos 0 | Pos 1 | Pos 2 | Pos 3 |
|---|-------|-------|-------|-------|
| Secret | Tw | RD | AJ | PP |
| Guess | Tw | RD | AJ | PP |
| **Beginner** | G | G | G | G |
| Classic | exact=4, partial=0 |

### Example 2 — All wrong position

| | Pos 0 | Pos 1 | Pos 2 | Pos 3 |
|---|-------|-------|-------|-------|
| Secret | Tw | RD | AJ | PP |
| Guess | PP | AJ | RD | Tw |
| **Beginner** | Y | Y | Y | Y |
| Classic | exact=0, partial=4 |

PASS 1: no greens. PASS 2 left-to-right: each guess pony found in remaining pool.

### Example 3 — Mixed

| | Pos 0 | Pos 1 | Pos 2 | Pos 3 |
|---|-------|-------|-------|-------|
| Secret | Tw | RD | AJ | PP |
| Guess | Tw | AJ | RD | FS |
| **Beginner** | G | Y | Y | P |
| Classic | exact=1, partial=2 |

- Pos 0: G (Tw=Tw)
- Remaining secret pool: [RD, AJ, PP]
- Pos 1: AJ in pool → Y, pool → [RD, PP]
- Pos 2: RD in pool → Y, pool → [PP]
- Pos 3: FS not in pool → P

### Example 4 — Duplicates: secret [A, A, B, C], guess [A, B, A, A]

Using abstract IDs A, B, C:

| | Pos 0 | Pos 1 | Pos 2 | Pos 3 |
|---|-------|-------|-------|-------|
| Secret | A | A | B | C |
| Guess | A | B | A | A |
| **Beginner** | G | Y | Y | P |
| Classic | exact=1, partial=2 |

- PASS 1: pos 0 G (A=A). Remaining secret: [A, B, C]
- PASS 2:
  - pos 1: B in pool → Y, pool [A, C]
  - pos 2: A in pool → Y, pool [C]
  - pos 3: A not in pool → P

Classic: 1 exact, 2 partial ✓

### Example 5 — Duplicates: secret [A, A, B, B], guess [A, A, A, A]

| | Pos 0 | Pos 1 | Pos 2 | Pos 3 |
|---|-------|-------|-------|-------|
| Secret | A | A | B | B |
| Guess | A | A | A | A |
| **Beginner** | G | G | P | P |
| Classic | exact=2, partial=0 |

- PASS 1: pos 0 G, pos 1 G. Remaining secret pool: [B, B]
- PASS 2:
  - pos 2: A not in [B, B] → P
  - pos 3: A not in [B, B] → P

Classic: both A's match at pos 0–1; remaining guess A's have no secret counterparts → exact=2, partial=0 ✓

### Example 6 — Duplicates: secret [A, B, A, C], guess [A, A, B, A]

| | Pos 0 | Pos 1 | Pos 2 | Pos 3 |
|---|-------|-------|-------|-------|
| Secret | A | B | A | C |
| Guess | A | A | B | A |
| **Beginner** | G | Y | Y | P |
| Classic | exact=1, partial=2 |

- PASS 1: pos 0 G. Remaining secret: [B, A, C] (from pos 1,2,3)
- PASS 2:
  - pos 1: A in [B,A,C] → Y, pool [B, C]
  - pos 2: B in [B,C] → Y, pool [C]
  - pos 3: A not in [C] → P

Classic verify: exact=1 (pos 0), partial=2 ✓

### Example 7 — No matches

| | Pos 0 | Pos 1 | Pos 2 | Pos 3 |
|---|-------|-------|-------|-------|
| Secret | A | A | B | B |
| Guess | C | C | D | D |
| **Beginner** | P | P | P | P |
| Classic | exact=0, partial=0 |

---

## 7. Edge-case matrix (test requirements)

Automated tests MUST cover at minimum:

| Case ID | Description | Verify invariant |
|---------|-------------|------------------|
| E1 | All exact | ✓ |
| E2 | All partial (rotation) | ✓ |
| E3 | Mixed exact + partial + miss | ✓ |
| E4 | All pink | ✓ |
| E5 | Secret all same, guess all same | ✓ |
| E6 | Secret [A,A,B,C] guess [A,B,A,A] | ✓ Example 4 |
| E7 | Secret [A,B,A,C] guess [A,A,B,A] | ✓ Example 6 |
| E8 | Secret [A,A,B,B] guess [B,B,A,A] | ✓ |
| E9 | Three exact one partial | ✓ |
| E10 | Two exact two partial (duplicate heavy) | ✓ |
| E11 | Guess duplicate, secret single occurrence | ✓ only one Y |
| E12 | Property: for random/sampled pairs, invariant holds | ✓ recommended |

Each test asserts:
- Per-position array length 4
- `greens === exact`, `yellows === partial`
- Values only GREEN | YELLOW | PINK

---

## 8. Classic Mode (unchanged)

Classic Mode is the validated **Beta 1** game:

- Feedback is **aggregate** for the whole attempt
- GREEN tokens = exact count; YELLOW = partial; PINK = miss
- Tokens are **NOT** tied to individual guess positions
- UI: separate `FeedbackGroup` beside guess pegs (see `UI_SPECIFICATION_v1.0.md` §7.3)
- Engine: `evaluateGuess()` only — **no changes**

When `gameMode === 'classic'`, all Beta 1 rendering and scoring paths apply unchanged.

---

## 9. Expected engine API direction

Add to `src/game/engine.ts` (names indicative):

```typescript
export type PositionalFeedback = "green" | "yellow" | "pink";

export function evaluateGuessPositional(
  secret: PonyId[],
  guess: PonyId[],
): PositionalFeedback[];

// evaluateGuess() — UNCHANGED
```

Session history for Beginner should store positional feedback per attempt (extend `GuessRecord` or parallel field) while Classic continues storing `{ exact, partial }`.

UI layer maps positional feedback to per-slot indicators on `GuessRow` (Beginner) vs `FeedbackGroup` (Classic).

---

## 10. UI direction (summary)

| Aspect | Beginner | Classic |
|--------|----------|---------|
| History row | 4 pegs + **4 per-slot feedback indicators** | 4 pegs + **FeedbackGroup** (aggregate) |
| Legend | Positional wording (§2) | Beta 1 aggregate legend |
| START note | Shown when Beginner selected / in Beginner legend | Aggregate note (existing) |

Detailed layout: [MOBILE_GAME_UX_SPRINT_2.md](./MOBILE_GAME_UX_SPRINT_2.md), [MODE_SELECTION_UX.md](./MODE_SELECTION_UX.md).

---

## 11. Test requirements summary

| Layer | Requirement |
|-------|-------------|
| Engine | Full edge-case matrix §7; invariant test vs `evaluateGuess()` |
| Session | Beginner submit stores positional result; Classic unchanged |
| Regression | All 24 existing tests pass without modification of Classic behaviour |

Target: **24 existing + ≥12 Beginner engine tests** minimum before Beta 2.

---

## Supersedes (partial)

This document **supplements** Beta 1 scoring docs for Beginner Mode only. Classic behaviour remains defined by Beta 1 implementation and `UI_SPECIFICATION_v1.0.md` §7.
