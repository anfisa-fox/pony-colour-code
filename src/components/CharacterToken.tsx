import { CharacterCard, type CharacterCardSize } from "./CharacterCard";
import { getCharacter } from "../data/characters";
import type { PonyId } from "../game/types";

type CharacterTokenProps = {
  ponyId: PonyId;
  /** @deprecated use `context` */
  compact?: boolean;
  context?: CharacterCardSize;
};

export function CharacterToken({
  ponyId,
  compact,
  context,
}: CharacterTokenProps) {
  const character = getCharacter(ponyId);
  const cardSize: CharacterCardSize =
    context ?? (compact ? "history" : "result");
  const showName = cardSize === "result";

  return (
    <span
      className={`character-token${showName ? "" : " character-token--card-only"}`}
      title={character.name}
      aria-label={character.name}
    >
      <CharacterCard ponyId={ponyId} size={cardSize} />
      {showName && (
        <span className="character-token__name">{character.name}</span>
      )}
    </span>
  );
}
