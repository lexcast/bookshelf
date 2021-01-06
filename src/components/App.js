import React, { useState } from "react";
import Book from "./Book";
import books from "data";

const CHUNK_SIZE = 18;
const chunks = books.reduce((resultArray, item, index) => {
  const chunkIndex = Math.floor(index / CHUNK_SIZE);

  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [];
  }

  resultArray[chunkIndex].push(item);

  return resultArray;
}, []);

const App = () => {
  const [selected, setSelected] = useState();
  const [chunk, setChunk] = useState(0);

  return (
    <div className="p-8 w-full h-full flex items-center justify-center flex-col">
      <div className="flex items-center justify-center">
        {chunks.map((c, i) => (
          <button
            key={i}
            onClick={() => setChunk(i)}
            className={
              "m-2 inline-block w-3 h-3 rounded-full opacity-50 cursor-pointer " +
              (chunk === i ? "bg-orange-600" : "bg-gray-800 hover:opacity-75")
            }
          />
        ))}
      </div>
      <div
        className="relative font-serif m-auto flex justify-center flex-col flex-wrap preserve-3d p-2"
        style={{ transform: "scale(.6)" }}
      >
        <div className="relative preserve-3d m-auto px-20 flex justify-center items-baseline">
          {chunks[chunk].map(book => (
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
