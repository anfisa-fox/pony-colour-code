import type { CSSProperties } from "react";

import { CHARACTERS } from "../data/characters";
import type { PonyId } from "../game/types";
import { CharacterCard } from "./CharacterCard";

type CharacterPaletteProps = {
  onSelect: (ponyId: PonyId) => void;
  disabled?: boolean;
};

export function CharacterPalette({ onSelect, disabled = false }: CharacterPaletteProps) {
  return (
    <div className="character-palette" role="group" aria-label="Выбор персонажа">
      {CHARACTERS.map((character) => (
        <button
          key={character.id}
          type="button"
          className="character-palette__button"
          style={
            {
              "--token-color": character.color,
              "--token-accent": character.accent,
            } as CSSProperties
          }
          onClick={() => onSelect(character.id)}
          disabled={disabled}
          aria-label={`Добавить ${character.name}`}
        >
          <CharacterCard ponyId={character.id} size="palette" />
          <span className="character-palette__name">{character.name}</span>
        </button>
      ))}
    </div>
  );
}
