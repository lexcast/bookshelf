import React from "react";

const Left = ({ book }) => {
  const height = `${book.h}px`;
  const depth = `${book.pages / 10}px`;
  const halfDepth = `${book.pages / 10 / 2}px`;
  const backgroundColor = book.bg;

  return (
    <div
      className="absolute block"
      style={{
        backgroundColor,
        width: depth,
        height,
        left: `-${halfDepth}`,
        transform: "rotateY(90deg) rotateX(-180deg)"
      }}
    >
      <div
        className="text-xs flex items-center"
        style={{
          width: height,
          height: depth,
          color: book.text,
          transformOrigin: "0 100%",
          transform: "rotate(90deg)"
        }}
      >
        <span className="uppercase font-sans">{book.author}</span>
        <span className="font-semibold ml-2">{book.title}</span>
      </div>
    </div>
  );
};

export default Left;
