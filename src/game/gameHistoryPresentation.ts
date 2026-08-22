import type { GuessRecord } from "./sessionTypes";

export type HistoryAttempt = {
  record: GuessRecord;
  attemptNumber: number;
};

/**
 * Returns confirmed history for mobile GAME presentation (newest attempt first).
 * Session storage order is unchanged; this only affects display order.
 */
export function getHistoryNewestFirst(history: GuessRecord[]): HistoryAttempt[] {
  return history
    .map((record, index) => ({
      record,
      attemptNumber: index + 1,
    }))
    .reverse();
}
