import type { Dispatch } from "react";

import { CharacterPalette } from "../components/CharacterPalette";
import { CharacterToken } from "../components/CharacterToken";
import { FeedbackLegend } from "../components/FeedbackLegend";
import { GuessRow } from "../components/GuessRow";
import { MyWorldLink } from "../components/MyWorldLink";
import { CODE_LENGTH, MAX_ATTEMPTS } from "../game/config";
import type { gameSessionActions } from "../game/sessionReducer";
import type { GameSessionAction, GameSessionState } from "../game/sessionTypes";

type GameScreenProps = {
  state: GameSessionState;
  dispatch: Dispatch<GameSessionAction>;
  actions: typeof gameSessionActions;
};

export function GameScreen({ state, dispatch, actions }: GameScreenProps) {
  const canSubmit = state.currentGuess.length === CODE_LENGTH;

  return (
    <main className="screen screen--game">
      <header className="game-header">
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

      <div className="secret-slots" aria-label="Секретный код скрыт">
        {Array.from({ length: CODE_LENGTH }, (_, index) => (
          <div key={index} className="secret-slots__slot">
            <span className="secret-slots__symbol" aria-hidden="true">
              <span className="secret-slots__mane" />
            </span>
          </div>
        ))}
      </div>

      <section className="game-section game-section--history" aria-labelledby="history-heading">
        <h2 id="history-heading" className="section-heading">
          История попыток
        </h2>

        {state.history.length === 0 ? (
          <p className="empty-note">Пока нет подтверждённых попыток.</p>
        ) : (
          <ol className="guess-history">
            {state.history.map((record, index) => (
              <GuessRow
                key={`${index}-${record.guess.join("-")}`}
                record={record}
                attemptNumber={index + 1}
              />
            ))}
          </ol>
        )}
      </section>

      <section className="game-section game-section--current" aria-labelledby="current-guess-heading">
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

      <section className="game-section game-section--palette" aria-labelledby="palette-heading">
        <h2 id="palette-heading" className="section-heading">
          Выбери персонажа
        </h2>

        <CharacterPalette
          onSelect={(ponyId) => dispatch(actions.addPony(ponyId))}
          disabled={state.currentGuess.length >= CODE_LENGTH}
        />
      </section>

      <FeedbackLegend compact />

      <div className="game-actions">
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
    </main>
  );
}
