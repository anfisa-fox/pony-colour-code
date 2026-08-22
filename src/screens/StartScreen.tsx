import { useState } from "react";

import { GameExample } from "../components/GameExample";
import { ModeSelector, START_DEFAULT_MODE } from "../components/ModeSelector";
import { MyWorldLink } from "../components/MyWorldLink";
import { CHARACTERS } from "../data/characters";
import type { GameMode } from "../game/types";

const START_STEPS = [
  "Выбери 4 пони",
  "Подтверди догадку",
  "Используй подсказки и разгадай код",
] as const;

type StartScreenProps = {
  onStart: (mode: GameMode) => void;
  initialMode?: GameMode;
};

export function StartScreen({
  onStart,
  initialMode = START_DEFAULT_MODE,
}: StartScreenProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>(initialMode);

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

      <section className="start-mode" aria-labelledby="start-mode-heading">
        <h2 id="start-mode-heading" className="section-heading">
          Выбери режим
        </h2>

        <GameExample />

        <ModeSelector selectedMode={selectedMode} onSelect={setSelectedMode} />
      </section>

      <div className="screen__actions start-actions">
        <button
          type="button"
          className="button button--primary"
          onClick={() => onStart(selectedMode)}
        >
          Играть
        </button>
        <p className="screen__meta">Одна партия · примерно 5–10 минут</p>
      </div>
    </main>
  );
}
