import { useState, useEffect } from "react";
import Page from "./Page.jsx";
import Back from "./Back.jsx";
import Front from "./Front.jsx";
import Top from "./Top.jsx";
import Bottom from "./Bottom.jsx";
import Left from "./Left.jsx";
import Right from "./Right.jsx";

const Book = (props) => {
  const [state, setState] = useState("stored");
  const { book, selected, setSelected } = props;

  if (!book) return null;

  const width = `${book.pages / 10}px`;
  const height = `${book.h}px`;

  useEffect(() => {
    let timerId;
    if (selected) {
      setState("side");
      timerId = setTimeout(() => setState("front"), 500);
    } else {
      setState("side");
      timerId = setTimeout(() => setState("stored"), 500);
    }
    return () => clearTimeout(timerId);
  }, [selected]);

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
        width,
        height,
      }}
    >
      <div
        className="w-full h-full preserve-3d"
        style={{
          transform: `translateZ(-${book.pages / 10 / 2}px)`,
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
            <Left {...props} />
            <Top {...props} />

            {state !== "stored" && (
              <>
                <Front {...{ ...props, state }} />
                <Page {...props} />
                <Back {...props} />
                <Right {...props} />
                <Bottom {...props} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
