/** Fixed game rules. Sprint 2: two modes (see sessionTypes GameMode). */

export const CODE_LENGTH = 4;
export const DEFAULT_GAME_MODE = "beginner" as const;
export const MAX_ATTEMPTS = 10;
export const ALLOW_DUPLICATES = true;

/** G4 Mane 6 — engine knows IDs only; visual data lives in src/data/. */
export const PONY_IDS = [
  "twilight",
  "rainbow",
  "applejack",
  "pinkie",
  "fluttershy",
  "rarity",
] as const;

export type ManeSixPonyId = (typeof PONY_IDS)[number];
