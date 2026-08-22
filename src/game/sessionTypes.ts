import type { GameMode, PonyId, PositionalFeedback } from "./types";

export type GamePhase = "start" | "playing" | "won" | "lost";

export type GuessRecord = {
  guess: PonyId[];
  exact: number;
  partial: number;
  /** Present when session gameMode is beginner. */
  positional?: PositionalFeedback[];
};

export type GameSessionState = {
  phase: GamePhase;
  gameMode: GameMode;
  secret: PonyId[];
  currentGuess: PonyId[];
  history: GuessRecord[];
  attemptsRemaining: number;
};

export type GameSessionAction =
  | { type: "START_GAME"; mode?: GameMode }
  | { type: "ADD_PONY"; ponyId: PonyId }
  | { type: "REMOVE_LAST_PONY" }
  | { type: "SUBMIT_GUESS" }
  | { type: "NEW_GAME" }
  | { type: "RETURN_TO_START" };
