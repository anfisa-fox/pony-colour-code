type MyWorldLinkProps = {
  className?: string;
};

/** Navigation back to My World — URL wired when deployment integration is ready. */
export function MyWorldLink({ className = "" }: MyWorldLinkProps) {
  return (
    <span
      className={`my-world-link${className ? ` ${className}` : ""}`}
      aria-disabled="true"
    >
      ← Вернуться в My World
    </span>
  );
}
