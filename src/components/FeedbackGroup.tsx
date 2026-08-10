import { FeedbackToken } from "./FeedbackToken";
import { buildFeedbackSequence, feedbackGroupAriaLabel } from "./feedbackUtils";

type FeedbackGroupProps = {
  exact: number;
  partial: number;
};

export function FeedbackGroup({ exact, partial }: FeedbackGroupProps) {
  const tokens = buildFeedbackSequence(exact, partial);

  return (
    <div
      className="feedback-group"
      role="group"
      aria-label={feedbackGroupAriaLabel(exact, partial)}
    >
      {tokens.map((type, index) => (
        <FeedbackToken key={`${type}-${index}`} type={type} />
      ))}
    </div>
  );
}
