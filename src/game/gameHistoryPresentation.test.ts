import { describe, expect, it } from "vitest";

import { getHistoryNewestFirst } from "./gameHistoryPresentation";
import type { GuessRecord } from "./sessionTypes";

function record(id: string): GuessRecord {
  return {
    guess: [id, "b", "c", "d"],
    exact: 1,
    partial: 1,
  };
}

describe("getHistoryNewestFirst", () => {
  it("returns empty list for no history", () => {
    expect(getHistoryNewestFirst([])).toEqual([]);
  });

  it("returns a single attempt as #1", () => {
    const history = [record("a")];
    const items = getHistoryNewestFirst(history);

    expect(items).toHaveLength(1);
    expect(items[0].attemptNumber).toBe(1);
    expect(items[0].record).toBe(history[0]);
  });

  it("orders four attempts newest-first as 4,3,2,1", () => {
    const history = [record("1"), record("2"), record("3"), record("4")];
    const items = getHistoryNewestFirst(history);

    expect(items.map((item) => item.attemptNumber)).toEqual([4, 3, 2, 1]);
    expect(items[0].record).toBe(history[3]);
    expect(items[3].record).toBe(history[0]);
  });

  it("preserves real attempt numbers in newest-first order", () => {
    const history = Array.from({ length: 5 }, (_, index) => record(String(index + 1)));
    const items = getHistoryNewestFirst(history);

    expect(items.map((item) => item.attemptNumber)).toEqual([5, 4, 3, 2, 1]);
  });
});
