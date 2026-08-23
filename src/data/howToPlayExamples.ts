import type { ManeSixPonyId } from "../game/config";
import { evaluateGuess, evaluateGuessPositional } from "../game/engine";
import type { PositionalFeedback } from "../game/types";

export const HOW_TO_PLAY_SECRET: ManeSixPonyId[] = [
  "twilight",
  "rainbow",
  "applejack",
  "pinkie",
];

export type HowToPlayAttempt = {
  guess: ManeSixPonyId[];
  positional: PositionalFeedback[];
  exact: number;
  partial: number;
};

function buildAttempts(guesses: readonly (readonly ManeSixPonyId[])[]): HowToPlayAttempt[] {
  return guesses.map((guess) => ({
    guess: [...guess],
    positional: evaluateGuessPositional(HOW_TO_PLAY_SECRET, [...guess]),
    ...evaluateGuess(HOW_TO_PLAY_SECRET, [...guess]),
  }));
}

export const HOW_TO_PLAY_BEGINNER_ATTEMPTS = buildAttempts([
  ["rarity", "fluttershy", "twilight", "applejack"],
  ["twilight", "rainbow", "pinkie", "fluttershy"],
  ["twilight", "applejack", "rainbow", "pinkie"],
  ["twilight", "rainbow", "applejack", "pinkie"],
] as const);

export const HOW_TO_PLAY_CLASSIC_ATTEMPTS = buildAttempts([
  ["rarity", "fluttershy", "twilight", "applejack"],
  ["twilight", "rainbow", "pinkie", "fluttershy"],
  ["twilight", "rainbow", "applejack", "pinkie"],
] as const);
