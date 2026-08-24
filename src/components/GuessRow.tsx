import { CharacterToken } from "./CharacterToken";
import { FeedbackGroup } from "./FeedbackGroup";
import { FeedbackToken } from "./FeedbackToken";
import {
  getHistoryFeedbackPresentation,
  positionalFeedbackAriaLabel,
  positionalToFeedbackType,
} from "./feedbackUtils";
import type { GameMode } from "../game/types";
import type { GuessRecord } from "../game/sessionTypes";

type GuessRowProps = {
  record: GuessRecord;
  attemptNumber: number;
  gameMode: GameMode;
  variant?: "list" | "carousel";
};

export function GuessRow({
  record,
  attemptNumber,
  gameMode,
  variant = "list",
}: GuessRowProps) {
  const presentation = getHistoryFeedbackPresentation(gameMode);
  const RowTag = variant === "carousel" ? "div" : "li";
  const rowClassName =
    variant === "carousel"
      ? `guess-row guess-row--carousel guess-row--${presentation === "positional" ? "beginner" : "classic"}`
      : `guess-row guess-row--${presentation === "positional" ? "beginner" : "classic"}`;

  if (presentation === "positional" && record.positional) {
    return (
      <RowTag className={rowClassName}>
        {variant === "list" ? (
          <span className="guess-row__number">{attemptNumber}</span>
        ) : null}

        <div
          className="guess-row__positional"
          role="group"
          aria-label={`Попытка ${attemptNumber}. ${positionalFeedbackAriaLabel(record.positional)}`}
        >
          {record.guess.map((ponyId, index) => (
            <div
              key={`${attemptNumber}-${index}-${ponyId}`}
              className="guess-row__slot"
            >
              <CharacterToken ponyId={ponyId} context="history" />
              <FeedbackToken
                type={positionalToFeedbackType(record.positional![index])}
              />
            </div>
          ))}
        </div>
      </RowTag>
    );
  }

  return (
    <RowTag className={rowClassName}>
      {variant === "list" ? (
        <span className="guess-row__number">{attemptNumber}</span>
      ) : null}

      <div className="guess-row__pegs" aria-label={`Попытка ${attemptNumber}`}>
        {record.guess.map((ponyId, index) => (
          <CharacterToken key={`${attemptNumber}-${index}`} ponyId={ponyId} context="history" />
        ))}
      </div>

      <div className="guess-row__separator" aria-hidden="true" />

      <FeedbackGroup exact={record.exact} partial={record.partial} />
    </RowTag>
  );
}
