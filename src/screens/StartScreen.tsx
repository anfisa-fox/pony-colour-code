import { useState } from "react";

import { CharacterProfileSheet } from "../components/CharacterProfileSheet";
import { HowToPlayDialog } from "../components/HowToPlayDialog";
import { ModeSelector, START_DEFAULT_MODE } from "../components/ModeSelector";
import { CHARACTERS } from "../data/characters";
import type { ManeSixPonyId } from "../game/config";
import type { GameMode } from "../game/types";

type StartScreenProps = {
  onStart: (mode: GameMode) => void;
  initialMode?: GameMode;
};

export function StartScreen({
  onStart,
  initialMode = START_DEFAULT_MODE,
}: StartScreenProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode>(initialMode);
  const [howToPlayOpen, setHowToPlayOpen] = useState(false);
  const [profilePonyId, setProfilePonyId] = useState<ManeSixPonyId | null>(null);

  return (
    <main className="screen screen--start">
      <header className="start-header">
        <h1 className="start-header__title">Pony Colour Code</h1>

        <ul className="start-hero-ensemble" aria-label="Персонажи игры">
          {CHARACTERS.map((character) => (
            <li key={character.id} className="start-hero-ensemble__item">
              <button
                type="button"
                className="start-hero-ensemble__button"
                onClick={() => setProfilePonyId(character.id)}
                aria-label={`Открыть карточку: ${character.name}`}
              >
                <span className="start-hero-ensemble__figure-wrap">
                  <img
                    className={`start-hero-ensemble__figure${
                      character.mirrored ? " start-hero-ensemble__figure--mirrored" : ""
                    }`}
                    src={character.image}
                    alt=""
                    draggable={false}
                  />
                </span>
                <span className="start-hero-ensemble__name">{character.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </header>

      <button
        type="button"
        className="button button--secondary"
        onClick={() => setHowToPlayOpen(true)}
      >
        Как играть?
      </button>

      <section className="start-mode" aria-label="Выбор режима игры">
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
      </div>

      <HowToPlayDialog open={howToPlayOpen} onClose={() => setHowToPlayOpen(false)} />
      <CharacterProfileSheet
        ponyId={profilePonyId}
        onClose={() => setProfilePonyId(null)}
      />
    </main>
  );
}
