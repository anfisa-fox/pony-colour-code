import { FeedbackLegend } from "../components/FeedbackLegend";
import { MyWorldLink } from "../components/MyWorldLink";
import { CHARACTERS } from "../data/characters";

const START_STEPS = [
  "Выбери 4 пони",
  "Подтверди догадку",
  "Используй подсказки и разгадай код",
] as const;

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <main className="screen screen--start">
      <MyWorldLink className="screen__nav" />

      <header className="start-header">
        <h1 className="start-header__title">Pony Colour Code</h1>

        <ul className="start-hero-ensemble" aria-label="Персонажи игры">
          {CHARACTERS.map((character) => (
            <li key={character.id} className="start-hero-ensemble__item">
              <img
                className="start-hero-ensemble__figure"
                src={character.image}
                alt=""
                draggable={false}
              />
              <span className="start-hero-ensemble__name">{character.name}</span>
            </li>
          ))}
        </ul>

        <p className="start-header__subtitle">
          Угадай секретный код из пони — классический Mastermind с магией дружбы.
        </p>
      </header>

      <ol className="start-steps" aria-label="Как играть">
        {START_STEPS.map((step, index) => (
          <li key={step} className="start-step">
            <span className="start-step__number" aria-hidden="true">
              {index + 1}
            </span>
            <span className="start-step__text">{step}</span>
          </li>
        ))}
      </ol>

      <section className="start-legend" aria-labelledby="start-legend-heading">
        <h2 id="start-legend-heading" className="section-heading">
          Подсказки
        </h2>
        <FeedbackLegend compact />
        <p className="start-legend__note">
          Подсказки показывают результат всей попытки, а не отдельных позиций.
        </p>
      </section>

      <div className="screen__actions start-actions">
        <button type="button" className="button button--primary" onClick={onStart}>
          Играть
        </button>
        <p className="screen__meta">Одна партия · примерно 5–10 минут</p>
      </div>
    </main>
  );
}
