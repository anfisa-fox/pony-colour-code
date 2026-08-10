import { describe, expect, it } from "vitest";

import { CODE_LENGTH, PONY_IDS } from "./config";
import {
  evaluateGuess,
  generateSecret,
  InvalidGuessError,
  isWinningGuess,
} from "./engine";
import type { PonyId } from "./types";

const A = "A" as PonyId;
const B = "B" as PonyId;
const C = "C" as PonyId;
const D = "D" as PonyId;
const E = "E" as PonyId;

describe("evaluateGuess", () => {
  it("exact — all four match", () => {
    const result = evaluateGuess([A, B, C, D], [A, B, C, D]);
    expect(result).toEqual({ exact: 4, partial: 0 });
  });

  it("partial — all four wrong position", () => {
    const result = evaluateGuess([A, B, C, D], [D, C, B, A]);
    expect(result).toEqual({ exact: 0, partial: 4 });
  });

  it("mixed — one exact and two partial", () => {
    const result = evaluateGuess([A, B, C, D], [A, C, B, E]);
    expect(result).toEqual({ exact: 1, partial: 2 });
  });

  it("duplicates — two exact, no partial", () => {
    const result = evaluateGuess([A, A, B, C], [A, A, A, A]);
    expect(result).toEqual({ exact: 2, partial: 0 });
  });

  it("duplicates mixed — one exact and two partial", () => {
    const result = evaluateGuess([A, A, B, B], [A, B, A, C]);
    expect(result).toEqual({ exact: 1, partial: 2 });
  });

  it("no matches", () => {
    const result = evaluateGuess([A, A, B, B], [C, C, D, D]);
    expect(result).toEqual({ exact: 0, partial: 0 });
  });

  it("rejects guess with wrong length", () => {
    expect(() => evaluateGuess([A, B, C, D], [A, B, C])).toThrow(
      InvalidGuessError,
    );
  });

  it("rejects secret with wrong length", () => {
    expect(() => evaluateGuess([A, B, C], [A, B, C, D])).toThrow(
      InvalidGuessError,
    );
  });
});

describe("isWinningGuess", () => {
  it("returns true when exact equals code length", () => {
    expect(isWinningGuess({ exact: CODE_LENGTH, partial: 0 })).toBe(true);
  });

  it("returns false when exact is less than code length", () => {
    expect(isWinningGuess({ exact: CODE_LENGTH - 1, partial: 1 })).toBe(false);
  });
});

describe("generateSecret", () => {
  it("returns code length 4", () => {
    const secret = generateSecret();
    expect(secret).toHaveLength(CODE_LENGTH);
  });

  it("uses only allowed pony IDs", () => {
    const allowed = new Set<string>(PONY_IDS);
    const secret = generateSecret();
    for (const id of secret) {
      expect(allowed.has(id)).toBe(true);
    }
  });
});
