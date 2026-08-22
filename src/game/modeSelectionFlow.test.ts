import { describe, expect, it, vi } from "vitest";

import { START_DEFAULT_MODE } from "../components/ModeSelector";
import { DEFAULT_GAME_MODE } from "./config";
import * as engine from "./engine";
import {
  createInitialState,
  gameSessionActions,
  gameSessionReducer,
} from "./sessionReducer";

describe("StartScreen mode selection flow", () => {
  it("default START selection constant is beginner", () => {
    expect(START_DEFAULT_MODE).toBe("beginner");
    expect(DEFAULT_GAME_MODE).toBe("beginner");
  });

  it("play with default beginner selection starts beginner session", () => {
    vi.spyOn(engine, "generateSecret").mockReturnValue([
      "twilight",
      "rainbow",
      "applejack",
      "pinkie",
    ]);

    const state = gameSessionReducer(
      createInitialState(),
      gameSessionActions.startGame(START_DEFAULT_MODE),
    );

    expect(state.phase).toBe("playing");
    expect(state.gameMode).toBe("beginner");
  });

  it("play with classic selection starts classic session", () => {
    vi.spyOn(engine, "generateSecret").mockReturnValue([
      "twilight",
      "rainbow",
      "applejack",
      "pinkie",
    ]);

    const state = gameSessionReducer(
      createInitialState(),
      gameSessionActions.startGame("classic"),
    );

    expect(state.phase).toBe("playing");
    expect(state.gameMode).toBe("classic");
  });

  it("play with explicit beginner selection starts beginner session", () => {
    vi.spyOn(engine, "generateSecret").mockReturnValue([
      "twilight",
      "rainbow",
      "applejack",
      "pinkie",
    ]);

    const state = gameSessionReducer(
      createInitialState(),
      gameSessionActions.startGame("beginner"),
    );

    expect(state.gameMode).toBe("beginner");
  });

  it("RESULT return to start then play starts a fresh session in chosen mode", () => {
    vi.spyOn(engine, "generateSecret")
      .mockReturnValueOnce(["twilight", "rainbow", "applejack", "pinkie"])
      .mockReturnValueOnce(["twilight", "rainbow", "applejack", "pinkie"]);

    let state = gameSessionReducer(
      createInitialState(),
      gameSessionActions.startGame("classic"),
    );

    for (const ponyId of ["twilight", "rainbow", "applejack", "pinkie"]) {
      state = gameSessionReducer(state, gameSessionActions.addPony(ponyId));
    }
    state = gameSessionReducer(state, gameSessionActions.submitGuess());
    expect(state.phase).toBe("won");

    state = gameSessionReducer(state, gameSessionActions.returnToStart());
    expect(state.phase).toBe("start");
    expect(state.gameMode).toBe("classic");

    state = gameSessionReducer(state, gameSessionActions.startGame("beginner"));
    expect(state.phase).toBe("playing");
    expect(state.gameMode).toBe("beginner");
    expect(state.history).toEqual([]);
    expect(state.currentGuess).toEqual([]);
  });
});
