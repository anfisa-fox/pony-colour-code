import { useCallback, useEffect, useId, useRef, useState } from "react";

import { CharacterToken } from "./CharacterToken";
import { FeedbackToken } from "./FeedbackToken";
import {
  HOW_TO_PLAY_BEGINNER_ATTEMPTS,
  HOW_TO_PLAY_CLASSIC_ATTEMPTS,
  HOW_TO_PLAY_SECRET,
  type HowToPlayAttempt,
} from "../data/howToPlayExamples";
import { getCharacter } from "../data/characters";
import {
  buildFeedbackSequence,
  feedbackGroupAriaLabel,
  positionalToFeedbackType,
} from "./feedbackUtils";

const HOW_TO_PLAY_STEPS = [
  "Выбери 4 пони",
  "Подтверди догадку",
  "Используй подсказки и разгадай код",
] as const;

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
            <span className="how-to-play__connector" aria-hidden="true" />
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
  const tokens = buildFeedbackSequence(attempt.exact, attempt.partial);

  return (
    <li className="how-to-play__attempt how-to-play__attempt--classic">
      <span className="how-to-play__attempt-number">{attemptNumber}</span>
      <div className="how-to-play__classic-row">
        <div className="how-to-play__classic-guess">
          {attempt.guess.map((ponyId, index) => (
            <CharacterToken
              key={`${attemptNumber}-${index}-${ponyId}`}
              ponyId={ponyId}
              context="history"
            />
          ))}
        </div>
        <div
          className="how-to-play__classic-feedback"
          role="group"
          aria-label={feedbackGroupAriaLabel(attempt.exact, attempt.partial)}
        >
          {tokens.map((type, index) => (
            <FeedbackToken key={`${attemptNumber}-${type}-${index}`} type={type} size="demo" />
          ))}
        </div>
      </div>
    </li>
  );
}

function HowToPlayLegend() {
  return (
    <div className="how-to-play-dialog__legend" aria-label="Обозначения подсказок">
      <span className="how-to-play-dialog__legend-item">
        <FeedbackToken type="smile" size="demo" />
        <span>на месте</span>
      </span>
      <span className="how-to-play-dialog__legend-item">
        <FeedbackToken type="wink" size="demo" />
        <span>есть, но в другом месте</span>
      </span>
      <span className="how-to-play-dialog__legend-item">
        <FeedbackToken type="oops" size="demo" />
        <span>нет совпадений</span>
      </span>
    </div>
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
  const bodyRef = useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const updateScrollHint = useCallback(() => {
    const body = bodyRef.current;
    if (!body) {
      setShowScrollHint(false);
      return;
    }

    const remaining = body.scrollHeight - body.scrollTop - body.clientHeight;
    setShowScrollHint(remaining > 24);
  }, []);

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

  useEffect(() => {
    if (!open) {
      return;
    }

    updateScrollHint();

    const body = bodyRef.current;
    if (!body) {
      return;
    }

    body.addEventListener("scroll", updateScrollHint, { passive: true });
    const resizeObserver = new ResizeObserver(updateScrollHint);
    resizeObserver.observe(body);

    return () => {
      body.removeEventListener("scroll", updateScrollHint);
      resizeObserver.disconnect();
    };
  }, [open, updateScrollHint]);

  function scrollDown() {
    const body = bodyRef.current;
    if (!body) {
      return;
    }

    body.scrollBy({
      top: Math.max(body.clientHeight * 0.55, 180),
      behavior: "smooth",
    });
  }

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

        <div ref={bodyRef} className="how-to-play-dialog__body">
          <ol className="how-to-play-dialog__steps" aria-label="Краткая инструкция">
            {HOW_TO_PLAY_STEPS.map((step, index) => (
              <li key={step} className="how-to-play-dialog__step">
                <span className="how-to-play-dialog__step-number" aria-hidden="true">
                  {index + 1}.
                </span>
                <span className="how-to-play-dialog__step-text">{step}</span>
              </li>
            ))}
          </ol>

          <p className="how-to-play-dialog__meta">Одна партия · примерно 5–10 минут</p>

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

          <HowToPlayLegend />
        </div>

        {showScrollHint ? (
          <button
            type="button"
            className="how-to-play-dialog__scroll-hint"
            onClick={scrollDown}
            aria-label="Прокрутить вниз"
          >
            ↓
          </button>
        ) : null}
      </div>
    </div>
  );
}
