import { describe, expect, it } from "vitest";

import {
  buildFeedbackSequence,
  buildPositionalFeedbackSequence,
  getHistoryFeedbackPresentation,
  positionalFeedbackAriaLabel,
  positionalToFeedbackType,
} from "./feedbackUtils";

describe("feedback presentation", () => {
  it("uses positional presentation for beginner mode", () => {
    expect(getHistoryFeedbackPresentation("beginner")).toBe("positional");
  });

  it("uses aggregate presentation for classic mode", () => {
    expect(getHistoryFeedbackPresentation("classic")).toBe("aggregate");
  });

  it("maps positional slots to production medallion types", () => {
    expect(positionalToFeedbackType("green")).toBe("smile");
    expect(positionalToFeedbackType("yellow")).toBe("wink");
    expect(positionalToFeedbackType("pink")).toBe("oops");
  });

  it("preserves positional order for beginner history rows", () => {
    expect(
      buildPositionalFeedbackSequence([
        "yellow",
        "yellow",
        "green",
        "pink",
      ]),
    ).toEqual(["wink", "wink", "smile", "oops"]);
  });

  it("does not sort positional feedback like classic aggregate feedback", () => {
    const positional = buildPositionalFeedbackSequence([
      "yellow",
      "pink",
      "green",
      "yellow",
    ]);
    const aggregate = buildFeedbackSequence(1, 2);

    expect(positional).toEqual(["wink", "oops", "smile", "wink"]);
    expect(aggregate).toEqual(["smile", "wink", "wink", "oops"]);
    expect(positional).not.toEqual(aggregate);
  });

  it("builds positional aria labels per slot", () => {
    expect(
      positionalFeedbackAriaLabel(["green", "yellow", "pink", "yellow"]),
    ).toBe(
      "Позиция 1: на месте; Позиция 2: есть, но в другом месте; Позиция 3: нет совпадений; Позиция 4: есть, но в другом месте",
    );
  });

  it("maps winning beginner feedback to four green medallions", () => {
    expect(
      buildPositionalFeedbackSequence(["green", "green", "green", "green"]),
    ).toEqual(["smile", "smile", "smile", "smile"]);
  });
});

describe("feedback presentation with session history shape", () => {
  it("keeps independent positional sequences for multiple history rows", () => {
    const rowOne = buildPositionalFeedbackSequence([
      "yellow",
      "pink",
      "green",
      "pink",
    ]);
    const rowTwo = buildPositionalFeedbackSequence([
      "green",
      "yellow",
      "yellow",
      "pink",
    ]);

    expect(rowOne).toEqual(["wink", "oops", "smile", "oops"]);
    expect(rowTwo).toEqual(["smile", "wink", "wink", "oops"]);
    expect(rowOne).not.toEqual(rowTwo);
  });

  it("classic mode presentation ignores stored positional data at UI layer", () => {
    expect(getHistoryFeedbackPresentation("classic")).toBe("aggregate");
  });
});
