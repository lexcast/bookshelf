import { useMemo, useState } from "react";
import Bookcase from "./Bookcase.jsx";
import Controls from "./Controls.jsx";
import books from "../data/index.js";
import { filterBooks, filterOptions, sortBooks } from "../lib/books.js";

const options = filterOptions(books);
const NO_FILTERS = { query: "", author: "", country: "", era: "", sort: "shelf" };

const App = () => {
  const [selected, setSelected] = useState(null);
  const [filters, setFilters] = useState(NO_FILTERS);

  const visible = useMemo(
    () => sortBooks(filterBooks(books, filters), filters.sort),
    [filters],
  );

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
      <Controls
        filters={filters}
        setFilter={setFilter}
        options={options}
        count={visible.length}
        total={books.length}
        onClear={clear}
      />

      {visible.length ? (
        <Bookcase books={visible} selected={selected} setSelected={setSelected} />
      ) : (
        <p className="font-serif text-stone-600">Ningún libro coincide con la búsqueda.</p>
      )}
    </div>
  );
};

export default App;
