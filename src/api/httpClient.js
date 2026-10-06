import { API_BASE_URL } from "../config";

/** Error type carrying the HTTP status so callers can react to it. */
export class ApiError extends Error {
  constructor(message, status = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const messageForStatus = (status) => {
  if (status === 404) return "That event could not be found.";
  if (status >= 500) return "The server had a problem. Please try again later.";
  return `The request failed (status ${status}).`;
};

/**
 * Thin wrapper around fetch: JSON headers, one place for error normalisation.
 * Network failures and non-2xx responses both surface as ApiError.
 */
export async function request(path = "", options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: { "Content-Type": "application/json", ...options.headers },
    });
  } catch {
    throw new ApiError("Unable to reach the server. Check your connection.");
  }

  if (!response.ok) {
    throw new ApiError(messageForStatus(response.status), response.status);
  }

  // DELETE responses may have an empty body.
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}
