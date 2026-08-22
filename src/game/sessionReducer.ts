import { CODE_LENGTH, DEFAULT_GAME_MODE, MAX_ATTEMPTS } from "./config";
import {
  evaluateGuess,
  evaluateGuessPositional,
  generateSecret,
  isWinningGuess,
} from "./engine";
import type { GameMode, PonyId } from "./types";
import type {
  GameSessionAction,
  GameSessionState,
  GuessRecord,
} from "./sessionTypes";

export function createInitialState(): GameSessionState {
  return {
    phase: "start",
    gameMode: DEFAULT_GAME_MODE,
    secret: [],
    currentGuess: [],
    history: [],
    attemptsRemaining: MAX_ATTEMPTS,
  };
}

function createPlayingState(gameMode: GameMode): GameSessionState {
  return {
    phase: "playing",
    gameMode,
    secret: generateSecret(),
    currentGuess: [],
    history: [],
    attemptsRemaining: MAX_ATTEMPTS,
  };
}

function buildGuessRecord(
  secret: PonyId[],
  guess: PonyId[],
  gameMode: GameMode,
): GuessRecord {
  const result = evaluateGuess(secret, guess);
  const record: GuessRecord = {
    guess: [...guess],
    exact: result.exact,
    partial: result.partial,
  };

  if (gameMode === "beginner") {
    record.positional = evaluateGuessPositional(secret, guess);
  }

  return record;
}

export function gameSessionReducer(
  state: GameSessionState,
  action: GameSessionAction,
): GameSessionState {
  switch (action.type) {
    case "START_GAME": {
      if (state.phase !== "start") {
        return state;
      }

      return createPlayingState(action.mode ?? DEFAULT_GAME_MODE);
    }

    case "NEW_GAME": {
      if (state.phase !== "won" && state.phase !== "lost") {
        return state;
      }

      return createPlayingState(state.gameMode);
    }

    case "ADD_PONY": {
      if (state.phase !== "playing") {
        return state;
      }

      if (state.currentGuess.length >= CODE_LENGTH) {
        return state;
      }

      return {
        ...state,
        currentGuess: [...state.currentGuess, action.ponyId],
      };
    }

    case "REMOVE_LAST_PONY": {
      if (state.phase !== "playing" || state.currentGuess.length === 0) {
        return state;
      }

      return {
        ...state,
        currentGuess: state.currentGuess.slice(0, -1),
      };
    }

    case "SUBMIT_GUESS": {
      if (state.phase !== "playing") {
        return state;
      }

      if (state.currentGuess.length !== CODE_LENGTH) {
        return state;
      }

      const record = buildGuessRecord(
        state.secret,
        state.currentGuess,
        state.gameMode,
      );
      const history = [...state.history, record];
      const attemptsRemaining = state.attemptsRemaining - 1;

      if (isWinningGuess({ exact: record.exact, partial: record.partial })) {
        return {
          ...state,
          phase: "won",
          currentGuess: [],
          history,
          attemptsRemaining,
        };
      }

      if (attemptsRemaining === 0) {
        return {
          ...state,
          phase: "lost",
          currentGuess: [],
          history,
          attemptsRemaining,
        };
      }

      return {
        ...state,
        currentGuess: [],
        history,
        attemptsRemaining,
      };
    }

    default:
      return state;
  }
}

export const gameSessionActions = {
  startGame: (mode?: GameMode): GameSessionAction => ({
    type: "START_GAME",
    mode,
  }),
  newGame: (): GameSessionAction => ({ type: "NEW_GAME" }),
  addPony: (ponyId: string): GameSessionAction => ({
    type: "ADD_PONY",
    ponyId,
  }),
  removeLastPony: (): GameSessionAction => ({ type: "REMOVE_LAST_PONY" }),
  submitGuess: (): GameSessionAction => ({ type: "SUBMIT_GUESS" }),
};
