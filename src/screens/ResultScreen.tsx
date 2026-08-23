import { CharacterToken } from "../components/CharacterToken";
import { MAX_ATTEMPTS } from "../game/config";
import type { GameSessionState } from "../game/sessionTypes";

type ResultScreenProps = {
  state: GameSessionState;
  onNewGame: () => void;
};

export function ResultScreen({ state, onNewGame }: ResultScreenProps) {
  const isWin = state.phase === "won";
  const attemptsUsed = state.history.length;

  return (
    <main className="screen screen--result">
      <div className="result-panel">
        <div className="result-hero" aria-hidden="true" />

        <h1 className="screen__title result-panel__title">
          {isWin ? "Поздравляем!" : "Почти получилось!"}
        </h1>

        <p className="result-message">
          {isWin
            ? `Ты раскрыл секретный код за ${attemptsUsed} ${attemptsLabel(attemptsUsed)}!`
            : "Ты использовал все 10 попыток."}
        </p>

        <section className="result-secret" aria-labelledby="secret-heading">
          <h2 id="secret-heading" className="section-heading">
            Секретный код
          </h2>

          <div className="current-guess result-secret__code" aria-label="Секретный код">
            {state.secret.map((ponyId, index) => (
              <div key={`${ponyId}-${index}`} className="current-guess__slot">
                <CharacterToken ponyId={ponyId} />
              </div>
            ))}
          </div>
        </section>

        <div className="screen__actions result-panel__actions">
          <button type="button" className="button button--primary" onClick={onNewGame}>
            {isWin ? "Новая партия" : "Попробовать ещё раз"}
          </button>
          {!isWin && (
            <p className="screen__meta">
              Использовано попыток: {MAX_ATTEMPTS} / {MAX_ATTEMPTS}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

function attemptsLabel(count: number): string {
  if (count === 1) return "попытку";
  if (count >= 2 && count <= 4) return "попытки";
  return "попыток";
}
