# ADR-001: Project Boundaries — Pony Colour Code and My World

**Status:** Accepted  
**Date:** 10 августа 2026

---

## Context

Pony Colour Code — самостоятельная браузерная игра для семейного использования. My World — существующий сайт-творческий мир (Next.js, static export, Cloudflare Pages).

По MVP Contract и Product Vision:

- игра должна восприниматься как **отдельная игровая комната** внутри My World;
- минимальная интеграция — **навигация** My World ↔ игра в обе стороны;
- игра имеет **собственный визуальный стиль** и не обязана копировать My World;
- инфраструктура MVP — **бесплатная**, предпочтительно Cloudflare static hosting;
- срок реализации MVP — **~1 неделя**; архитектура должна оставаться простой.

Architecture Discovery показал: My World уже использует отдельный GitHub repo, static export, Cloudflare Pages + Pages Functions (только для Creator Studio). Pony Colour Code не нуждается в server-side runtime.

Необходимо явно зафиксировать границу между проектами, чтобы интеграция не создала скрытую связанность deploy cycles, зависимостей и codebase.

---

## Decision

**Pony Colour Code и My World — независимые приложения и независимые deployment units**, при использовании **одного GitHub account** и **одного Cloudflare account**.

### GitHub

| | My World | Pony Colour Code |
|---|----------|------------------|
| Repository | `my-world` (отдельный) | отдельный repository |
| Git history | своя | своя |
| Commits / tags | независимые | независимые |
| Release cycle | независимый | независимый |

### Cloudflare

| | My World | Pony Colour Code |
|---|----------|------------------|
| Project | свой Cloudflare Pages project | свой Cloudflare Pages project |
| Build | `next build` → `out/` | `vite build` → `dist/` |
| Deployment | независимый | независимый |

### Правило deploy independence

- Изменение или deployment **Pony Colour Code не требует** deployment My World.
- Изменение или deployment **My World не требует** deployment Pony Colour Code.

### Интеграция

Связь между приложениями — **только обычная навигация** (HTML-ссылки между URL). Никакого shared runtime, shared codebase или embedded UI.

---

## Consequences

### Positive

- Независимые deploy cycles — игра и сайт не блокируют друг друга.
- Разный tech stack (Vite SPA vs Next.js SSG) без компромиссов.
- Простая mental model: два приложения, две ссылки.
- Game Engine остаётся переносимым — не привязан к Next.js или My World lib.
- Минимальный blast radius: баг или эксперимент в игре не ломает My World.
- Соответствует MVP Contract (browser game, free static hosting, minimal integration).

### Trade-offs

- Два repository и два Cloudflare project — дублирование базовой infra-настройки (не codebase).
- Cross-link URLs нужно поддерживать вручную в обоих проектах (без shared config).
- Визуальная связность «комнаты в мире» — продуктовая, не техническая; возможен visual drift.
- Нет единого bundle — повторный cold load при переходе между приложениями (приемлемо для MVP).

---

## Rejected Alternatives

| Альтернатива | Причина отклонения |
|--------------|-------------------|
| **Один repository** | Связанные deploy cycles; смешение Next.js site и Vite game; рост сложности repo |
| **Monorepo** | Избыточно для семейного MVP; shared tooling без реальной переиспользуемости кода |
| **Общий frontend build** | Принудительная версионная синхронизация React/Next; конфликт Vite vs Next |
| **iframe** | UX-швы, mobile quirks, postMessage complexity; не нужен для простой навигации |
| **Встраивание игры в Next.js My World** | Расширяет scope My World; привязывает игру к Next static export; нарушает deploy independence |
