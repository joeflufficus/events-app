import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { eventsApi } from "../api/eventsApi";
import { Loader, ErrorMessage } from "../components/StatusMessage";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false; // avoid setting state after unmount / id change
    setEvent(null);
    setError(null);
    eventsApi
      .getById(id)
      .then((data) => !cancelled && setEvent(data))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <section>
      <Link to="/">← Back to events</Link>
      {error && <ErrorMessage message={error} />}
      {!event && !error && <Loader />}
      {event && (
        <article>
          <h2>{event.name}</h2>
          <p>{event.description}</p>
        </article>
      )}
    </section>
  );
}
