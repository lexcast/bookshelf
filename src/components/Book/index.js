import React, { useState } from "react";
import Page from "./Page";
import Back from "./Back";
import Front from "./Front";
import Top from "./Top";
import Bottom from "./Bottom";
import Left from "./Left";
import Right from "./Right";

const Book = props => {
  const [state, setState] = useState("front");
  const width = `${props.book.w}px`;
  const height = `${props.book.h}px`;

  return (
    <div
      onClick={() => {
        setState(
          state === "front"
            ? "inside"
            : state === "inside"
            ? "side"
            : state === "side"
            ? "back"
            : "front"
        );
      }}
      className="absolute preserve-3d t-transform"
      style={{
        width,
        height,
        transform:
          state === "inside"
            ? "translate3d(0,0,150px) rotate3d(0,1,0,0deg)"
            : state === "side"
            ? "translate3d(0,0,0px) rotate3d(0,1,0,90deg)"
            : state === "back"
            ? "translate3d(0,0,0px) rotate3d(0,1,0,180deg)"
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
  );
};

export default Book;
