# Events app

React + react-router + fetch. CRUD for events, sorted by company.

## Run
```
npm install
npm run dev
```
The original `herokuapp.com` endpoints were hosted on Heroku's free tier, which no longer exists.
To run against a local stand-in:
```
cp .env.example .env
npm run server   # json-server on :3001, uses db.json
npm run dev
```
To use a different endpoint, set `VITE_API_BASE_URL` (e.g. `.../events-3`).

## Structure
```
src/
  config.js            API base URL, one place to change
  api/
    httpClient.js      fetch wrapper: JSON headers, ApiError, status -> message
    eventsApi.js       getAll / getById / create / update / remove
  hooks/useEvents.js   collection state, CRUD, loading + error state, sorting
  utils/
    validation.js      pure validation + web-safe color list
    sortEvents.js      pure sort by company
  components/          EventList, EventItem, EventForm, StatusMessage
  pages/               EventsPage (list + form), EventDetailPage (route)
```

## Design decisions
- **Layers don't leak.** Components never call fetch; they use the hook, and the hook uses the API module.
- **Errors are normalised once** in `httpClient` (network failure and non-2xx both become `ApiError`), then surfaced at the right level: load errors replace the list with a retry button, delete errors show beside the list, add/edit errors show inside the form.
- **Validation is pure and separate** from the UI. The form shows field errors and blocks submission.
- **Sorting is derived state** (`useMemo`), so additions and edits stay sorted without extra logic.
- **PUT merges** edits into the existing record, since PUT replaces the whole resource.
- **One form for add and edit**, configured by props.
- **Detail view is a route** (`/events/:id`) that fetches the single event, with a cancel guard against stale updates.
- Styling is intentionally minimal.
