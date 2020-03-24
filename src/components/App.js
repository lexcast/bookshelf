import React, { useState } from "react";
import Book from "./Book";
import books from "data";

const App = () => {
  const [selected, setSelected] = useState();

  return (
    <div className="relative font-serif">
      <div
        className="relative m-auto flex flex-col preserve-3d p-2"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 15%" }}
      >
        <div
          className="relative preserve-3d m-auto pt-20 px-20 flex justify-center items-baseline"
        >
          {Object.keys(books).map(isbn => (
            <div
              key={isbn}
              onClick={() => setSelected(isbn)}
              className="relative ml-px preserve-3d cursor-pointer"
              style={{
                width: `${books[isbn].pages / 10}px`,
                height: `${books[isbn].h}px`,
                transform: `translateZ(-${books[isbn].pages / 10 / 2}px)`
              }}
            >
              <Book
                isbn={isbn}
                book={books[isbn]}
                selected={selected === isbn}
              />
            </div>
          ))}
        </div>
        <div className="h-3 bg-wood">
          <div
            className="h-64 bg-wood preserve-3d"
            style={{
              transform: "rotateX(-90deg)",
              transformOrigin: "top"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
