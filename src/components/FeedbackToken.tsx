import type { FeedbackType } from "./feedbackUtils";
import { FEEDBACK_IMAGES, FEEDBACK_LABELS } from "./feedbackUtils";

type FeedbackTokenProps = {
  type: FeedbackType;
  size?: "history" | "legend";
};

export function FeedbackToken({ type, size = "history" }: FeedbackTokenProps) {
  return (
    <span
      className={`feedback-token feedback-token--${type} feedback-token--${size}`}
      role="img"
      aria-label={FEEDBACK_LABELS[type]}
    >
      <img
        className="feedback-token__image"
        src={FEEDBACK_IMAGES[type]}
        alt=""
        draggable={false}
      />
    </span>
  );
}
