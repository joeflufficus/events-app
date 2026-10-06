import { request } from "./httpClient";

// Fields the app edits. Everything else on an event is preserved on update.
const pickEditable = ({ name, description, company, color }) => ({
  name,
  description,
  company,
  color,
});

export const eventsApi = {
  getAll: () => request(),

  getById: (id) => request(`/${id}`),

  create: (values) =>
    request("", {
      method: "POST",
      body: JSON.stringify({
        ...pickEditable(values),
        isActive: true,
        createdOn: new Date().toISOString(),
      }),
    }),

  // PUT replaces the whole record, so merge edits into the existing event.
  update: (existing, values) =>
    request(`/${existing.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...existing, ...pickEditable(values) }),
    }),

  remove: (id) => request(`/${id}`, { method: "DELETE" }),
};
