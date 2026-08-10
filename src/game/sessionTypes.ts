import type { PonyId } from "./types";

export type GamePhase = "start" | "playing" | "won" | "lost";

export type GuessRecord = {
  guess: PonyId[];
  exact: number;
  partial: number;
};

export type GameSessionState = {
  phase: GamePhase;
  secret: PonyId[];
  currentGuess: PonyId[];
  history: GuessRecord[];
  attemptsRemaining: number;
};

export type GameSessionAction =
  | { type: "START_GAME" }
  | { type: "ADD_PONY"; ponyId: PonyId }
  | { type: "REMOVE_LAST_PONY" }
  | { type: "SUBMIT_GUESS" }
  | { type: "NEW_GAME" };
