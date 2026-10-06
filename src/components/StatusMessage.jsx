export function Loader({ label = "Loading…" }) {
  return <p role="status">{label}</p>;
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="error">
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Try again</button>}
    </div>
  );
}
