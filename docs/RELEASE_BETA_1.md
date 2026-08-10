# Release Notes — Beta 1

**Release:** Beta 1  
**Release date:** 10 August 2026  
**Status:** Published — frozen for user testing

---

## Production

| Item | Value |
|------|-------|
| **URL** | https://pony-colour-code.pages.dev/ |
| **GitHub** | https://github.com/anfisa-fox/pony-colour-code |
| **Cloudflare project** | `pony-colour-code` |
| **Production branch** | `main` |
| **Build command** | `npm run build` |
| **Output directory** | `dist` |

---

## Commits (important distinction)

### Runtime baseline commit (published game code)

| | |
|---|---|
| **Hash** | `6353feceb2d4712697466672339842cdb0a384a1` |
| **Message** | `Beta 1: initial playable release` |
| **Contains** | Full playable SPA — source, assets, tests, initial docs |

This commit is what Cloudflare built for the **first production deployment**. Game behavior matches this commit.

### Project freeze commit (documentation & handover)

| | |
|---|---|
| **Hash** | *(see git tag `beta-1` — points to freeze commit)* |
| **Message** | `docs: freeze Pony Colour Code Beta 1 for user testing` |
| **Contains** | README, handover, backlog, beta test plan, release notes, `.gitignore` housekeeping |

Documentation-only changes **do not change runtime behavior**. A subsequent Cloudflare deploy from this commit should produce equivalent game output (verify via tests + asset hashes if needed).

---

## Validation at release

| Check | Result |
|-------|--------|
| `npm run test:run` | PASS — 24/24 |
| `npm run build` | PASS |
| Production deploy | SUCCESS |
| Scoring diagnostic | No Engine bug (pre-release) |

---

## Included in Beta 1

- START / GAME / RESULT screens
- 6 Mane 6 characters (Russian names)
- Mastermind feedback (exact / partial / miss)
- 10 attempts, duplicates allowed
- Win / loss + secret reveal
- New game
- Static Cloudflare hosting

---

## Known limitations

- My World link disabled (placeholder)
- Decorative RESULT purple orb (backlog)
- ~19 MB static assets
- Google Fonts via CDN
- No custom domain

Full list: [PROJECT_STATUS.md](PROJECT_STATUS.md)

---

## Backlog reference

[BACKLOG.md](BACKLOG.md)

---

## Next phase

Real user Beta 1 testing per [BETA_TEST_PLAN.md](BETA_TEST_PLAN.md).
