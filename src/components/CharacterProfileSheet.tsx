import { useEffect, useId, useRef } from "react";

import { getCharacter } from "../data/characters";
import { getCharacterProfile } from "../data/characterProfiles";
import type { ManeSixPonyId } from "../game/config";

type CharacterProfileSheetProps = {
  ponyId: ManeSixPonyId | null;
  onClose: () => void;
};

export function CharacterProfileSheet({ ponyId, onClose }: CharacterProfileSheetProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ponyId) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, ponyId]);

  if (!ponyId) {
    return null;
  }

  const character = getCharacter(ponyId);
  const profile = getCharacterProfile(ponyId);

  return (
    <div className="character-profile-overlay" onClick={onClose}>
      <section
        className="character-profile-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="character-profile-sheet__header">
          <button
            ref={closeButtonRef}
            type="button"
            className="character-profile-sheet__close"
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </header>

        <div className="character-profile-sheet__body">
          <div className="character-profile-sheet__hero">
            <img
              className={`character-profile-sheet__figure${
                character.mirrored ? " character-profile-sheet__figure--mirrored" : ""
              }`}
              src={character.image}
              alt=""
              draggable={false}
            />
          </div>

          <h2 id={titleId} className="character-profile-sheet__name">
            {character.name}
          </h2>

          <img
            className="character-profile-sheet__cutie-mark"
            src={profile.cutieMark}
            alt=""
            draggable={false}
            aria-hidden="true"
          />

          <p className="character-profile-sheet__harmony">
            <span className="character-profile-sheet__harmony-label">Элемент гармонии:</span>{" "}
            {profile.harmonyElement}
          </p>

          <p className="character-profile-sheet__description">{profile.description}</p>
        </div>
      </section>
    </div>
  );
}
