import { getCharacter } from "../data/characters";
import type { ManeSixPonyId } from "../game/config";

const EXAMPLE_SECRET: ManeSixPonyId[] = [
  "twilight",
  "rarity",
  "applejack",
  "fluttershy",
];

const EXAMPLE_GUESS: ManeSixPonyId[] = [
  "rarity",
  "twilight",
  "applejack",
  "pinkie",
];

type ExampleLineProps = {
  label: string;
  ponyIds: ManeSixPonyId[];
};

function ExamplePonyLine({ label, ponyIds }: ExampleLineProps) {
  return (
    <div className="start-example__row">
      <span className="start-example__label">{label}</span>
      <div className="start-example__ponies">
        {ponyIds.map((ponyId, index) => {
          const character = getCharacter(ponyId);
          return (
            <img
              key={`${label}-${ponyId}-${index}`}
              className={`start-example__pony${
                character.mirrored ? " start-example__pony--mirrored" : ""
              }`}
              src={character.image}
              alt=""
              draggable={false}
            />
          );
        })}
      </div>
    </div>
  );
}

export function GameExample() {
  return (
    <section
      className="start-example"
      aria-label="Пример: секрет и попытка"
    >
      <div className="start-example__rows" aria-hidden="true">
        <ExamplePonyLine label="Секрет" ponyIds={EXAMPLE_SECRET} />
        <ExamplePonyLine label="Попытка" ponyIds={EXAMPLE_GUESS} />
      </div>
    </section>
  );
}
