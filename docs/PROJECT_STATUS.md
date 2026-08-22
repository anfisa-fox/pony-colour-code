# Project Status — Pony Colour Code

**Last updated:** 22 August 2026  
**Status:** **SPRINT 2 — IN PROGRESS**

---

## Summary

Beta 1 is **published** and user testing is **complete and successful**. Sprint 2 implementation is **in progress**: Steps 1–3 are **completed and accepted** by Product Owner. Production still serves **Beta 1** until Beta 2 is deployed.

| Item | Value |
|------|-------|
| Production URL (Beta 1) | https://pony-colour-code.pages.dev/ |
| GitHub | https://github.com/anfisa-fox/pony-colour-code |
| Beta 1 runtime baseline | `6353feceb2d4712697466672339842cdb0a384a1` |
| Beta 1 tag | `beta-1` (historical freeze — do not move) |
| Sprint 2 entry point | [`planning/SPRINT_2_SCOPE.md`](planning/SPRINT_2_SCOPE.md) |

---

## Sprint 2 — IN PROGRESS

### Completed / accepted

**Шаг 1 — Dual-mode mechanics**  
**Status:** COMPLETED / ACCEPTED

- Добавлены режимы `beginner` и `classic`
- Beginner использует positional feedback (`evaluateGuessPositional()`)
- Classic сохраняет исходную Mastermind semantics (`evaluateGuess()` без изменений)
- Duplicate handling корректен; инвариант Beginner ↔ Classic подтверждён тестами
- `gameMode` хранится в Session
- `NEW_GAME` сохраняет выбранный режим
- Engine и Session покрыты расширенными unit-тестами

**Шаг 2 — START / Mode Selection UX**  
**Status:** COMPLETED / ACCEPTED BY PRODUCT OWNER

- START содержит выбор между «Для новичков» и «Классический»
- Beginner выбран по умолчанию
- Общий блок Secret/Guess показывает одну и ту же игровую ситуацию для обоих режимов
- Feedback medallions находятся непосредственно внутри mode cards
- Карточки визуально равноправны; desktop UX принят Product Owner
- START → GAME передаёт выбранный `GameMode` через `startGame(selectedMode)`

**Шаг 3 — GAME dual-mode feedback UI**  
**Status:** COMPLETED / ACCEPTED BY PRODUCT OWNER

- Beginner history: positional feedback под каждой пони (`GuessRecord.positional`; UI не пересчитывает scoring)
- Mapping: green → smile, yellow → wink, pink → oops
- Classic history: aggregate feedback Beta 1 сохранён
- Presentation определяется по `state.gameMode`
- Ручная PO-проверка Beginner (в т.ч. дубликаты) — корректно

### Current validation

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — **57/57** |
| `npm run build` | PASS |

### Next

**Mobile GAME / P1-04**

Основная продуктовая задача следующего этапа:

> На мобильном устройстве основные действия GAME должны быть доступны рядом с текущей догадкой и не требовать обязательной прокрутки к нижней части страницы.

### Later in Sprint 2 (before Beta 2)

- Mobile START / RESULT polish
- Beta 2 polish: START hero character orientation consistency (S2-09)
- Beta 2 polish: RESULT → START mode-selection flow (S2-10)
- Regression pass
- Beta 2 preparation / release

---

## Production status

| Item | Status |
|------|--------|
| Текущая production-версия | **Beta 1** (https://pony-colour-code.pages.dev/) |
| Изменения Шагов 1–3 | Приняты локально; **ещё не Beta 2** |
| Beta 2 | **NOT RELEASED** |
| Deployment в рамках Шагов 1–3 | **NOT PERFORMED** |

---

## Android

| Item | Status |
|------|--------|
| Android / Capacitor | Следующий большой этап **после Beta 2** |
| Sprint 2 UI | Проектируется с учётом будущего WebView / Capacitor |
| Capacitor | **Не установлен** |
| Android implementation | **Не начата** |

---

## Beta 1 outcome (complete)

| Result | Detail |
|--------|--------|
| User testing | **Complete and successful** |
| Game concept | Validated |
| Playability | Playable and enjoyable |
| Critical defects | None discovered |
| Outcome | UX/product improvements captured for Sprint 2 |

Beta 1 runtime remains the **immutable historical baseline**. Production still serves Beta 1 until Beta 2 is deployed.

---

## What Beta 1 implemented (unchanged baseline)

- Full playable loop: **START → GAME → RESULT**
- Secret generation (4 positions, 6 Mane 6, duplicates allowed)
- Classic Mastermind scoring (exact / partial / miss)
- 10 attempts, win/loss detection, new game
- Russian UI, character cards, feedback medallions, history
- Standalone Cloudflare Pages deployment
- 24 unit tests (Engine + Session) at Beta 1 freeze

---

## Known limitations (Beta 1 production, until Beta 2 deploy)

- «Вернуться в My World» — disabled UI placeholder
- Production GAME на Beta 1 показывает только Classic aggregate feedback (локально — оба режима после Шага 3)
- Mobile GAME requires scroll to actions — **P1-04**, Sprint 2 (not yet fixed)
- Decorative purple orb on RESULT (P2-02 deferred)
- ~19 MB static assets; Google Fonts CDN

---

## Explicitly out of Sprint 2 scope

- Native Android / Capacitor install
- My World integration (P1-02, P1-03)
- RESULT orb redesign (P2-02)
- Asset optimization / font self-hosting (unless implementation requires)

See [`BACKLOG.md`](BACKLOG.md) and [`planning/SPRINT_2_SCOPE.md`](planning/SPRINT_2_SCOPE.md).

---

## Timeline

```
Beta 1 published → user testing (complete) → Sprint 2 planning (complete)
  → Steps 1–3 accepted → Mobile GAME / P1-04 → Beta 2 polish → Beta 2 web release
```

Historical Beta 1 freeze: [`RELEASE_BETA_1.md`](RELEASE_BETA_1.md), tag `beta-1`.
