import { Link } from "react-router-dom";

export default function EventItem({ event, onEdit, onDelete }) {
  return (
    <li className="event" style={{ borderLeftColor: event.color || "gray" }}>
      <h3>
        <Link to={`/events/${event.id}`}>{event.name}</Link>
      </h3>
      <p>{event.description}</p>
      <p className="company">{event.company}</p>
      <div className="actions">
        <button onClick={() => onEdit(event)}>Edit</button>
        <button onClick={() => onDelete(event.id)}>Delete</button>
      </div>
    </li>
  );
}
