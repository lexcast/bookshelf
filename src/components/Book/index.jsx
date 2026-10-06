import { useState, useEffect } from "react";
import Page from "./Page.jsx";
import Back from "./Back.jsx";
import Front from "./Front.jsx";
import Top from "./Top.jsx";
import Bottom from "./Bottom.jsx";
import Left from "./Left.jsx";
import Right from "./Right.jsx";

const Book = ({ book, selected, setSelected }) => {
  const [state, setState] = useState("stored");
  const [prevSelected, setPrevSelected] = useState(selected);

  // Turn the book sideways whenever it gets selected or deselected
  if (selected !== prevSelected) {
    setPrevSelected(selected);
    setState("side");
  }

  // Once sideways, finish the movement: pull it out or put it back
  useEffect(() => {
    if (state !== "side") return;
    const timerId = setTimeout(
      () => setState(selected ? "front" : "stored"),
      500,
    );
    return () => clearTimeout(timerId);
  }, [state, selected]);

  // Spine thickness: 1px for every 10 pages
  const depth = Number(book.pages) / 10;
  const faceProps = { book, depth };

  const onClick = () => {
    if (!selected) {
      setSelected(book.isbn);
      return;
    }

    if (state === "front") {
      setState("inside");
    } else if (state === "inside") {
      setState("back");
    } else if (state === "back") {
      setSelected(null);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative ml-px cursor-pointer select-none ${selected ? "z-40" : "hover:z-30 z-10"
        }`}
      style={{
        width: `${depth}px`,
        height: `${book.h}px`,
      }}
    >
      <div
        className="w-full h-full preserve-3d"
        style={{
          transform: `translateZ(-${depth / 2}px)`,
        }}
      >
        <div
          className={
            "w-full h-full t-transform preserve-3d" +
            (state === "stored" ? " hover-pull" : "")
          }
          style={{
            transformOrigin: "bottom center",
            transform: state !== "stored" ? "translateZ(350px)" : "",
          }}
        >
          <div
            className="w-full h-full absolute preserve-3d t-transform"
            style={{
              transform:
                state === "inside"
                  ? "rotate3d(0,1,0,0deg)"
                  : state === "side" || state === "stored"
                    ? "rotate3d(0,1,0,90deg)"
                    : state === "back"
                      ? "rotate3d(0,1,0,180deg)"
                      : "",
            }}
          >
            <Left {...faceProps} />
            <Top {...faceProps} />

            {state !== "stored" && (
              <>
                <Front {...faceProps} state={state} />
                <Page {...faceProps} />
                <Back {...faceProps} />
                <Right {...faceProps} />
                <Bottom {...faceProps} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
