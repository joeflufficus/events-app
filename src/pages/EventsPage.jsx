import { useState } from "react";
import { useEvents } from "../hooks/useEvents";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import { Loader, ErrorMessage } from "../components/StatusMessage";

export default function EventsPage() {
  const { events, loading, error, actionError, reload, addEvent, editEvent, removeEvent } =
    useEvents();
  const [editing, setEditing] = useState(null);

  const handleEdit = async (values) => {
    await editEvent(editing, values);
    setEditing(null);
  };

  return (
    <>
      <section>
        <h2>{editing ? `Edit "${editing.name}"` : "Add an event"}</h2>
        {editing ? (
          <EventForm
            key={editing.id}
            initialValues={editing}
            submitLabel="Save changes"
            onSubmit={handleEdit}
            onCancel={() => setEditing(null)}
          />
        ) : (
          <EventForm onSubmit={addEvent} resetOnSuccess />
        )}
      </section>

      <section>
        <h2>Events</h2>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} onRetry={reload} />}
        {actionError && <ErrorMessage message={actionError} />}
        {!loading && !error && (
          <EventList events={events} onEdit={setEditing} onDelete={removeEvent} />
        )}
      </section>
    </>
  );
}
