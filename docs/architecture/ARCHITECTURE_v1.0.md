# Pony Colour Code — Architecture

**Status:** Historical — Beta 1 architecture baseline  
**Version:** 0.1  
**Last Updated:** 10 августа 2026

> **Supersession (22 Aug 2026):** Layering (Engine / Session / UI) and deployment model remain valid. Sprint 2 adds **dual game mode** and mobile layout changes — see [SPRINT_2_SCOPE.md](../planning/SPRINT_2_SCOPE.md) and [ANDROID_READINESS.md](../planning/ANDROID_READINESS.md). §5 «no mode configuration» applied to Beta 1 MVP only.

---

## 1. Architecture Goals

Архитектура MVP направлена на:

- **законченную клиентскую игру** с фиксированными правилами (4 / 6 / 10 / повторы разрешены);
- **простоту реализации** за ~1 неделю после проектирования;
- **независимость от My World** как отдельного приложения и deployment unit;
- **разделение игровой логики и UI** для тестируемости и возможного будущего переиспользования;
- **нулевую серверную инфраструктуру** — игра полностью работает в браузере;
- **бесплатный static hosting** на Cloudflare (отдельный project, тот же account).

Архитектура не проектирует универсальный игровой framework, конфигуратор режимов или post-MVP функции.

---

## 2. System Context

```
┌─────────────────┐         navigation          ┌──────────────────────┐
│                 │  ─────────────────────────► │                      │
│    My World     │                             │   Pony Colour Code   │
│  (Next.js SSG)  │  ◄───────────────────────── │  (React + Vite SPA)  │
│                 │         navigation          │                      │
└────────┬────────┘                             └──────────┬───────────┘
         │                                                  │
         ▼                                                  ▼
  Cloudflare Pages                                   Cloudflare Pages
  (отдельный project)                                (отдельный project)
         │                                                  │
         └──────────────── same Cloudflare account ────────┘
```

**Pony Colour Code** — самостоятельное браузерное приложение. Связь с My World — только через обычные ссылки (навигация между приложениями). Общий runtime, shared components, iframe и общий build **не используются**.

Подробности границы проектов — в [ADR-001-project-boundaries.md](./ADR-001-project-boundaries.md).

---

## 3. Technology Stack

| Слой | Технология | Примечание |
|------|------------|------------|
| UI | **React** | Компонентная модель экранов |
| Language | **TypeScript** | Строгая типизация |
| Build | **Vite** | Dev server + production bundle |
| Styling | **CSS + Custom Properties** | Без Tailwind, без UI library |
| Testing | **Vitest** | Только Game Engine (обязательно) |
| State | **React** (`useReducer` предпочтительно) | In-memory, без persistence |

**Сознательно не используется в MVP:** Next.js, backend, API, database, Cloudflare Functions, React Router, Redux, Zustand, Tailwind, PWA.

---

## 4. Application Structure

Ориентировочное разделение ответственности:

```
src/
├── components/       Переиспользуемые UI-элементы (кнопки, peg, hint dots)
├── screens/          START, GAME, RESULT
├── game/             Game Engine (без React/DOM)
│   ├── config.ts     Фиксированные правила MVP
│   ├── engine.ts     Генерация кода, оценка, победа
│   ├── engine.test.ts
│   └── types.ts
├── data/
│   └── characters.ts Визуальные данные персонажей (id, name, image, color)
├── styles/           Global CSS, tokens
├── App.tsx           Управление экранами (START → GAME → RESULT)
└── main.tsx          Entry point

public/
└── characters/       Изображения персонажей
```

Структура отражает разделение слоёв, а не жёсткий контракт на каждый файл.

---

## 5. Game Engine

Расположение: `src/game/`.

**Независимый TypeScript-модуль** — не зависит от React, DOM, browser API и My World. Отдельный npm package и отдельный repository **не создаются**.

### Фиксированная конфигурация MVP

| Параметр | Значение |
|----------|----------|
| Длина кода | 4 |
| Палитра | 6 персонажей G4 Mane 6 |
| Попытки | 10 |
| Повторы | Разрешены |

Система конфигурации режимов или сложности **не создаётся**.

### Обязательные возможности

- генерация секретного кода;
- оценка догадки;
- подсчёт exact matches (позиция + персонаж);
- подсчёт partial matches (персонаж в коде, но не на месте);
- корректная обработка повторяющихся персонажей;
- каждый элемент кода и догадки учитывается не более одного раза;
- определение победы (все 4 позиции угаданы);
- определение поражения (10 попыток исчерпаны).

Движок работает с **идентификаторами персонажей** (`id`), не с изображениями и React-компонентами.

---

## 6. Game State

Состояние текущей партии хранится **только в памяти** React-приложения.

- Предпочтительно: `useReducer` для управления партией.
- История попыток, текущая незавершённая догадка, секретный код, оставшиеся попытки — in-memory.

**Не используется:** Redux, Zustand, localStorage, IndexedDB, server-side state.

После закрытия или перезагрузки страницы текущая партия **может быть потеряна** — это допустимо для MVP.

Game Engine — чистые функции; React-слой вызывает engine и хранит результат.

---

## 7. UI Layer

Три состояния приложения без отдельного router:

```
START → GAME → RESULT → (новая партия) → GAME
                      → START
```

### START

- название игры;
- краткие правила (2–3 строки);
- кнопка «Играть»;
- ссылка возврата в My World.

### GAME

- игровое поле;
- история попыток с результатами;
- текущая незавершённая догадка;
- палитра из 6 персонажей;
- индикатор оставшихся попыток;
- отмена последнего выбора;
- подтверждение полной догадки (4 позиции).

### RESULT

- победа или поражение;
- раскрытый секретный код;
- при победе — простой экран поздравления;
- «Новая партия»;
- возврат в My World.

### Responsive и accessibility

- одна responsive layout-модель (desktop, tablet, mobile);
- минимальная ширина ~375 px;
- персонажи различаются не только цветом: изображения/символы, имена, `aria-label`;
- видимый keyboard focus на интерактивных элементах.

UI принимается по Definition of Done из MVP Contract; отдельный component test suite и E2E **не обязательны**.

---

## 8. Content and Assets

### Персонажи (UI/content layer)

Модель в `src/data/characters.ts`:

| Поле | Назначение |
|------|------------|
| `id` | Идентификатор для Game Engine |
| `name` | Отображаемое имя (русский интерфейс) |
| `image` | Путь к изображению |
| `color` / symbol | Визуальный маркер (accessibility, не единственный различитель) |

Шесть персонажей G4 Mane 6: Twilight Sparkle, Rainbow Dash, Applejack, Pinkie Pie, Fluttershy, Rarity.

Изображения: `public/characters/`.

Game Engine **не импортирует** `characters.ts` и assets — только id из фиксированного набора в `config.ts`.

### Styling

- обычный CSS + CSS Custom Properties в `src/styles/`;
- самостоятельный визуальный стиль игры;
- визуальные мотивы My World допустимы для ощущения принадлежности, но **не через import компонентов My World**.

---

## 9. Testing

| Область | Подход |
|---------|--------|
| Game Engine | **Vitest** — обязательные автоматические тесты |
| UI | Ручная проверка по Definition of Done MVP Contract |

### Обязательные сценарии engine tests

- exact matches;
- partial matches;
- отсутствие совпадений;
- повторяющиеся персонажи в коде и догадке;
- отсутствие двойного учёта одного элемента;
- победная комбинация;
- поражение после 10 попыток.

**Не вводится в обязательный MVP:** большой component test suite, visual regression, полноценная E2E-инфраструктура.

---

## 10. Deployment

```
source (src/ + public/)
        ↓
   vite build
        ↓
      dist/
        ↓
Cloudflare Pages (отдельный project, static only)
```

- Backend/runtime **не требуется**.
- Тот же Cloudflare account, что у My World; **отдельный Cloudflare project**.
- Deployment Pony Colour Code **не требует** deployment My World и наоборот.

Конкретные production URL на этапе v0.1 **не фиксируются**.

---

## 11. Integration with My World

Минимальная интеграция MVP (из MVP Contract):

| Направление | Реализация |
|-------------|------------|
| My World → Pony Colour Code | Обычная ссылка `<a href="…">` в навигации My World |
| Pony Colour Code → My World | Обычная ссылка на экранах START и RESULT |

**Не используется:** iframe, shared build, shared runtime, shared React components, imports из `my-world`, monorepo, общий deployment.

Игра воспринимается как **игровая комната** внутри My World, но технически остаётся **независимым SPA**.

Изменения интеграции в My World (header nav, home section) — отдельная задача в repo `my-world`; не блокируют разработку игры.

---

## 12. Explicit Non-Goals

Архитектура MVP **сознательно не включает**:

| Категория | Исключено |
|-----------|-----------|
| Framework | Next.js |
| Server | Backend, API, database, Cloudflare Functions, authentication |
| Routing | React Router (достаточно state machine в App) |
| State libs | Redux, Zustand |
| Persistence | localStorage, IndexedDB, server save, statistics |
| PWA | Service worker, offline install |
| Monorepo | Shared packages с My World |
| UI infra | Component library, design system, Tailwind |
| Engine packaging | Отдельный npm package для Game Engine |
| Observability | Analytics, telemetry |
| Over-engineering | DI, repository/service layers |
| Post-MVP | Mode config, hot-seat, tutorial, collections, PWA, i18n |

---

## 13. Repository Structure

На уровне repository (ориентир для Repository Setup):

```
pony-colour-code/          # отдельный GitHub repository
├── docs/
│   ├── architecture/      # этот документ, ADR
│   ├── planning/          # MVP Contract
│   └── vision/            # Product Vision
├── public/
│   └── characters/
├── src/
│   └── …                  # см. раздел 4
├── index.html
├── package.json           # создаётся на этапе Repository Setup
├── vite.config.ts
├── tsconfig.json
└── vitest.config.ts
```

- **Отдельный GitHub repository** — не monorepo с `my-world`.
- Собственная Git history, commits, tags, release cycle.
- GitHub account — общий с My World.
