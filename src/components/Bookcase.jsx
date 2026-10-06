import { useEffect, useRef, useState } from "react";
import Book from "./Book/index.jsx";

const SCALE = 0.6;
// Horizontal padding of each shelf (px-20) plus the 1px gap between books
const SHELF_PADDING = 160;
const BOOK_GAP = 1;

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
    <div ref={ref} className="w-full px-2 md:px-12 lg:px-24 2xl:px-48">
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
