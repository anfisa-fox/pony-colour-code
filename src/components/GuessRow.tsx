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
};

export function GuessRow({ record, attemptNumber, gameMode }: GuessRowProps) {
  const presentation = getHistoryFeedbackPresentation(gameMode);

  if (presentation === "positional" && record.positional) {
    return (
      <li className="guess-row guess-row--beginner">
        <span className="guess-row__number">{attemptNumber}</span>

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
      </li>
    );
  }

  return (
    <li className="guess-row guess-row--classic">
      <span className="guess-row__number">{attemptNumber}</span>

      <div className="guess-row__pegs" aria-label={`Попытка ${attemptNumber}`}>
        {record.guess.map((ponyId, index) => (
          <CharacterToken key={`${attemptNumber}-${index}`} ponyId={ponyId} context="history" />
        ))}
      </div>

      <div className="guess-row__separator" aria-hidden="true" />

      <FeedbackGroup exact={record.exact} partial={record.partial} />
    </li>
  );
}
