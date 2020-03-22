import React, { useState } from "react";
import Barcode from "react-barcode";

const Book = ({ book, isbn }) => {
  const [state, setState] = useState("front");
  const width = `${book.w}px`;
  const height = `${book.h}px`;
  const depth = `${book.pages / 10}px`;
  const halfDepth = `${book.pages / 10 / 2}px`;
  const oneLessHalfDepth = `${book.pages / 10 / 2 - 1}px`;
  const lessHalfDepth = `${book.pages / 10 / 2 - 5}px`;
  const backgroundColor = book.bg;

  return (
    <div
      onClick={() => {
        setState(
          state === "front" ? "inside" : state === "inside" ? "back" : "front"
        );
      }}
      className="absolute preserve-3d t-transform"
      style={{
        width,
        height,
        transform:
          state === "inside"
            ? "translate3d(0,0,150px) rotate3d(0,1,0,0deg)"
            : state === "back"
            ? "translate3d(0,0,0px) rotate3d(0,1,0,180deg)"
            : ""
      }}
    >
      <div
        className="bk-front preserve-3d absolute block t-transform z-30"
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
          className="bk-cover-back p-10 absolute block backface-hidden preserve-3d z-10"
          style={{
            width,
            height,
            backgroundColor,
            color: book.text,
            transform: "rotate3d(0,1,0,-179deg)",
            borderRadius: "3px 0 0 3px",
            boxShadow: "inset 4px 0 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <img
            className="mb-4 border-4 border-white"
            src={`/images/authors/${book.author_photo}`}
          />
          {book.author}
        </div>
        <div
          className="bk-cover absolute block backface-hidden preserve-3d z-10"
          style={{
            width,
            height,
            backgroundColor,
            borderRadius: "0 3px 3px 0",
            boxShadow: "inset 4px 0 10px rgba(0, 0, 0, 0.1)"
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
          />
          <div
            className="after absolute top-0 bottom-0"
            style={{
              left: "10px",
              width: "3px",
              background: "rgba(0,0,0,0.06)",
              boxShadow: "1px 0 3px rgba(255, 255, 255, 0.1)"
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
      <div
        className="bk-page absolute backface-hidden z-20 bg-paper"
        style={{
          transform: `translate3d(0,0,${oneLessHalfDepth})`,
          width: `${book.w - 5}px`,
          height: `${book.h - 10}px`,
          top: "5px"
        }}
      >
        <div
          className="bk-content absolute bg-paper backface-hidden"
          style={{
            top: "30px",
            left: "20px",
            bottom: "20px",
            right: "20px",
            padding: "30px"
          }}
        >
          <p
            className="drop-cap select-none antialiased text-xs leading-relaxed text-black text-justify"
            style={{
              padding: "0 0 10px"
            }}
          >
            {book.excerpt}
          </p>
        </div>
      </div>
      <div
        className="bk-back text-justify p-10 absolute block shadow-lg overflow-hidden"
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
      <div
        className="bk-right absolute block backface-hidden bg-paper"
        style={{
          width: depth,
          height: `${book.h - 10}px`,
          left: `-${halfDepth}`,
          top: "5px",
          transform: `rotate3d(0,1,0,90deg) translate3d(0,0,${book.w - 5}px)`
        }}
      ></div>
      <div
        className="bk-left absolute block"
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
      <div
        className="bk-top absolute block backface-hidden bg-paper"
        style={{
          width: `${book.w - 5}px`,
          height: depth,
          top: `-${lessHalfDepth}`,
          transform: "rotate3d(1,0,0,90deg)"
        }}
      ></div>
      <div
        className="bk-bottom absolute block backface-hidden bg-paper"
        style={{
          width: `${book.w - 5}px`,
          height: depth,
          top: `-${halfDepth}`,
          transform: `rotate3d(1,0,0,-90deg) translate3d(0,0,${book.h - 5}px)`
        }}
      ></div>
    </div>
  );
};

export default Book;
