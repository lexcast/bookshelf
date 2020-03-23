import React from "react";

const Bottom = ({ book }) => {
  const width = `${book.w - 5}px`;
  const depth = `${book.pages / 10}px`;
  const halfDepth = `${book.pages / 10 / 2}px`;

  return (
    <div
      className="absolute block backface-hidden bg-paper"
      style={{
        width,
        height: depth,
        top: `-${halfDepth}`,
        transform: `rotate3d(1,0,0,-90deg) translate3d(0,0,${book.h - 5}px)`
      }}
    />
  );
};

export default Bottom;
