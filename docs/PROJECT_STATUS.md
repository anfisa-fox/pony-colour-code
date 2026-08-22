# Project Status — Pony Colour Code

**Last updated:** 22 August 2026  
**Status:** **SPRINT 2 — IN PROGRESS**

---

## Summary

Beta 1 is **published** and user testing is **complete and successful**. Sprint 2 implementation is **in progress**: Steps 1 and 2 are **completed and accepted** by Product Owner. Production still serves **Beta 1** until Beta 2 is deployed.

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

### Current validation

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — **48/48** |
| `npm run build` | PASS |

### Next

**Шаг 3 — GAME dual-mode feedback UI**

Цель:

- Beginner → позиционная подсказка для каждой пони в истории ходов
- Classic → существующий aggregate feedback (без изменений semantics)
- Не смешивать две presentation semantics в одном UI

### Later in Sprint 2

После Шага 3:

- Mobile GAME redesign
- Закрытие P1-04 (`Удалить` / `Подтвердить` без обязательной прокрутки)
- Mobile START / RESULT polish
- Regression pass
- Beta 2 preparation / release

---

## Production status

| Item | Status |
|------|--------|
| Текущая production-версия | **Beta 1** (https://pony-colour-code.pages.dev/) |
| Изменения Шагов 1+2 | Локально приняты; **ещё не Beta 2** |
| Beta 2 | **NOT RELEASED** |
| Deployment в рамках Шагов 1+2 | **NOT PERFORMED** |

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
- Production GAME показывает только Classic aggregate feedback (Beginner UI — Шаг 3)
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
  → Steps 1+2 accepted → Step 3 (GAME UI) → mobile / P1-04 → Beta 2 web release
```

Historical Beta 1 freeze: [`RELEASE_BETA_1.md`](RELEASE_BETA_1.md), tag `beta-1`.
