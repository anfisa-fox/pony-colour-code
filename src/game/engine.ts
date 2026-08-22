import { CODE_LENGTH, PONY_IDS } from "./config";
import type { GuessResult, PonyId, PositionalFeedback } from "./types";

export class InvalidGuessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidGuessError";
  }
}

function assertValidLength(code: PonyId[], label: string): void {
  if (code.length !== CODE_LENGTH) {
    throw new InvalidGuessError(
      `${label} must contain exactly ${CODE_LENGTH} ponies`,
    );
  }
}

/** Generates a random secret code (Math.random(); duplicates allowed). */
export function generateSecret(): PonyId[] {
  const secret: PonyId[] = [];

  for (let i = 0; i < CODE_LENGTH; i++) {
    const index = Math.floor(Math.random() * PONY_IDS.length);
    secret.push(PONY_IDS[index]);
  }

  return secret;
}

/**
 * Mastermind scoring:
 * 1. Count exact matches (same pony, same position) and exclude them.
 * 2. From remaining elements, count partial matches (pony in secret, wrong position).
 * 3. Each secret and guess element is counted at most once.
 */
export function evaluateGuess(secret: PonyId[], guess: PonyId[]): GuessResult {
  assertValidLength(secret, "Secret");
  assertValidLength(guess, "Guess");

  let exact = 0;
  const secretRemaining: PonyId[] = [];
  const guessRemaining: PonyId[] = [];

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (secret[i] === guess[i]) {
      exact += 1;
    } else {
      secretRemaining.push(secret[i]);
      guessRemaining.push(guess[i]);
    }
  }

  const secretPool = [...secretRemaining];
  let partial = 0;

  for (const pony of guessRemaining) {
    const matchIndex = secretPool.indexOf(pony);
    if (matchIndex !== -1) {
      partial += 1;
      secretPool.splice(matchIndex, 1);
    }
  }

  return { exact, partial };
}

export function isWinningGuess(result: GuessResult): boolean {
  return result.exact === CODE_LENGTH;
}

/**
 * Beginner Mode — positional feedback (PASS 1 exact, PASS 2 left-to-right).
 * Invariant: green/yellow/pink counts match Classic exact/partial/miss.
 */
export function evaluateGuessPositional(
  secret: PonyId[],
  guess: PonyId[],
): PositionalFeedback[] {
  assertValidLength(secret, "Secret");
  assertValidLength(guess, "Guess");

  const result: PositionalFeedback[] = Array.from(
    { length: CODE_LENGTH },
    () => "pink",
  );
  const secretUsed = Array.from({ length: CODE_LENGTH }, () => false);

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (secret[i] === guess[i]) {
      result[i] = "green";
      secretUsed[i] = true;
    }
  }

  for (let i = 0; i < CODE_LENGTH; i++) {
    if (result[i] === "green") {
      continue;
    }

    const pony = guess[i];
    const matchIndex = secret.findIndex(
      (id, index) => !secretUsed[index] && id === pony,
    );

    if (matchIndex !== -1) {
      result[i] = "yellow";
      secretUsed[matchIndex] = true;
    }
  }

  return result;
}

export function isWinningPositionalGuess(
  feedback: PositionalFeedback[],
): boolean {
  return (
    feedback.length === CODE_LENGTH && feedback.every((slot) => slot === "green")
  );
}
