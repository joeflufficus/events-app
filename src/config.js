// Single source of truth for environment-specific values.
// Swap to events-2 ... events-5 (or a local server) via VITE_API_BASE_URL.
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://rf-json-server.herokuapp.com/events";
