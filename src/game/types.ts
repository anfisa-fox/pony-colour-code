import type { DEFAULT_GAME_MODE } from "./config";

/** Character identifier used by the game engine (no UI coupling). */
export type PonyId = string;

export type GameMode = typeof DEFAULT_GAME_MODE | "classic";

export type GuessResult = {
  exact: number;
  partial: number;
};

/** Beginner Mode — per-position feedback for one guess slot. */
export type PositionalFeedback = "green" | "yellow" | "pink";
