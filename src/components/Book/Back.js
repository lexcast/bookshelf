import React from "react";
import Barcode from "react-barcode";

const Back = ({ book, isbn }) => {
  const width = `${book.w}px`;
  const height = `${book.h}px`;
  const halfDepth = `${book.pages / 10 / 2}px`;
  const backgroundColor = book.bg;

  return (
    <div
      className="text-justify p-10 absolute block shadow-lg overflow-hidden"
      style={{
        fontSize: ".4rem",
        width,
        height,
        backgroundColor,
        color: book.text,
        transform: `rotate3d(0,1,0,-180deg) translate3d(0,0,${halfDepth})`,
        borderRadius: "3px 0 0 3px"
      }}
    >
      <h1 className="text-xs font-bold text-center">{book.title}</h1>
      <h2 className="text-xs text-center">{book.author}</h2>
      <p>{book.sinopsis}</p>
      <div
        className="absolute bottom-0 right-0 m-8"
        style={{
          transform: "scale(.8)"
        }}
      >
        <Barcode value={`0${isbn}0`} format="EAN13" width={1} height={25} />
      </div>
      <div
        className="after absolute top-0 bottom-0 left-auto"
        style={{
          right: "10px",
          width: "3px",
          background: "rgba(0,0,0,0.06)",
          boxShadow: "1px 0 3px rgba(255, 255, 255, 0.1)"
        }}
      />
    </div>
  );
};

export default Back;
