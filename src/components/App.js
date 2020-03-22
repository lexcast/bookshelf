import React from "react";
import Book from "./Book";
import books from "data";

const App = () => {
  return (
    <div
      className="relative flex items-center justify-start p-40 font-serif text-center bg-gray-200 w-screen h-screen"
      style={{ perspective: "1800px" }}
    >
      {Object.keys(books).map(isbn => (
        <div key={isbn} className="flex-1 relative">
          <Book isbn={isbn} book={books[isbn]} />
        </div>
      ))}
    </div>
  );
};

export default App;
