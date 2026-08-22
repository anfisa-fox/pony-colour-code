# Mobile GAME UX — Sprint 2

**Status:** APPROVED  
**Last updated:** 22 August 2026  
**Resolves:** Backlog P1-04  
**Scope:** GAME screen primary; START/RESULT review cross-referenced

---

## 1. Problem statement (P1-04)

**Confirmed on Beta 1 production** (real mobile device, https://pony-colour-code.pages.dev/):

On mobile portrait, primary controls **«← Удалить»** and **«Подтвердить»** sit below the Character Palette and Feedback Legend. After selecting characters, the player **must scroll down** to confirm or remove — repeated mandatory scrolling in the core gameplay loop.

Beta 1 remains accepted; this is a **Sprint 2 fix**, not a Beta 1 defect reopen.

---

## 2. Sprint 2 acceptance goal

> After choosing characters, the player must be able to use the primary gameplay actions **without mandatory scrolling to the bottom of the page**.

Verify on typical mobile portrait viewports (≥375px width), including with several history rows present.

---

## 3. Mobile information hierarchy (approved)

Priority on narrow viewports — **active interaction loop first**:

| Priority | Content |
|----------|---------|
| 1 | Current game state / remaining attempts |
| 2 | Current guess (4 slots + counter) |
| 3 | Character selection (palette) |
| 4 | **Primary actions** (Удалить, Подтвердить) |
| 5 | Feedback legend / reference |
| 6 | Attempt history |

**Beta 1 order (problem):** history → current guess → palette → legend → actions — history and legend push actions below fold.

**Sprint 2 intent:** reorder and/or adapt presentation on mobile so priority 1–4 fit in the primary viewport without scroll for a typical turn.

---

## 4. Current Beta 1 layout (baseline)

DOM order in `GameScreen.tsx`:

1. Header (title, attempts, My World link)
2. Secret slots (`? ? ? ?`)
3. **History section** (grows each attempt)
4. Current guess section
5. Character palette (~330px+ on mobile)
6. Feedback legend (compact)
7. **Game actions**

CSS: single column; no sticky regions; `100vh` without `dvh`; no safe-area insets.

---

## 5. Candidate layout approaches

Do **not** prescribe sticky buttons as the only solution. Evaluate during implementation:

### Approach A — Mobile section reorder (recommended direction)

On mobile breakpoint only, **render or CSS-reorder** sections to:

```
Header + attempts
Current guess
Primary actions          ← immediately after guess
Character palette
Feedback legend (compact / collapsible)
History (compact)
Secret slots (optional: demote or inline with header)
```

**Pros:** Natural flow; actions adjacent to guess; no overlay conflicts; Capacitor-friendly  
**Cons:** History below fold (acceptable — lower priority per PO)  
**Desktop:** Preserve Beta 1 visual order via media query / separate layout branch

### Approach B — Sticky action bar

Fixed/sticky footer containing Удалить + Подтвердить on mobile.

**Pros:** Always visible  
**Cons:** Safe-area/browser chrome overlap risk; reduces content area; must not obscure palette  
**Use if:** Approach A insufficient after prototype

### Approach C — Compact / collapsible history

History collapsed by default on mobile («Показать историю» expands), freeing vertical space.

**Pros:** Helps late-game when history is long  
**Cons:** Child may miss history — provide clear expand affordance  
**Compatible with:** A or B

### Recommended design direction

**Primary: Approach A (mobile reorder)** + **optional Approach C** when history exceeds N rows.

Avoid committing to sticky footer (B) unless PO review of prototype shows reorder alone is insufficient.

---

## 6. Desktop preservation

| Requirement | Detail |
|-------------|--------|
| No regression | Desktop (≥768px or project breakpoint) keeps Beta 1 section order and spacing |
| Verification | PO sign-off on desktop before Beta 2 |
| Implementation | Mobile rules scoped to `@media (max-width: …)` — do not shrink desktop palette or remove history prominence on large screens |

---

## 7. Viewport, safe-area, and WebView constraints

Sprint 2 mobile CSS should respect [ANDROID_READINESS.md](./ANDROID_READINESS.md).

| Topic | Requirement |
|-------|-------------|
| **Dynamic viewport** | Prefer `100dvh` or `min-height: 100dvh` for full-screen layouts where Beta 1 used `100vh` |
| **Safe area** | `env(safe-area-inset-bottom)` on any fixed/sticky action region; padding on main screen bottom |
| **Browser chrome** | Design for reduced visible height when mobile URL bar visible |
| **Android WebView** | Avoid browser-only APIs; touch-first; no hover-only affordances |
| **Touch targets** | Maintain ≥44px minimum (already in Beta 1 buttons) |
| **Portrait** | Primary design target; landscape may use same mobile rules |
| **Narrow ≤420px** | Palette 2-column (existing); mode cards stack (MODE_SELECTION_UX) |

---

## 8. START screen mobile review

Mode selection adds content to START. Requirements:

- Mode cards stack vertically on mobile
- «Играть» reachable without excessive scroll (hero/steps may compress)
- See [MODE_SELECTION_UX.md](./MODE_SELECTION_UX.md) §6

---

## 9. RESULT screen mobile review

RESULT is simpler than GAME. Sprint 2 checks:

- Primary «Новая партия» / «Попробовать ещё раз» visible without excessive scroll on 375px
- Secret code grid remains readable
- No new blockers introduced by mode work

Lower priority than GAME P1-04; include in Sprint 2 QA pass.

---

## 10. Acceptance criteria (testable)

### GAME — primary (P1-04)

- [ ] On viewport **375×667** (or PO test device), with **0 history rows**: after filling 4 palette selections, both action buttons are usable without scrolling to page bottom
- [ ] Same, with **3+ history rows**: actions still usable without mandatory scroll to bottom (history may be below fold)
- [ ] Actions not hidden behind browser chrome or home indicator (safe-area)
- [ ] Desktop layout matches Beta 1 hierarchy (history above current guess)

### GAME — hierarchy

- [ ] Mobile order reflects §3 priority (actions before history)
- [ ] Current guess and attempts visible at start of turn without scroll

### START / RESULT

- [ ] START mode selection + play usable on 375px portrait
- [ ] RESULT primary CTA reachable on 375px portrait

### Regression

- [ ] No loss of history data — full history accessible on mobile (scroll or expand)
- [ ] Classic and Beginner both work in new layout

---

## 11. Traceability

| Item | Link |
|------|------|
| Original observation | BACKLOG P1-04 |
| Beta 1 evidence | PROJECT_STATUS.md, BETA_TEST_PLAN.md |
| Sprint 2 scope | [SPRINT_2_SCOPE.md](./SPRINT_2_SCOPE.md) workstream 4 |

---

## 12. Out of scope

- Native Android status bar theming
- Capacitor plugins
- Separate mobile-only app shell
- Horizontal/landscape-optimized unique layout (unless trivial)
