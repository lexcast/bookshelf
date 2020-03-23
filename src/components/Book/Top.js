import React from "react";

const Book = ({ book }) => {
  const width = `${book.w - 5}px`;
  const height = `${book.pages / 10}px`;
  const lessHalfDepth = `${book.pages / 10 / 2 - 5}px`;

  return (
    <div
      className="bk-top absolute block backface-hidden bg-paper"
      style={{
        width,
        height,
        top: `-${lessHalfDepth}`,
        transform: "rotate3d(1,0,0,90deg)"
      }}
    />
  );
};

export default Book;
