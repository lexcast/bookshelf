import React, { useState } from "react";
import Book from "./Book";
import books from "data";

const App = () => {
  const [selected, setSelected] = useState();

  return (
    <div className="relative font-serif" style={{ width: "fit-content" }}>
      <div
        className="relative m-auto flex flex-col flex-wrap preserve-3d p-2"
        style={{
          perspective: "1800px",
          perspectiveOrigin: "50% 15%",
          transform: "scale(.6)"
        }}
      >
        <div className="relative preserve-3d m-auto pt-20 px-20 flex justify-center items-baseline">
          {books.map(book => (
            <Book
              key={book.isbn}
              book={book}
              selected={selected === book.isbn}
              setSelected={setSelected}
            />
          ))}
        </div>
        <div
          className="h-3 bg-wood preserve-3d"
          style={{ transform: "translateZ(-1px)" }}
        >
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
