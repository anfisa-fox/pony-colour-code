import type { ManeSixPonyId } from "../game/config";

export type CharacterProfile = {
  harmonyElement: string;
  description: string;
  cutieMark: string;
};

export const CHARACTER_PROFILES: Record<ManeSixPonyId, CharacterProfile> = {
  twilight: {
    harmonyElement: "МАГИЯ",
    description:
      "Дружба объединяет разные качества и делает друзей сильнее вместе.",
    cutieMark: "/characters/cutie-marks/twilight.svg",
  },
  applejack: {
    harmonyElement: "ЧЕСТНОСТЬ",
    description:
      "Быть честным — значит говорить правду и быть другом, которому доверяют.",
    cutieMark: "/characters/cutie-marks/applejack.svg",
  },
  fluttershy: {
    harmonyElement: "ДОБРОТА",
    description:
      "Доброта — это заботиться о других и помогать тем, кому нужна поддержка.",
    cutieMark: "/characters/cutie-marks/fluttershy.svg",
  },
  pinkie: {
    harmonyElement: "СМЕХ",
    description: "Смех и хорошее настроение помогают друзьям радоваться вместе.",
    cutieMark: "/characters/cutie-marks/pinkie-pie.svg",
  },
  rainbow: {
    harmonyElement: "ВЕРНОСТЬ",
    description:
      "Верный друг остаётся рядом и не бросает друзей, когда им нужна помощь.",
    cutieMark: "/characters/cutie-marks/rainbow-dash.svg",
  },
  rarity: {
    harmonyElement: "ЩЕДРОСТЬ",
    description:
      "Щедрость — это делиться с другими и делать что-то хорошее для друзей.",
    cutieMark: "/characters/cutie-marks/rarity.svg",
  },
};

export function getCharacterProfile(id: ManeSixPonyId): CharacterProfile {
  return CHARACTER_PROFILES[id];
}
