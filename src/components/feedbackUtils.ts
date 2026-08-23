import type { GameMode, PositionalFeedback } from "../game/types";

export type FeedbackType = "smile" | "wink" | "oops";

export type HistoryFeedbackPresentation = "positional" | "aggregate";

const POSITIONAL_TO_TOKEN: Record<PositionalFeedback, FeedbackType> = {
  green: "smile",
  yellow: "wink",
  pink: "oops",
};

const POSITIONAL_SLOT_LABELS: Record<PositionalFeedback, string> = {
  green: "на месте",
  yellow: "есть, но в другом месте",
  pink: "нет совпадений",
};

export function getHistoryFeedbackPresentation(
  gameMode: GameMode,
): HistoryFeedbackPresentation {
  return gameMode === "beginner" ? "positional" : "aggregate";
}

export function positionalToFeedbackType(
  slot: PositionalFeedback,
): FeedbackType {
  return POSITIONAL_TO_TOKEN[slot];
}

export function buildPositionalFeedbackSequence(
  positional: PositionalFeedback[],
): FeedbackType[] {
  return positional.map(positionalToFeedbackType);
}

export function positionalFeedbackAriaLabel(
  positional: PositionalFeedback[],
): string {
  return positional
    .map((slot, index) => `Позиция ${index + 1}: ${POSITIONAL_SLOT_LABELS[slot]}`)
    .join("; ");
}

export function buildFeedbackSequence(
  exact: number,
  partial: number,
): FeedbackType[] {
  const miss = 4 - exact - partial;
  return [
    ...Array.from({ length: exact }, () => "smile" as const),
    ...Array.from({ length: partial }, () => "wink" as const),
    ...Array.from({ length: miss }, () => "oops" as const),
  ];
}

export function feedbackGroupAriaLabel(
  exact: number,
  partial: number,
): string {
  const miss = 4 - exact - partial;
  const parts: string[] = [];

  if (exact > 0) {
    parts.push(
      `${exact} ${exact === 1 ? "точное совпадение" : exact < 5 ? "точных совпадения" : "точных совпадений"}`,
    );
  }
  if (partial > 0) {
    parts.push(
      `${partial} ${partial === 1 ? "частичное совпадение" : partial < 5 ? "частичных совпадения" : "частичных совпадений"}`,
    );
  }
  if (miss > 0) {
    parts.push(
      `${miss} ${miss === 1 ? "отсутствует" : "отсутствуют"}`,
    );
  }

  return parts.join(", ");
}

export const FEEDBACK_LABELS: Record<FeedbackType, string> = {
  smile: "Пони и место угаданы",
  wink: "Пони угадан, место другое",
  oops: "Совпадения нет",
};

export const FEEDBACK_IMAGES: Record<FeedbackType, string> = {
  smile: "/feedback/feedback-exact.png",
  wink: "/feedback/feedback-partial.png",
  oops: "/feedback/feedback-miss.png",
};
