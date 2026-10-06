import { useCallback, useEffect, useMemo, useState } from "react";
import { eventsApi } from "../api/eventsApi";
import { sortByCompany } from "../utils/sortEvents";

/**
 * Owns the events collection: loading, CRUD, and error state.
 * - `error` is a load failure (replaces the list, offers retry).
 * - `actionError` is a delete failure (shown alongside the list).
 * - add/edit throw so the form that called them can show its own message.
 */
export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setEvents(await eventsApi.getAll());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addEvent = async (values) => {
    const created = await eventsApi.create(values);
    setEvents((prev) => [...prev, created]);
  };

  const editEvent = async (existing, values) => {
    const updated = await eventsApi.update(existing, values);
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  const removeEvent = async (id) => {
    setActionError(null);
    try {
      await eventsApi.remove(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      setActionError(err.message);
    }
  };

  // Sorting is derived state: always recomputed from the source list.
  const sortedEvents = useMemo(() => sortByCompany(events), [events]);

  return {
    events: sortedEvents,
    loading,
    error,
    actionError,
    reload: load,
    addEvent,
    editEvent,
    removeEvent,
  };
}
