import { useReducer } from "react";

import {
  createInitialState,
  gameSessionActions,
  gameSessionReducer,
} from "./sessionReducer";

export function useGameSession() {
  const [state, dispatch] = useReducer(
    gameSessionReducer,
    undefined,
    createInitialState,
  );

  return {
    state,
    dispatch,
    actions: gameSessionActions,
  };
}

export type UseGameSessionReturn = ReturnType<typeof useGameSession>;
