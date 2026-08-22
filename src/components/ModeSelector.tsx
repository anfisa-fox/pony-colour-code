import type { KeyboardEvent } from "react";

import { FeedbackToken } from "./FeedbackToken";
import type { FeedbackType } from "./feedbackUtils";
import { DEFAULT_GAME_MODE } from "../game/config";
import type { GameMode } from "../game/types";

type DemoSlotFeedback = "green" | "yellow" | "pink";

const SLOT_TO_TOKEN: Record<DemoSlotFeedback, FeedbackType> = {
  green: "smile",
  yellow: "wink",
  pink: "oops",
};

const BEGINNER_FEEDBACK: DemoSlotFeedback[] = [
  "yellow",
  "yellow",
  "green",
  "pink",
];

const CLASSIC_FEEDBACK: DemoSlotFeedback[] = [
  "green",
  "yellow",
  "yellow",
  "pink",
];

export const START_MODE_OPTIONS = [
  {
    id: "beginner" as const,
    title: "Для новичков",
    subtitle: "Узнай подсказку для каждой пони",
    feedback: BEGINNER_FEEDBACK,
  },
  {
    id: "classic" as const,
    title: "Классический",
    subtitle: "Разгадай, к каким пони относятся подсказки",
    feedback: CLASSIC_FEEDBACK,
  },
] as const;

export const START_DEFAULT_MODE: GameMode = DEFAULT_GAME_MODE;

type ModeSelectorProps = {
  selectedMode: GameMode;
  onSelect: (mode: GameMode) => void;
};

export function ModeSelector({ selectedMode, onSelect }: ModeSelectorProps) {
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      onSelect("classic");
      return;
    }

    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      onSelect("beginner");
    }
  }

  return (
    <div
      className="mode-selector"
      role="radiogroup"
      aria-label="Выбор режима игры"
      onKeyDown={handleKeyDown}
    >
      {START_MODE_OPTIONS.map((mode) => {
        const isSelected = selectedMode === mode.id;

        return (
          <button
            key={mode.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`mode-card${isSelected ? " mode-card--selected" : ""}`}
            onClick={() => onSelect(mode.id)}
          >
            <span className="mode-card__title">{mode.title}</span>
            <span className="mode-card__feedback" aria-hidden="true">
              {mode.feedback.map((slot, index) => (
                <FeedbackToken
                  key={`${mode.id}-${slot}-${index}`}
                  type={SLOT_TO_TOKEN[slot]}
                  size="demo"
                />
              ))}
            </span>
            <span className="mode-card__subtitle">{mode.subtitle}</span>
          </button>
        );
      })}
    </div>
  );
}
