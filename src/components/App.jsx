import { useState } from "react";
import Book from "./Book/index.jsx";
import books from "../data/index.json";

const CHUNK_SIZE = 20;

const chunks = Array.from({ length: Math.ceil(books.length / CHUNK_SIZE) }, (_, i) =>
  books.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE),
);

const App = () => {
  const [selected, setSelected] = useState(null);
  const [chunk, setChunk] = useState(0);

  const currentBooks = chunks[chunk] || [];

  return (
    <div className="p-8 w-full h-full flex items-center justify-center flex-col">
      {/* Paginador */}
      <div className="flex items-center justify-center mb-4">
        {chunks.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ir al estante ${i + 1}`}
            onClick={() => {
              setChunk(i);
              setSelected(null);
            }}
            className={`m-2 inline-block w-3 h-3 rounded-full opacity-50 cursor-pointer transition-colors ${chunk === i ? "bg-amber-600 opacity-100" : "bg-gray-800 hover:opacity-75"
              }`}
          />
        ))}
      </div>

      <div
        className="relative font-serif m-auto flex justify-center flex-col flex-wrap preserve-3d backface-hidden p-2 scale-60"
      >
        <div
          className="relative preserve-3d isolate will-change-transform m-auto px-20 flex justify-center items-baseline"
        >
          {currentBooks.map((book) => (
            <Book
              key={book.isbn}
              book={book}
              selected={selected === book.isbn}
              setSelected={setSelected}
            />
          ))}
        </div>

        <div className="h-3 bg-wood preserve-3d -translate-z-px">
          <div className="h-64 bg-wood preserve-3d -rotate-x-90 origin-top" />
        </div>
      </div>
    </div>
  );
};

export default App;
