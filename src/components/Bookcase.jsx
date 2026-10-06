import { useEffect, useRef, useState } from "react";
import Book from "./Book/index.jsx";

const SCALE = 0.6;
// Horizontal padding of each shelf (px-20) plus the 1px gap between books
const SHELF_PADDING = 160;
const BOOK_GAP = 1;

// Fill each shelf from left to right and continue on the next one
const packShelves = (books, width) => {
  const shelves = [];
  let shelf = [];
  let used = 0;

  for (const book of books) {
    const size = Number(book.pages) / 10 + BOOK_GAP;
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

const Bookcase = ({ books, selected, setSelected }) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const shelves = width ? packShelves(books, width / SCALE - SHELF_PADDING) : [];

  return (
    <div ref={ref} className="w-full">
      <div
        className="relative font-serif flex flex-col gap-24 preserve-3d backface-hidden"
        style={{ zoom: SCALE }}
      >
        {shelves.map((shelf, i) => (
          <div key={i} className="preserve-3d">
            <div className="relative preserve-3d isolate will-change-transform px-20 flex justify-center items-baseline">
              {shelf.map((book) => (
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
        ))}
      </div>
    </div>
  );
};

export default Bookcase;
