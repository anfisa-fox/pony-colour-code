import { afterEach, describe, expect, it, vi } from "vitest";

import { CODE_LENGTH, DEFAULT_GAME_MODE, MAX_ATTEMPTS } from "./config";
import * as engine from "./engine";
import {
  createInitialState,
  gameSessionActions,
  gameSessionReducer,
} from "./sessionReducer";
import type { PonyId } from "./types";

const twilight = "twilight" as PonyId;
const rainbow = "rainbow" as PonyId;
const applejack = "applejack" as PonyId;
const pinkie = "pinkie" as PonyId;
const fluttershy = "fluttershy" as PonyId;
const rarity = "rarity" as PonyId;

const mockSecret = [twilight, rainbow, applejack, pinkie] as PonyId[];

function reduce(state: ReturnType<typeof createInitialState>, action: Parameters<typeof gameSessionReducer>[1]) {
  return gameSessionReducer(state, action);
}

function startPlaying(mode?: "beginner" | "classic") {
  vi.spyOn(engine, "generateSecret").mockReturnValue([...mockSecret]);
  return reduce(createInitialState(), gameSessionActions.startGame(mode));
}

function fillGuess(state: ReturnType<typeof createInitialState>, ponies: PonyId[]) {
  return ponies.reduce(
    (next, ponyId) => reduce(next, gameSessionActions.addPony(ponyId)),
    state,
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("gameSessionReducer", () => {
  it("starts in START phase", () => {
    const state = createInitialState();
    expect(state.phase).toBe("start");
    expect(state.gameMode).toBe(DEFAULT_GAME_MODE);
    expect(state.secret).toEqual([]);
    expect(state.currentGuess).toEqual([]);
    expect(state.history).toEqual([]);
    expect(state.attemptsRemaining).toBe(MAX_ATTEMPTS);
  });

  it("start game creates secret and PLAYING state", () => {
    const state = startPlaying();

    expect(state.phase).toBe("playing");
    expect(state.gameMode).toBe(DEFAULT_GAME_MODE);
    expect(state.secret).toEqual(mockSecret);
    expect(state.currentGuess).toEqual([]);
    expect(state.history).toEqual([]);
    expect(state.attemptsRemaining).toBe(MAX_ATTEMPTS);
  });

  it("add pony builds currentGuess", () => {
    const playing = startPlaying();
    const state = reduce(playing, gameSessionActions.addPony(twilight));

    expect(state.currentGuess).toEqual([twilight]);
  });

  it("does not allow a fifth pony in currentGuess", () => {
    const playing = startPlaying();
    const full = fillGuess(playing, [twilight, rainbow, applejack, pinkie]);
    const state = reduce(full, gameSessionActions.addPony(fluttershy));

    expect(state.currentGuess).toHaveLength(CODE_LENGTH);
    expect(state.currentGuess).toEqual([twilight, rainbow, applejack, pinkie]);
  });

  it("remove last pony drops the final selection", () => {
    const playing = startPlaying();
    const withTwo = fillGuess(playing, [twilight, rainbow]);
    const state = reduce(withTwo, gameSessionActions.removeLastPony());

    expect(state.currentGuess).toEqual([twilight]);
  });

  it("does not submit an incomplete guess", () => {
    const playing = startPlaying();
    const partial = fillGuess(playing, [twilight, rainbow, applejack]);
    const state = reduce(partial, gameSessionActions.submitGuess());

    expect(state.history).toEqual([]);
    expect(state.currentGuess).toEqual([twilight, rainbow, applejack]);
    expect(state.phase).toBe("playing");
  });

  it("adds submitted guess to history", () => {
    const playing = startPlaying();
    const ready = fillGuess(playing, [twilight, rainbow, applejack, fluttershy]);
    const state = reduce(ready, gameSessionActions.submitGuess());

    expect(state.history).toHaveLength(1);
    expect(state.history[0].guess).toEqual([
      twilight,
      rainbow,
      applejack,
      fluttershy,
    ]);
    expect(state.history[0].exact).toBe(3);
    expect(state.history[0].partial).toBe(0);
  });

  it("clears currentGuess after submit", () => {
    const playing = startPlaying();
    const ready = fillGuess(playing, [twilight, rainbow, applejack, fluttershy]);
    const state = reduce(ready, gameSessionActions.submitGuess());

    expect(state.currentGuess).toEqual([]);
  });

  it("moves to WON on a winning guess", () => {
    const playing = startPlaying();
    const ready = fillGuess(playing, [...mockSecret]);
    const state = reduce(ready, gameSessionActions.submitGuess());

    expect(state.phase).toBe("won");
    expect(state.history[0].exact).toBe(CODE_LENGTH);
    expect(state.attemptsRemaining).toBe(MAX_ATTEMPTS - 1);
  });

  it("moves to LOST after the tenth failed attempt", () => {
    const playing = startPlaying();
    const losingGuess = [fluttershy, rarity, fluttershy, rarity] as PonyId[];

    let state = playing;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      state = fillGuess(state, losingGuess);
      state = reduce(state, gameSessionActions.submitGuess());
    }

    expect(state.phase).toBe("lost");
    expect(state.history).toHaveLength(MAX_ATTEMPTS);
    expect(state.attemptsRemaining).toBe(0);
  });

  it("does not accept guesses after WON or LOST", () => {
    const won = reduce(
      fillGuess(startPlaying(), [...mockSecret]),
      gameSessionActions.submitGuess(),
    );
    const afterWon = fillGuess(won, [...mockSecret]);
    const wonSubmit = reduce(afterWon, gameSessionActions.submitGuess());

    expect(wonSubmit.phase).toBe("won");
    expect(wonSubmit.history).toHaveLength(1);

    vi.spyOn(engine, "generateSecret").mockReturnValue([...mockSecret]);
    let lost = startPlaying();
    const losingGuess = [fluttershy, rarity, fluttershy, rarity] as PonyId[];
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      lost = fillGuess(lost, losingGuess);
      lost = reduce(lost, gameSessionActions.submitGuess());
    }

    const afterLost = fillGuess(lost, [...mockSecret]);
    const lostSubmit = reduce(afterLost, gameSessionActions.submitGuess());

    expect(lostSubmit.phase).toBe("lost");
    expect(lostSubmit.history).toHaveLength(MAX_ATTEMPTS);
  });

  it("new game creates a fresh independent session", () => {
    const nextSecret = [rainbow, applejack, pinkie, fluttershy] as PonyId[];
    vi.spyOn(engine, "generateSecret")
      .mockReturnValueOnce([...mockSecret])
      .mockReturnValueOnce([...nextSecret]);

    const won = reduce(
      fillGuess(startPlaying(), [...mockSecret]),
      gameSessionActions.submitGuess(),
    );
    const fresh = reduce(won, gameSessionActions.newGame());

    expect(fresh.phase).toBe("playing");
    expect(fresh.secret).toEqual(nextSecret);
    expect(fresh.currentGuess).toEqual([]);
    expect(fresh.history).toEqual([]);
    expect(fresh.attemptsRemaining).toBe(MAX_ATTEMPTS);
  });
});

describe("gameSessionReducer game modes", () => {
  it("defaults to beginner when startGame is called without mode", () => {
    const state = startPlaying();
    expect(state.gameMode).toBe("beginner");
  });

  it("starts explicit classic mode", () => {
    const state = startPlaying("classic");
    expect(state.gameMode).toBe("classic");
  });

  it("starts explicit beginner mode", () => {
    const state = startPlaying("beginner");
    expect(state.gameMode).toBe("beginner");
  });

  it("stores positional feedback in beginner history on submit", () => {
    const playing = startPlaying("beginner");
    const ready = fillGuess(playing, [twilight, applejack, rainbow, fluttershy]);
    const state = reduce(ready, gameSessionActions.submitGuess());

    expect(state.history[0].exact).toBe(1);
    expect(state.history[0].partial).toBe(2);
    expect(state.history[0].positional).toEqual([
      "green",
      "yellow",
      "yellow",
      "pink",
    ]);
  });

  it("stores aggregate-only history in classic mode on submit", () => {
    const playing = startPlaying("classic");
    const ready = fillGuess(playing, [twilight, applejack, rainbow, fluttershy]);
    const state = reduce(ready, gameSessionActions.submitGuess());

    expect(state.history[0].exact).toBe(1);
    expect(state.history[0].partial).toBe(2);
    expect(state.history[0].positional).toBeUndefined();
  });

  it("preserves gameMode on new game from RESULT", () => {
    vi.spyOn(engine, "generateSecret")
      .mockReturnValueOnce([...mockSecret])
      .mockReturnValueOnce([...mockSecret]);

    const classicWon = reduce(
      fillGuess(startPlaying("classic"), [...mockSecret]),
      gameSessionActions.submitGuess(),
    );
    const classicFresh = reduce(classicWon, gameSessionActions.newGame());
    expect(classicFresh.gameMode).toBe("classic");

    vi.spyOn(engine, "generateSecret")
      .mockReturnValueOnce([...mockSecret])
      .mockReturnValueOnce([...mockSecret]);

    const beginnerWon = reduce(
      fillGuess(startPlaying("beginner"), [...mockSecret]),
      gameSessionActions.submitGuess(),
    );
    const beginnerFresh = reduce(beginnerWon, gameSessionActions.newGame());
    expect(beginnerFresh.gameMode).toBe("beginner");
  });

  it("wins beginner session when all four positions are green", () => {
    const playing = startPlaying("beginner");
    const ready = fillGuess(playing, [...mockSecret]);
    const state = reduce(ready, gameSessionActions.submitGuess());

    expect(state.phase).toBe("won");
    expect(state.history[0].positional).toEqual([
      "green",
      "green",
      "green",
      "green",
    ]);
  });
});
