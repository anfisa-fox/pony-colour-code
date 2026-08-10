import { PONY_IDS, type ManeSixPonyId } from "../game/config";
import type { PonyId } from "../game/types";

export type Character = {
  id: ManeSixPonyId;
  /** Russian display name in UI */
  name: string;
  color: string;
  accent: string;
  image: string;
  /** Row 2 (Pinkie, Fluttershy, Rarity) — horizontal mirror in all contexts */
  mirrored: boolean;
};

export const CHARACTERS: Character[] = [
  {
    id: "twilight",
    name: "Искорка",
    color: "#9B59B6",
    accent: "#6C3483",
    image: "/characters/twilight.png",
    mirrored: false,
  },
  {
    id: "rainbow",
    name: "Радуга Дэш",
    color: "#2E86AB",
    accent: "#1A5276",
    image: "/characters/rainbow-dash.png",
    mirrored: false,
  },
  {
    id: "applejack",
    name: "Эпплджек",
    color: "#F39C12",
    accent: "#B9770E",
    image: "/characters/applejack.png",
    mirrored: false,
  },
  {
    id: "pinkie",
    name: "Пинки Пай",
    color: "#D4537E",
    accent: "#922B52",
    image: "/characters/pinkie-pie.png",
    mirrored: true,
  },
  {
    id: "fluttershy",
    name: "Флаттершай",
    color: "#27AE60",
    accent: "#1E8449",
    image: "/characters/fluttershy.png",
    mirrored: true,
  },
  {
    id: "rarity",
    name: "Рарити",
    color: "#EDB8CF",
    accent: "#D49AB5",
    image: "/characters/rarity.png",
    mirrored: true,
  },
];

export const CHARACTER_BY_ID = Object.fromEntries(
  CHARACTERS.map((character) => [character.id, character]),
) as Record<ManeSixPonyId, Character>;

export function getCharacter(id: PonyId): Character {
  const character = CHARACTER_BY_ID[id as ManeSixPonyId];
  if (!character) {
    throw new Error(`Unknown character id: ${id}`);
  }
  return character;
}

export function isPlayableCharacterId(id: string): id is ManeSixPonyId {
  return (PONY_IDS as readonly string[]).includes(id);
}
