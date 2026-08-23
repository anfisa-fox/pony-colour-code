import { useEffect, useId, useRef } from "react";

import { CharacterToken } from "./CharacterToken";
import { FeedbackGroup } from "./FeedbackGroup";
import { FeedbackToken } from "./FeedbackToken";
import {
  HOW_TO_PLAY_BEGINNER_ATTEMPTS,
  HOW_TO_PLAY_CLASSIC_ATTEMPTS,
  HOW_TO_PLAY_SECRET,
  type HowToPlayAttempt,
} from "../data/howToPlayExamples";
import { getCharacter } from "../data/characters";
import { positionalToFeedbackType } from "./feedbackUtils";

type HowToPlayDialogProps = {
  open: boolean;
  onClose: () => void;
};

type TutorialColumnProps = {
  title: string;
  note: string;
  mode: "beginner" | "classic";
  attempts: HowToPlayAttempt[];
};

function SecretRow() {
  return (
    <div className="how-to-play__secret">
      <span className="how-to-play__row-label">Секрет</span>
      <div className="how-to-play__ponies" aria-hidden="true">
        {HOW_TO_PLAY_SECRET.map((ponyId, index) => {
          const character = getCharacter(ponyId);
          return (
            <img
              key={`secret-${ponyId}-${index}`}
              className={`how-to-play__pony${
                character.mirrored ? " how-to-play__pony--mirrored" : ""
              }`}
              src={character.image}
              alt=""
              draggable={false}
            />
          );
        })}
      </div>
    </div>
  );
}

function BeginnerAttemptRow({
  attemptNumber,
  attempt,
}: {
  attemptNumber: number;
  attempt: HowToPlayAttempt;
}) {
  return (
    <li className="how-to-play__attempt how-to-play__attempt--beginner">
      <span className="how-to-play__attempt-number">{attemptNumber}</span>
      <div className="how-to-play__beginner-slots">
        {attempt.guess.map((ponyId, index) => (
          <div key={`${attemptNumber}-${index}`} className="how-to-play__beginner-slot">
            <CharacterToken ponyId={ponyId} context="history" />
            <FeedbackToken
              type={positionalToFeedbackType(attempt.positional[index])}
              size="demo"
            />
          </div>
        ))}
      </div>
    </li>
  );
}

function ClassicAttemptRow({
  attemptNumber,
  attempt,
}: {
  attemptNumber: number;
  attempt: HowToPlayAttempt;
}) {
  return (
    <li className="how-to-play__attempt how-to-play__attempt--classic">
      <span className="how-to-play__attempt-number">{attemptNumber}</span>
      <div className="how-to-play__classic-guess">
        {attempt.guess.map((ponyId, index) => (
          <CharacterToken
            key={`${attemptNumber}-${index}-${ponyId}`}
            ponyId={ponyId}
            context="history"
          />
        ))}
      </div>
      <FeedbackGroup exact={attempt.exact} partial={attempt.partial} />
    </li>
  );
}

function TutorialColumn({ title, note, mode, attempts }: TutorialColumnProps) {
  return (
    <section className="how-to-play__column" aria-labelledby={`how-to-play-${mode}`}>
      <h3 id={`how-to-play-${mode}`} className="how-to-play__column-title">
        {title}
      </h3>
      <p className="how-to-play__column-note">{note}</p>

      <SecretRow />

      <ol className="how-to-play__attempts">
        {attempts.map((attempt, index) =>
          mode === "beginner" ? (
            <BeginnerAttemptRow
              key={`${mode}-${index}`}
              attemptNumber={index + 1}
              attempt={attempt}
            />
          ) : (
            <ClassicAttemptRow
              key={`${mode}-${index}`}
              attemptNumber={index + 1}
              attempt={attempt}
            />
          ),
        )}
      </ol>
    </section>
  );
}

export function HowToPlayDialog({ open, onClose }: HowToPlayDialogProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="how-to-play-overlay" onClick={onClose}>
      <div
        className="how-to-play-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="how-to-play-dialog__header">
          <h2 id={titleId} className="how-to-play-dialog__title">
            Как играть?
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="how-to-play-dialog__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </header>

        <div className="how-to-play-dialog__body">
          <p className="how-to-play-dialog__intro">
            Угадай секретный код из четырёх пони. После каждой попытки медали подскажут,
            насколько близко ты к разгадке.
          </p>

          <div className="how-to-play-dialog__columns">
            <TutorialColumn
              title="Для новичков"
              note="Каждая пони получает свою подсказку."
              mode="beginner"
              attempts={HOW_TO_PLAY_BEGINNER_ATTEMPTS}
            />
            <TutorialColumn
              title="Классический"
              note="Подсказки для всей попытки — определи, к каким пони они относятся."
              mode="classic"
              attempts={HOW_TO_PLAY_CLASSIC_ATTEMPTS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
