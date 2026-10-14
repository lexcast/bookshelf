import { useEffect, useMemo, useState } from "react";
import Bookcase from "./Bookcase.jsx";
import BookNav from "./BookNav.jsx";
import Controls from "./Controls.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import books from "../data/index.js";
import { filterBooks, filterOptions, sortBooks } from "../lib/books.js";
import { stepView } from "../lib/views.js";

const options = filterOptions(books);
const NO_FILTERS = { query: "", author: "", country: "", era: "", sort: "shelf" };

const App = () => {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("front");
  const [filters, setFilters] = useState(NO_FILTERS);

  const visible = useMemo(
    () => sortBooks(filterBooks(books, filters), filters.sort),
    [filters],
  );

  const close = () => setSelected(null);

  // Move to the previous or next face, putting the book back after the last one
  const step = (delta) => {
    const next = stepView(view, delta);
    if (next) setView(next);
    else if (delta > 0) close();
  };

  // Clicking a stored book pulls it out, clicking the open one turns it and
  // clicking any other one while a book is open just puts that one back
  const activate = (isbn) => {
    if (selected === isbn) step(1);
    else if (selected) close();
    else {
      setSelected(isbn);
      setView("front");
    }
  };

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelected(null);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const next = stepView(view, e.key === "ArrowRight" ? 1 : -1);
        if (next) setView(next);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected, view]);

  // A filter change can hide the open book, so close it
  const setFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setSelected(null);
  };

  const clear = () => {
    setFilters((current) => ({ ...NO_FILTERS, sort: current.sort }));
    setSelected(null);
  };

  return (
    <div className="w-full min-h-full px-4 py-8 flex flex-col items-center gap-16">
      <header className="w-full max-w-5xl flex flex-col gap-5">
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-serif text-3xl font-semibold tracking-tight">Bookshelf</h1>
          <ThemeToggle />
        </div>
        <Controls
          filters={filters}
          setFilter={setFilter}
          options={options}
          count={visible.length}
          total={books.length}
          onClear={clear}
        />
      </header>

      {visible.length ? (
        <Bookcase
          books={visible}
          selected={selected}
          view={view}
          onActivate={activate}
        />
      ) : (
        <p className="font-serif italic text-muted">Ningún libro coincide con la búsqueda.</p>
      )}

      {selected && (
        <>
          {/* Dims the page; the bookcase sits above it and dims its own books */}
          <div className="fixed inset-0 z-5 bg-black/55 animate-fade-in" onClick={close} />
          <BookNav view={view} onStep={step} onClose={close} />
        </>
      )}
    </div>
  );
};

export default App;
