import type { CSSProperties } from "react";

import { getCharacter } from "../data/characters";
import type { PonyId } from "../game/types";

export type CharacterCardSize = "palette" | "guess" | "history" | "result";

type CharacterCardProps = {
  ponyId: PonyId;
  size?: CharacterCardSize;
};

export function CharacterCard({
  ponyId,
  size = "result",
}: CharacterCardProps) {
  const character = getCharacter(ponyId);

  return (
    <span
      className={`character-card character-card--${size}${character.mirrored ? " character-card--mirrored" : ""}`}
      style={
        {
          "--token-color": character.color,
          "--token-accent": character.accent,
        } as CSSProperties
      }
    >
      <span className="character-card__frame">
        <img
          className="character-card__image"
          src={character.image}
          alt=""
          draggable={false}
        />
      </span>
    </span>
  );
}
