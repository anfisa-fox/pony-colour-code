import { FeedbackToken } from "./FeedbackToken";
import type { GameMode } from "../game/types";

type FeedbackLegendProps = {
  compact?: boolean;
  gameMode?: GameMode;
};

export function FeedbackLegend({
  compact = false,
  gameMode = "beginner",
}: FeedbackLegendProps) {
  const isBeginner = gameMode === "beginner";

  return (
    <div className="feedback-legend-block">
      <ul
        className={`feedback-legend${compact ? " feedback-legend--compact" : ""}`}
        aria-label="Обозначения подсказок"
      >
        <li className="feedback-legend__item">
          <FeedbackToken type="smile" size="legend" />
          <span>
            {isBeginner
              ? compact
                ? "на месте"
                : "Пони на правильном месте"
              : compact
                ? "пони + место"
                : "Пони и место угаданы"}
          </span>
        </li>
        <li className="feedback-legend__item">
          <FeedbackToken type="wink" size="legend" />
          <span>
            {isBeginner
              ? compact
                ? "есть, но в другом месте"
                : "Пони есть в коде, но в другом месте"
              : compact
                ? "пони есть, место другое"
                : "Пони есть в коде, место другое"}
          </span>
        </li>
        <li className="feedback-legend__item">
          <FeedbackToken type="oops" size="legend" />
          <span>
            {isBeginner
              ? compact
                ? "нет"
                : "Такой пони нет в коде"
              : compact
                ? "пони нет"
                : "Совпадения нет"}
          </span>
        </li>
      </ul>

      {compact ? (
        <p className="feedback-legend__note">
          {isBeginner
            ? "Каждая пони получает свою подсказку."
            : "Подсказки показывают результат всей попытки, а не отдельных позиций."}
        </p>
      ) : null}
    </div>
  );
}
