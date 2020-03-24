import React from "react";
import Book from "./Book";
import books from "data";

const App = () => {
  return (
    <div className="relative font-serif">
      <div
        className="relative preserve-3d w-full p-20 flex justify-center items-baseline"
        style={{ perspective: "1800px", perspectiveOrigin: "50% 15%" }}
      >
        {Object.keys(books).map(isbn => (
          <div
            key={isbn}
            className="relative ml-px preserve-3d cursor-pointer"
            style={{
              width: `${books[isbn].pages / 10}px`,
              height: `${books[isbn].h}px`,
              transform: `translateZ(-${books[isbn].pages / 10 / 2}px)`
            }}
          >
            <Book isbn={isbn} book={books[isbn]} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
