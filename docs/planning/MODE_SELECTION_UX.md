# Mode Selection UX — Pony Colour Code Sprint 2

**Status:** APPROVED  
**Last updated:** 22 August 2026  
**Screen:** START (no additional mandatory pre-game screen)

---

## 1. Purpose

Before starting a game, the child must **meaningfully choose** between Beginner and Classic modes. Names alone are insufficient — each mode requires a short, child-readable explanation.

Mode selection lives on the **START screen**. Do **not** add a separate mandatory screen unless later evidence proves it necessary.

---

## 2. Approved product decisions

| Decision | Value |
|----------|-------|
| Placement | START screen |
| Default / recommended | **Beginner** |
| Modes | Beginner + Classic |
| Additional screen | Not required |

---

## 3. Mode cards — content

Two clearly distinct **mode cards** (or equivalent selectable options).

### Beginner (recommended default)

| Field | Copy (approved concept) |
|-------|-------------------------|
| Title | **Для новичков** |
| Subtitle | **Подсказка для каждой пони** |
| Detail (optional, legend area) | Каждая выбранная пони получает свою подсказку: зелёная — на месте, жёлтая — есть, но в другом месте, розовая — нет |

Visual: mark as **recommended** (e.g. badge «Рекомендуем», subtle highlight, or default selection ring).

### Classic

| Field | Copy (approved concept) |
|-------|-------------------------|
| Title | **Классический** |
| Subtitle | **Общие подсказки для всей попытки** |
| Detail (optional) | Подсказки показывают результат всей попытки, а не отдельных позиций (preserve Beta 1 meaning) |

---

## 4. Interaction states

### Default state (on load)

- **Beginner** card: selected + visually recommended
- **Classic** card: unselected
- «Играть» button: enabled

### Selection interaction

- Cards are **mutually exclusive** (radio-group semantics)
- Tap/click either card to select
- Selected card: visible selected state (border, background, checkmark, or ring — implementation choice)
- Unselected card: clearly inactive but readable
- Keyboard: arrow keys move selection; Enter on card selects; one tab stop per card or radio group per accessibility best practice

### Play action

When child presses **«Играть»**:

1. Read currently selected mode (`beginner` | `classic`)
2. Dispatch `START_GAME` with selected mode into session state
3. Navigate to GAME screen (existing flow)
4. Mode persists for entire session until RESULT → new game (new game inherits last selected mode from START, or re-shows START — **implementation note:** PO expects new game from RESULT to skip START; mode should persist on `NEW_GAME` from RESULT. Returning to START resets to default Beginner.)

**Recommended behaviour:**

| Action | Mode |
|--------|------|
| First «Играть» from START | Selected on START |
| «Новая партия» / «Попробовать ещё раз» from RESULT | Same mode as current session |
| Future: explicit «На главную» if added | START with Beginner default |

---

## 5. START screen layout (conceptual)

```
[← Вернуться в My World]          (disabled placeholder until P1-02)

[Title + hero ensemble]            (existing)

[How to play steps]                (existing, may shorten on mobile)

┌─────────────────────┐  ┌─────────────────────┐
│ ★ Для новичков      │  │   Классический      │
│   (selected)        │  │                     │
│ Подсказка для       │  │ Общие подсказки     │
│ каждой пони         │  │ для всей попытки    │
└─────────────────────┘  └─────────────────────┘

[Mode-specific mini-legend]        (optional compact; updates with selection)

[Играть]                           (primary)

[Одна партия · 5–10 минут]
```

On narrow mobile: mode cards **stack vertically** (Beginner first).

---

## 6. Responsive behaviour

| Viewport | Behaviour |
|----------|-----------|
| Desktop (≥480px) | Mode cards side-by-side if space allows; otherwise stack |
| Mobile (~375px portrait) | Cards stacked; full-width tap targets ≥44px height |
| Narrow (≤420px) | Stack; reduce hero/steps padding if needed (coordinate with P3-06) |

START must remain **understandable and usable on phone** without horizontal scroll.

---

## 7. Accessibility

- Mode selector: `role="radiogroup"` with `aria-label="Выбор режима игры"`
- Each card: `role="radio"`, `aria-checked`, associated label text
- Recommended badge: not conveyed by color alone — include text «Рекомендуем»
- Focus visible on cards and «Играть»
- Screen reader announces selected mode when changed

---

## 8. Relationship to feedback legend

| Selected mode | START legend |
|---------------|--------------|
| Beginner | Positional three-colour explanation (GREEN/YELLOW/PINK per pony) |
| Classic | Existing aggregate legend (Smile/Wink/Oops group) + note tokens ≠ positions |

Legend may update dynamically when selection changes (preferred) or show both with emphasis on selected (acceptable if compact).

---

## 9. Acceptance criteria

- [ ] Two mode options visible on START with approved conceptual copy
- [ ] Beginner pre-selected and marked recommended
- [ ] Child can switch to Classic before playing
- [ ] «Играть» starts game in selected mode
- [ ] BEGINNER → positional feedback in GAME; CLASSIC → Beta 1 aggregate feedback
- [ ] START usable on 375px portrait — no overflow, tappable cards
- [ ] Accessibility: radiogroup semantics, keyboard operable
- [ ] No additional mandatory screen before GAME

---

## 10. Out of scope

- Persisting mode preference across browser sessions (localStorage) — not required Sprint 2
- Mode selection on RESULT screen
- Third mode or difficulty settings

---

## References

- [BEGINNER_MODE_SPEC.md](./BEGINNER_MODE_SPEC.md)
- [SPRINT_2_SCOPE.md](./SPRINT_2_SCOPE.md)
- [UI_SPECIFICATION_v1.0.md](../ux/UI_SPECIFICATION_v1.0.md) — Beta 1 START (historical)
