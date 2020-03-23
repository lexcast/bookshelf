import React from "react";

const Left = ({ book }) => {
  const width = `${book.w}px`;
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
        transform: "rotate3d(0,1,0,-90deg)"
      }}
    >
      <h2
        className="text-xs"
        style={{
          width,
          height: depth,
          color: book.text,
          transformOrigin: "0 0",
          transform: "rotate(90deg) translateY(-40px)"
        }}
      >
        <span>{book.author}</span>
        <span>{book.title}</span>
      </h2>
    </div>
  );
};

export default Left;
