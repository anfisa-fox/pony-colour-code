import { CharacterToken } from "./CharacterToken";
import { FeedbackGroup } from "./FeedbackGroup";
import type { GuessRecord } from "../game/sessionTypes";

type GuessRowProps = {
  record: GuessRecord;
  attemptNumber: number;
};

export function GuessRow({ record, attemptNumber }: GuessRowProps) {
  return (
    <li className="guess-row">
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
