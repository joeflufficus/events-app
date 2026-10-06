import { Link, Route, Routes } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";

export default function App() {
  return (
    <main>
      <header>
        <h1><Link to="/">Events</Link></h1>
      </header>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="*" element={<p>Page not found.</p>} />
      </Routes>
    </main>
  );
}
