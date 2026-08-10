import { FeedbackToken } from "./FeedbackToken";

type FeedbackLegendProps = {
  compact?: boolean;
};

export function FeedbackLegend({ compact = false }: FeedbackLegendProps) {
  return (
    <ul
      className={`feedback-legend${compact ? " feedback-legend--compact" : ""}`}
      aria-label="Обозначения подсказок"
    >
      <li className="feedback-legend__item">
        <FeedbackToken type="smile" size="legend" />
        <span>{compact ? "пони + место" : "Пони и место угаданы"}</span>
      </li>
      <li className="feedback-legend__item">
        <FeedbackToken type="wink" size="legend" />
        <span>{compact ? "пони есть, место другое" : "Пони есть в коде, место другое"}</span>
      </li>
      <li className="feedback-legend__item">
        <FeedbackToken type="oops" size="legend" />
        <span>{compact ? "пони нет" : "Совпадения нет"}</span>
      </li>
    </ul>
  );
}
