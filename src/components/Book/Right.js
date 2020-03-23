import React from "react";

const Right = ({ book }) => {
  const height = `${book.h - 10}px`;
  const width = `${book.pages / 10}px`;
  const halfDepth = `${book.pages / 10 / 2}px`;

  return (
    <div
      className="absolute block backface-hidden bg-paper"
      style={{
        width,
        height,
        left: `-${halfDepth}`,
        top: "5px",
        transform: `rotate3d(0,1,0,90deg) translate3d(0,0,${book.w - 5}px)`
      }}
    />
  );
};

export default Right;
