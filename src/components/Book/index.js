import React, { useState, useEffect } from "react";
import Page from "./Page";
import Back from "./Back";
import Front from "./Front";
import Top from "./Top";
import Bottom from "./Bottom";
import Left from "./Left";
import Right from "./Right";

const Book = props => {
  const [state, setState] = useState("stored");
  const { book, selected, setSelected } = props;
  const width = `${book.pages / 10}px`;
  const height = `${book.h}px`;

  useEffect(() => {
    if (selected) {
      setState("side");
      setTimeout(() => setState("front"), 500);
    }

    return () => {
      setState("side");
      setTimeout(() => setState("stored"), 500);
    };
  }, [selected]);

  const onClick = () => {
    if (!selected) {
      setSelected(book.isbn);
      return;
    }

    setState(state === "front" ? "inside" : "back");

    if (state === "back") {
      setSelected(null);
    }
  };

  return (
    <div
      onClick={onClick}
      className="relative ml-px preserve-3d cursor-pointer select-none"
      style={{
        width,
        height,
        transform: `translateZ(-${book.pages / 10 / 2}px)`
      }}
    >
      <div
        className={
          "t-transform preserve-3d" + (state === "stored" ? " hover-pull" : "")
        }
        style={{
          width,
          height,
          transformOrigin: "bottom",
          transform: state !== "stored" ? "translateZ(350px)" : ""
        }}
      >
        <div
          className="absolute preserve-3d t-transform"
          style={{
            width,
            height,
            transform:
              state === "inside"
                ? "rotate3d(0,1,0,0deg)"
                : state === "side" || state === "stored"
                ? "rotate3d(0,1,0,90deg)"
                : state === "back"
                ? "rotate3d(0,1,0,180deg)"
                : ""
          }}
        >
          <Front {...{ ...props, state }} />
          <Page {...props} />
          <Back {...props} />
          <Left {...props} />
          <Right {...props} />
          <Top {...props} />
          <Bottom {...props} />
        </div>
      </div>
    </div>
  );
};

export default Book;
