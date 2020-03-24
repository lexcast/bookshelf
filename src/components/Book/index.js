import React, { useState } from "react";
import Page from "./Page";
import Back from "./Back";
import Front from "./Front";
import Top from "./Top";
import Bottom from "./Bottom";
import Left from "./Left";
import Right from "./Right";

const Book = props => {
  const [state, setState] = useState("side");
  const width = `${props.book.pages / 10}px`;
  const height = `${props.book.h}px`;

  return (
    <div
      className={
        "t-transform preserve-3d" + (props.selected ? "" : " hover-pull")
      }
      style={{
        width,
        height,
        transform: props.selected ? "translateZ(350px)" : ""
      }}
    >
      <div
        onClick={() => {
          setState(
            state === "side"
              ? "front"
              : state === "front"
              ? "inside"
              : state === "inside"
              ? "back"
              : "side"
          );
        }}
        className={
          "absolute preserve-3d " +
          (state === "front" ? "t-transform-wait" : "t-transform")
        }
        style={{
          width,
          height,
          transform:
            state === "inside"
              ? "rotate3d(0,1,0,0deg)"
              : state === "side"
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
  );
};

export default Book;
