import { CODE_LENGTH, MAX_ATTEMPTS } from "./config";
import { evaluateGuess, generateSecret, isWinningGuess } from "./engine";
import type {
  GameSessionAction,
  GameSessionState,
} from "./sessionTypes";

export function createInitialState(): GameSessionState {
  return {
    phase: "start",
    secret: [],
    currentGuess: [],
    history: [],
    attemptsRemaining: MAX_ATTEMPTS,
  };
}

function createPlayingState(): GameSessionState {
  return {
    phase: "playing",
    secret: generateSecret(),
    currentGuess: [],
    history: [],
    attemptsRemaining: MAX_ATTEMPTS,
  };
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

      return createPlayingState();
    }

    case "NEW_GAME": {
      if (state.phase !== "won" && state.phase !== "lost") {
        return state;
      }

      return createPlayingState();
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

      const result = evaluateGuess(state.secret, state.currentGuess);
      const history = [
        ...state.history,
        {
          guess: [...state.currentGuess],
          exact: result.exact,
          partial: result.partial,
        },
      ];
      const attemptsRemaining = state.attemptsRemaining - 1;

      if (isWinningGuess(result)) {
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
  startGame: (): GameSessionAction => ({ type: "START_GAME" }),
  newGame: (): GameSessionAction => ({ type: "NEW_GAME" }),
  addPony: (ponyId: string): GameSessionAction => ({
    type: "ADD_PONY",
    ponyId,
  }),
  removeLastPony: (): GameSessionAction => ({ type: "REMOVE_LAST_PONY" }),
  submitGuess: (): GameSessionAction => ({ type: "SUBMIT_GUESS" }),
};
