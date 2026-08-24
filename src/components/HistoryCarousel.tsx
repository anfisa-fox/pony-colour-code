import { useCallback, useEffect, useRef, useState } from "react";

import { GuessRow } from "./GuessRow";
import type { GameMode } from "../game/types";
import type { GuessRecord } from "../game/sessionTypes";

type HistoryCarouselProps = {
  history: GuessRecord[];
  gameMode: GameMode;
};

export function HistoryCarousel({ history, gameMode }: HistoryCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const previousHistoryLengthRef = useRef(history.length);
  const [activeIndex, setActiveIndex] = useState(Math.max(0, history.length - 1));

  const total = history.length;
  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < total - 1;

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const slide = track.children[index] as HTMLElement | undefined;
    if (!slide) {
      return;
    }

    const targetLeft = slide.offsetLeft;
    track.scrollTo({ left: targetLeft, behavior });
  }, []);

  const syncActiveIndexFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track || track.children.length === 0) {
      return;
    }

    const firstSlide = track.children[0] as HTMLElement;
    const slideWidth = firstSlide.offsetWidth;
    if (slideWidth <= 0) {
      return;
    }

    const index = Math.min(
      track.children.length - 1,
      Math.max(0, Math.round(track.scrollLeft / slideWidth)),
    );

    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (history.length === 0) {
      setActiveIndex(0);
      previousHistoryLengthRef.current = 0;
      return;
    }

    if (history.length > previousHistoryLengthRef.current) {
      const newestIndex = history.length - 1;
      setActiveIndex(newestIndex);
      requestAnimationFrame(() => {
        scrollToIndex(newestIndex, "smooth");
      });
    } else if (activeIndex > history.length - 1) {
      const newestIndex = history.length - 1;
      setActiveIndex(newestIndex);
      requestAnimationFrame(() => {
        scrollToIndex(newestIndex, "auto");
      });
    }

    previousHistoryLengthRef.current = history.length;
  }, [activeIndex, history.length, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.addEventListener("scroll", syncActiveIndexFromScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", syncActiveIndexFromScroll);
    };
  }, [syncActiveIndexFromScroll, total]);

  function goPrev() {
    if (!canGoPrev) {
      return;
    }
    scrollToIndex(activeIndex - 1);
  }

  function goNext() {
    if (!canGoNext) {
      return;
    }
    scrollToIndex(activeIndex + 1);
  }

  return (
    <section
      className="game-section game-section--history history-carousel game-layout__history game-layout__history--mobile"
      aria-labelledby="history-carousel-heading"
    >
      <div className="history-carousel__header">
        <h2 id="history-carousel-heading" className="section-heading">
          История
        </h2>
        {total > 0 ? (
          <p className="history-carousel__indicator" aria-live="polite">
            Попытка {activeIndex + 1} из {total}
          </p>
        ) : null}
      </div>

      {total === 0 ? (
        <p className="empty-note history-carousel__empty">Пока нет подтверждённых попыток.</p>
      ) : (
        <div className="history-carousel__viewport">
          <button
            type="button"
            className="history-carousel__nav history-carousel__nav--prev"
            onClick={goPrev}
            disabled={!canGoPrev}
            aria-label="Предыдущая попытка"
          >
            ‹
          </button>

          <div
            ref={trackRef}
            className="history-carousel__track"
            role="list"
            aria-label="История попыток"
          >
            {history.map((record, index) => (
              <div
                key={`carousel-${index}-${record.guess.join("-")}`}
                className="history-carousel__slide"
                role="listitem"
                aria-hidden={index !== activeIndex}
              >
                <GuessRow
                  record={record}
                  attemptNumber={index + 1}
                  gameMode={gameMode}
                  variant="carousel"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="history-carousel__nav history-carousel__nav--next"
            onClick={goNext}
            disabled={!canGoNext}
            aria-label="Следующая попытка"
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
