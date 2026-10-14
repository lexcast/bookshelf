import { useState, useEffect, useRef } from "react";
import Page from "./Page.jsx";
import Back from "./Back.jsx";
import Front from "./Front.jsx";
import Top from "./Top.jsx";
import Bottom from "./Bottom.jsx";
import Left from "./Left.jsx";
import Right from "./Right.jsx";

// How much the open book may grow, so its text is readable despite the shelf zoom
const MAX_OPEN_SCALE = 2;

// Scale and shift that bring the open book to the middle of the viewport, as
// large as fits once opened (two covers wide) while leaving room for the nav
const fitToViewport = (element, book) => {
  const rect = element.getBoundingClientRect();
  const zoom = rect.height / book.h;
  const scale = Math.min(
    MAX_OPEN_SCALE,
    (innerHeight - 160) / rect.height,
    (innerWidth * 0.94) / (2 * book.w * zoom),
  );
  // It grows upwards from the shelf, so its middle ends up above the bottom
  const middle = rect.bottom - (rect.height * scale) / 2;
  return {
    scale,
    x: (innerWidth / 2 - (rect.left + rect.width / 2)) / zoom,
    y: (innerHeight / 2 - 40 - middle) / zoom,
  };
};

const ROTATION = {
  stored: "rotate3d(0,1,0,90deg)",
  side: "rotate3d(0,1,0,90deg)",
  front: "",
  inside: "rotate3d(0,1,0,0deg)",
  back: "rotate3d(0,1,0,180deg)",
};

const Book = ({ book, selected, dimmed, view, onActivate }) => {
  const ref = useRef(null);
  // stored on the shelf, side while moving in or out, out once facing the reader
  const [state, setState] = useState("stored");
  const [prevSelected, setPrevSelected] = useState(selected);
  const [placement, setPlacement] = useState(null);

  // Turn the book sideways whenever it gets selected or deselected
  if (selected !== prevSelected) {
    setPrevSelected(selected);
    setState("side");
  }

  // Once sideways, finish the movement: pull it out or put it back
  useEffect(() => {
    if (state !== "side") return;
    const timerId = setTimeout(() => {
      if (selected) setPlacement(fitToViewport(ref.current, book));
      setState(selected ? "out" : "stored");
    }, 500);
    return () => clearTimeout(timerId);
  }, [state, selected, book]);

  // Spine thickness: 1px for every 10 pages
  const depth = Number(book.pages) / 10;
  const face = state === "out" ? view : state;
  const faceProps = { book, depth };

  // Closed, the cover hangs to one side of the spine: slide it half a cover
  // back so whichever face is showing stays centered
  const offset = { front: -0.5, inside: 0, back: 0.5 }[face] ?? 0;

  const onKeyDown = (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    onActivate(book.isbn);
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      aria-label={`${book.title}, ${book.authorNames}`}
      aria-expanded={selected}
      onClick={() => onActivate(book.isbn)}
      onKeyDown={onKeyDown}
      className={`dimmable relative ml-px cursor-pointer select-none rounded-sm outline-offset-8 focus-visible:outline-4 focus-visible:outline-accent ${selected ? "z-40" : "hover:z-30 z-10"
        } ${dimmed ? "dimmed" : ""}`}
      style={{
        width: `${depth}px`,
        height: `${book.h}px`,
        // Shows the top edge when tilted on hover; once open and moved to the
        // middle of the screen it would only distort the book
        perspective: state === "out" ? "none" : "6000px",
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
            transform: state !== "stored" ? "translateZ(500px)" : "",
          }}
        >
          <div
            className="w-full h-full preserve-3d t-transform"
            style={{
              transformOrigin: "bottom center",
              transform:
                state === "out" && placement
                  ? `translate(${placement.x + offset * book.w * placement.scale}px, ${placement.y}px) scale(${placement.scale})`
                  : "",
            }}
          >
            <div
              className="w-full h-full absolute preserve-3d t-transform"
              style={{ transform: ROTATION[face] }}
            >
              <Left {...faceProps} />
              <Top {...faceProps} />

              {state !== "stored" && (
                <>
                  <Front {...faceProps} open={face === "inside"} />
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
    </div>
  );
};

export default Book;
