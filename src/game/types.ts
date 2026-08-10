/** Character identifier used by the game engine (no UI coupling). */
export type PonyId = string;

export type GuessResult = {
  exact: number;
  partial: number;
};
