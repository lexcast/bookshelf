import React from "react";

const Front = ({ book, state }) => {
  const width = `${book.w}px`;
  const height = `${book.h}px`;
  const halfDepth = `${book.pages / 10 / 2}px`;
  const backgroundColor = book.bg;

  return (
    <div
      className="preserve-3d absolute block t-transform z-30"
      style={{
        transformOrigin: "0% 50%",
        transform:
          state === "inside"
            ? `translate3d(0,0,${halfDepth}) rotate3d(0,1,0,-160deg)`
            : `translate3d(0,0,${halfDepth})`,
        width,
        height,
        borderRadius: "0 3px 3px 0"
      }}
    >
      <div
        className="p-10 flex items-center justify-start flex-col absolute text-center block backface-hidden preserve-3d z-10"
        style={{
          width,
          height,
          backgroundColor,
          color: book.text,
          transform: "rotate3d(0,1,0,-180deg)",
          borderRadius: "3px 0 0 3px"
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-start">
          <img
            className="w-32 mb-4 border-4 border-white"
            src={`/images/authors/${book.author_photo}`}
            alt={book.author}
          />
          <h1>{book.author}</h1>
        </div>
        <h3 className="text-xs font-thin">{book.publisher}</h3>
      </div>
      <div
        className="absolute block backface-hidden preserve-3d z-10"
        style={{
          width,
          height,
          backgroundColor,
          borderRadius: "0 3px 3px 0"
        }}
      >
        <img
          className="backface-hidden preserve-3d"
          style={{
            width,
            height,
            borderRadius: "0 3px 3px 0"
          }}
          src={`/images/covers/${book.cover}`}
          alt={book.title}
        />
        <div
          className="after absolute top-0 bottom-0"
          style={{
            left: "10px",
            width: "3px",
            background: "rgba(0,0,0,0.06)"
          }}
        />
      </div>
      <div
        className="after absolute w-px"
        style={{
          backgroundColor,
          top: "1px",
          bottom: "1px",
          left: "-1px"
        }}
      />
    </div>
  );
};

export default Front;
