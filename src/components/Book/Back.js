import React from "react";
import Barcode from "react-barcode";

const Back = ({ book }) => {
  const width = `${book.w}px`;
  const height = `${book.h}px`;
  const halfDepth = `${book.pages / 10 / 2}px`;
  const backgroundColor = book.bg;

  return (
    <div
      className="text-justify p-10 absolute block overflow-hidden"
      style={{
        fontSize: ".6rem",
        width,
        height,
        backgroundColor,
        color: book.text,
        transform: `rotate3d(0,1,0,-180deg) translate3d(0,0,${halfDepth})`,
        borderRadius: "3px 0 0 3px"
      }}
    >
      <h1 className="text-xs font-bold text-center">{book.title}</h1>
      <h2 className="text-xs text-center mb-2">{book.author}</h2>
      <p className="whitespace-pre-line">{book.sinopsis}</p>
      <div
        className="absolute bottom-0 right-0 mr-8 mb-3"
        style={{
          transform: "scale(.7)"
        }}
      >
        <Barcode
          value={`0${book.isbn.replace(/\D/g, "0")}0`}
          format="EAN13"
          width={1}
          height={25}
        />
      </div>
      <div
        className="after absolute top-0 bottom-0 left-auto"
        style={{
          right: "10px",
          width: "3px",
          background: "rgba(0,0,0,0.06)"
        }}
      />
    </div>
  );
};

export default Back;
