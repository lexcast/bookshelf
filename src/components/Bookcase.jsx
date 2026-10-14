import { useEffect, useRef, useState } from "react";
import Book from "./Book/index.jsx";

const SCALE = 0.6;
// Horizontal padding of each shelf (px-20) plus the 1px gap between books
const SHELF_PADDING = 160;
const BOOK_GAP = 1;
// Time a book takes to go back on its shelf: turn sideways, then slide in
const PUT_BACK_MS = 1000;

const bookSize = (book) => Number(book.pages) / 10 + BOOK_GAP;

// Fill each shelf from left to right and continue on the next one
const fillShelves = (books, width) => {
  const shelves = [];
  let shelf = [];
  let used = 0;

  for (const book of books) {
    const size = bookSize(book);
    if (shelf.length && used + size > width) {
      shelves.push(shelf);
      shelf = [];
      used = 0;
    }
    shelf.push(book);
    used += size;
  }
  if (shelf.length) shelves.push(shelf);

  return shelves;
};

// Use as many shelves as filling them needs, but spread the books evenly
// across them: find the narrowest width that still fits in that many shelves
const packShelves = (books, width) => {
  const count = fillShelves(books, width).length;
  if (count <= 1) return fillShelves(books, width);

  let low = Math.max(...books.map(bookSize));
  let high = width;
  while (high - low > 1) {
    const middle = (low + high) / 2;
    if (fillShelves(books, middle).length <= count) high = middle;
    else low = middle;
  }

  return fillShelves(books, high);
};

const Bookcase = ({ books, selected, view, onActivate }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);
  // The open book's shelf stays on top until the book is back in place
  const [lifted, setLifted] = useState(selected);

  if (selected && selected !== lifted) setLifted(selected);

  useEffect(() => {
    if (selected) return;
    const timerId = setTimeout(() => setLifted(null), PUT_BACK_MS);
    return () => clearTimeout(timerId);
  }, [selected]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const shelves = width ? packShelves(books, width / SCALE - SHELF_PADDING) : [];

  return (
    <div ref={ref} className="relative z-10 w-full px-2 md:px-12 lg:px-24 2xl:px-48">
      <div className="relative font-serif flex flex-col gap-24" style={{ zoom: SCALE }}>
        {shelves.map((shelf, i) => {
          // Each shelf is flattened, so they stack in page order; lift the one
          // holding the open book, and its books over the plank, so nothing
          // painted later covers the book. A book tilted on hover also comes
          // out over the plank
          const open = shelf.some((book) => book.isbn === lifted);
          return (
            <div key={i} className={`relative ${open ? "z-20" : ""}`}>
              <div
                className={`relative preserve-3d isolate will-change-transform shelf-row px-20 flex justify-center items-baseline ${open ? "z-10" : ""}`}
              >
                {shelf.map((book) => (
                  <Book
                    key={book.isbn}
                    book={book}
                    selected={selected === book.isbn}
                    dimmed={selected && selected !== book.isbn}
                    view={view}
                    onActivate={onActivate}
                  />
                ))}
              </div>

              <div className={`h-6 bg-wood shelf-edge dimmable preserve-3d -translate-z-px ${selected ? "dimmed" : ""}`}>
                <div className="h-64 bg-wood preserve-3d -rotate-x-90 origin-top" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Bookcase;
