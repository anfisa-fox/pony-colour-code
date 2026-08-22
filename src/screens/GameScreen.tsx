import { useEffect, useRef } from "react";
import type { Dispatch } from "react";

import { CharacterPalette } from "../components/CharacterPalette";
import { CharacterToken } from "../components/CharacterToken";
import { FeedbackLegend } from "../components/FeedbackLegend";
import { GuessRow } from "../components/GuessRow";
import { MyWorldLink } from "../components/MyWorldLink";
import { CODE_LENGTH, MAX_ATTEMPTS } from "../game/config";
import { getHistoryNewestFirst } from "../game/gameHistoryPresentation";
import type { gameSessionActions } from "../game/sessionReducer";
import type { GameSessionAction, GameSessionState } from "../game/sessionTypes";

type GameScreenProps = {
  state: GameSessionState;
  dispatch: Dispatch<GameSessionAction>;
  actions: typeof gameSessionActions;
};

export function GameScreen({ state, dispatch, actions }: GameScreenProps) {
  const canSubmit = state.currentGuess.length === CODE_LENGTH;
  const mobileHistory = getHistoryNewestFirst(state.history);
  const mobileHistoryScrollRef = useRef<HTMLOListElement>(null);
  const previousHistoryLengthRef = useRef(state.history.length);

  useEffect(() => {
    if (state.history.length > previousHistoryLengthRef.current) {
      mobileHistoryScrollRef.current?.scrollTo({ top: 0 });
    }

    previousHistoryLengthRef.current = state.history.length;
  }, [state.history.length]);

  return (
    <main className="screen screen--game">
      <div className="game-layout">
        <header className="game-header game-layout__header">
          <div className="game-header__top">
            <h1 className="game-header__title">Pony Colour Code</h1>
            <MyWorldLink className="game-header__nav" />
          </div>
          <p className="game-header__attempts">
            Осталось попыток:{" "}
            <strong>
              {state.attemptsRemaining} / {MAX_ATTEMPTS}
            </strong>
          </p>
        </header>

        <div className="secret-slots game-layout__secret" aria-label="Секретный код скрыт">
          {Array.from({ length: CODE_LENGTH }, (_, index) => (
            <div key={index} className="secret-slots__slot">
              <span className="secret-slots__symbol" aria-hidden="true">
                <span className="secret-slots__mane" />
              </span>
            </div>
          ))}
        </div>

        <section
          className="game-section game-section--history game-layout__history game-layout__history--desktop"
          aria-labelledby="history-heading"
        >
          <h2 id="history-heading" className="section-heading">
            История попыток
          </h2>

          {state.history.length === 0 ? (
            <p className="empty-note">Пока нет подтверждённых попыток.</p>
          ) : (
            <ol className="guess-history">
              {state.history.map((record, index) => (
                <GuessRow
                  key={`desktop-${index}-${record.guess.join("-")}`}
                  record={record}
                  attemptNumber={index + 1}
                  gameMode={state.gameMode}
                />
              ))}
            </ol>
          )}
        </section>

        <section
          className="game-section game-section--current game-layout__current"
          aria-labelledby="current-guess-heading"
        >
          <div className="current-guess-header">
            <h2 id="current-guess-heading" className="section-heading">
              Текущая догадка
            </h2>
            <p className="current-guess__counter" aria-live="polite">
              Выбрано {state.currentGuess.length} из {CODE_LENGTH}
            </p>
          </div>

          <div className="current-guess">
            {Array.from({ length: CODE_LENGTH }, (_, index) => {
              const ponyId = state.currentGuess[index];
              return (
                <div key={index} className="current-guess__slot">
                  {ponyId ? (
                    <CharacterToken ponyId={ponyId} context="guess" />
                  ) : (
                    <span className="current-guess__empty" aria-hidden="true">
                      {index + 1}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {mobileHistory.length > 0 ? (
          <section
            className="game-section game-section--history game-layout__history game-layout__history--mobile"
            aria-labelledby="mobile-history-heading"
          >
            <h2 id="mobile-history-heading" className="section-heading">
              История
            </h2>
            <ol
              ref={mobileHistoryScrollRef}
              className="guess-history guess-history--scroll"
            >
              {mobileHistory.map((attempt) => (
                <GuessRow
                  key={`mobile-${attempt.attemptNumber}-${attempt.record.guess.join("-")}`}
                  record={attempt.record}
                  attemptNumber={attempt.attemptNumber}
                  gameMode={state.gameMode}
                />
              ))}
            </ol>
          </section>
        ) : null}

        <div className="game-layout__legend game-layout__legend--desktop">
          <FeedbackLegend compact gameMode={state.gameMode} />
        </div>

        <div className="game-play-zone game-layout__play">
          <div className="game-actions game-layout__actions">
            <button
              type="button"
              className="button"
              onClick={() => dispatch(actions.removeLastPony())}
              disabled={state.currentGuess.length === 0}
            >
              ← Удалить
            </button>

            <button
              type="button"
              className="button button--primary"
              onClick={() => dispatch(actions.submitGuess())}
              disabled={!canSubmit}
            >
              Подтвердить
            </button>
          </div>

          <section
            className="game-section game-section--palette game-layout__palette"
            aria-labelledby="palette-heading"
          >
            <h2 id="palette-heading" className="section-heading game-layout__palette-heading">
              Выбери персонажа
            </h2>

            <CharacterPalette
              onSelect={(ponyId) => dispatch(actions.addPony(ponyId))}
              disabled={state.currentGuess.length >= CODE_LENGTH}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
