import EventItem from "./EventItem";

export default function EventList({ events, onEdit, onDelete }) {
  if (events.length === 0) {
    return <p>No events yet. Add one using the form.</p>;
  }
  return (
    <ul className="event-list">
      {events.map((event) => (
        <EventItem key={event.id} event={event} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </ul>
  );
}
