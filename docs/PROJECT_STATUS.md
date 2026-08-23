# Project Status — Pony Colour Code

**Last updated:** 23 August 2026  
**Status:** **SPRINT 2 COMPLETE — Beta 2 RELEASE CANDIDATE READY**

---

## Summary

Beta 1 is **published** and user testing is **complete and successful**. Sprint 2 implementation, mobile acceptance, and Beta 2 release preparation are **complete**. Production still serves **Beta 1** until Beta 2 is deployed and tagged.

| Item | Value |
|------|-------|
| Production URL (Beta 1) | https://pony-colour-code.pages.dev/ |
| GitHub | https://github.com/anfisa-fox/pony-colour-code |
| Beta 1 runtime baseline | `6353feceb2d4712697466672339842cdb0a384a1` |
| Beta 1 tag | `beta-1` (historical freeze — do not move) |
| Sprint 2 entry point | [`planning/SPRINT_2_SCOPE.md`](planning/SPRINT_2_SCOPE.md) |

---

## Sprint 2 — COMPLETE (Beta 2 scope)

### Completed / accepted

**Шаг 1 — Dual-mode mechanics** — COMPLETED / ACCEPTED

**Шаг 2 — START / Mode Selection UX** — COMPLETED / ACCEPTED BY PRODUCT OWNER

**Шаг 3 — GAME dual-mode feedback UI** — COMPLETED / ACCEPTED BY PRODUCT OWNER

**P1-04 / Mobile GAME (S2-04)** — COMPLETED / ACCEPTED

- Mobile flex/fullscreen GAME architecture (`100dvh`)
- Основной цикл без обязательного page scroll на **414×896** (iPhone XR)
- History newest-first с internal scroll; auto-scroll к верху после новой попытки
- Controls + palette вне History scroll-area

**S2-05 — Mobile START / RESULT polish** — COMPLETED / VERIFIED *(без runtime changes)*

| Viewport | Role |
|----------|------|
| **414×896** | Основной реальный acceptance target |
| **360×780** | Принятая нижняя современная контрольная граница |
| **375×667** | Legacy/stress-test; **не** acceptance target |

START / GAME / RESULT на **360×780** — без критичных layout/overflow проблем (PO verified).

**S2-09 — START hero character orientation** — COMPLETED / ACCEPTED

- Пинки Пай, Флаттершай, Рарити на START используют ту же mirrored orientation, что в GAME
- Персонажи 1–3 (Искорка, Радуга Дэш, Эпплджек) не менялись
- CSS-only; assets без изменений

**S2-10 — RESULT → START mode selection** — COMPLETED

- Flow: `RESULT → START → выбор/подтверждение режима → Играть → GAME`
- Последний режим pre-selected на START (`returnToStart` + `initialMode`)
- Вручную проверен PO

**S2-08 — Beta 2 release preparation** — COMPLETED

- Manual regression / smoke validation: **COMPLETE**
- Desktop end-to-end smoke-check (23 Aug 2026): **PASS** — START → GAME (Beginner) → RESULT → START
- Mobile acceptance (P1-04, S2-05, 360×780): **PASS** (prior Sprint 2)
- Extended separate Regression Pass: **not required** (PO minimal release gate)
- Automated + build final checkpoint: see validation table below

### Final validation (S2-08 checkpoint)

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — **64/64** |
| `npm run build` | PASS |
| Manual smoke / regression | **COMPLETE** |
| Beta 2 release candidate | **READY** |

### Next — awaiting PO GO

- Deploy to production (Cloudflare Pages)
- Create `beta-2` tag
- Update status docs post-deploy

**Do not deploy or tag without explicit Product Owner authorization.**

---

## Production status

| Item | Status |
|------|--------|
| Текущая production-версия | **Beta 1** (https://pony-colour-code.pages.dev/) |
| Локальный main | Beta 2 **release candidate** on `main` |
| Beta 2 | **NOT RELEASED** — RC ready; tag **not created** |
| Deployment | **NOT PERFORMED** |

---

## Android

| Item | Status |
|------|--------|
| Android / Capacitor | Следующий большой этап **после Beta 2** |
| Capacitor | **Не установлен** |

---

## Beta 1 outcome (complete)

User testing **complete and successful**. Beta 1 runtime remains the immutable historical baseline.

---

## Known limitations (Beta 1 production, until Beta 2 deploy)

- Production still serves Beta 1 Classic-only GAME UI and pre-Sprint-2 mobile layout
- «Вернуться в My World» — disabled UI placeholder
- Decorative purple orb on RESULT (P2-02 deferred)
- ~19 MB static assets; Google Fonts CDN

*P1-04 resolved locally; deploy pending Beta 2 release.*

---

## Timeline

```
Beta 1 → Sprint 2 (complete) → Beta 2 RC ready → deploy + beta-2 tag (awaiting PO GO)
```

Historical Beta 1 freeze: [`RELEASE_BETA_1.md`](RELEASE_BETA_1.md), tag `beta-1`.
