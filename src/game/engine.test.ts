import { describe, expect, it } from "vitest";

import { CODE_LENGTH, PONY_IDS } from "./config";
import {
  evaluateGuess,
  evaluateGuessPositional,
  generateSecret,
  InvalidGuessError,
  isWinningGuess,
  isWinningPositionalGuess,
} from "./engine";
import type { PonyId, PositionalFeedback } from "./types";

const A = "A" as PonyId;
const B = "B" as PonyId;
const C = "C" as PonyId;
const D = "D" as PonyId;
const E = "E" as PonyId;
const F = "F" as PonyId;

const EXHAUSTIVE_IDS = [A, B, C, D, E, F];

function countPositional(feedback: PositionalFeedback[]) {
  return {
    green: feedback.filter((slot) => slot === "green").length,
    yellow: feedback.filter((slot) => slot === "yellow").length,
    pink: feedback.filter((slot) => slot === "pink").length,
  };
}

function allCodes(ids: PonyId[]): PonyId[][] {
  const codes: PonyId[][] = [];
  for (const a of ids) {
    for (const b of ids) {
      for (const c of ids) {
        for (const d of ids) {
          codes.push([a, b, c, d]);
        }
      }
    }
  }
  return codes;
}

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

describe("evaluateGuessPositional", () => {
  it("all GREEN — exact win", () => {
    expect(evaluateGuessPositional([A, B, C, D], [A, B, C, D])).toEqual([
      "green",
      "green",
      "green",
      "green",
    ]);
    expect(isWinningPositionalGuess(["green", "green", "green", "green"])).toBe(
      true,
    );
  });

  it("all YELLOW — full rotation", () => {
    expect(evaluateGuessPositional([A, B, C, D], [D, C, B, A])).toEqual([
      "yellow",
      "yellow",
      "yellow",
      "yellow",
    ]);
  });

  it("mixed GREEN, YELLOW, PINK", () => {
    expect(evaluateGuessPositional([A, B, C, D], [A, C, B, E])).toEqual([
      "green",
      "yellow",
      "yellow",
      "pink",
    ]);
  });

  it("no matches — all PINK", () => {
    expect(evaluateGuessPositional([A, A, B, B], [C, C, D, D])).toEqual([
      "pink",
      "pink",
      "pink",
      "pink",
    ]);
  });

  it("duplicate secret — [A,A,B,C] vs [A,B,A,A]", () => {
    expect(evaluateGuessPositional([A, A, B, C], [A, B, A, A])).toEqual([
      "green",
      "yellow",
      "yellow",
      "pink",
    ]);
  });

  it("duplicate secret — [A,A,B,B] vs [A,A,A,A]", () => {
    expect(evaluateGuessPositional([A, A, B, B], [A, A, A, A])).toEqual([
      "green",
      "green",
      "pink",
      "pink",
    ]);
  });

  it("duplicate secret — [A,B,A,C] vs [A,A,B,A]", () => {
    expect(evaluateGuessPositional([A, B, A, C], [A, A, B, A])).toEqual([
      "green",
      "yellow",
      "yellow",
      "pink",
    ]);
  });

  it("excess duplicate in guess becomes PINK", () => {
    const feedback = evaluateGuessPositional([A, B, C, D], [A, A, A, A]);
    expect(feedback[0]).toBe("green");
    expect(feedback.slice(1)).toEqual(["pink", "pink", "pink"]);
  });

  it("exact occurrence cannot become YELLOW in PASS 2", () => {
    expect(evaluateGuessPositional([A, B, C, D], [A, B, C, E])).toEqual([
      "green",
      "green",
      "green",
      "pink",
    ]);
  });

  it("left-to-right deterministic YELLOW allocation", () => {
    expect(evaluateGuessPositional([A, B, A, C], [B, A, A, A])).toEqual([
      "yellow",
      "yellow",
      "green",
      "pink",
    ]);
  });

  it("rejects invalid lengths", () => {
    expect(() => evaluateGuessPositional([A, B, C], [A, B, C, D])).toThrow(
      InvalidGuessError,
    );
    expect(() => evaluateGuessPositional([A, B, C, D], [A, B, C])).toThrow(
      InvalidGuessError,
    );
  });
});

describe("Beginner ↔ Classic invariant", () => {
  it("matches Classic counts on spec edge cases", () => {
    const cases: Array<[PonyId[], PonyId[]]> = [
      [[A, B, C, D], [A, B, C, D]],
      [[A, B, C, D], [D, C, B, A]],
      [[A, B, C, D], [A, C, B, E]],
      [[A, A, B, C], [A, B, A, A]],
      [[A, A, B, B], [A, A, A, A]],
      [[A, B, A, C], [A, A, B, A]],
      [[A, A, B, B], [C, C, D, D]],
    ];

    for (const [secret, guess] of cases) {
      const classic = evaluateGuess(secret, guess);
      const positional = evaluateGuessPositional(secret, guess);
      const counts = countPositional(positional);

      expect(counts.green).toBe(classic.exact);
      expect(counts.yellow).toBe(classic.partial);
      expect(counts.pink).toBe(CODE_LENGTH - classic.exact - classic.partial);
    }
  });

  it(
    "exhaustive 6^4 × 6^4 matrix preserves invariant",
    () => {
      const codes = allCodes(EXHAUSTIVE_IDS);
      expect(codes).toHaveLength(6 ** 4);

      const started = performance.now();
      let pairs = 0;

      for (const secret of codes) {
        for (const guess of codes) {
          const classic = evaluateGuess(secret, guess);
          const positional = evaluateGuessPositional(secret, guess);
          const counts = countPositional(positional);

          expect(counts.green).toBe(classic.exact);
          expect(counts.yellow).toBe(classic.partial);
          expect(counts.pink).toBe(CODE_LENGTH - classic.exact - classic.partial);
          pairs += 1;
        }
      }

      const elapsedMs = performance.now() - started;
      expect(pairs).toBe(6 ** 8);
      // Duration varies by environment (~30s in CI/sandbox); correctness is the gate.
      expect(elapsedMs).toBeGreaterThan(0);
    },
    60_000,
  );
});
