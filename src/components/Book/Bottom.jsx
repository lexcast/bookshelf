const Bottom = ({ book, depth }) => (
  <div
    className="absolute block backface-hidden bg-paper"
    style={{
      width: `${book.w - 5}px`,
      height: `${depth}px`,
      top: `-${depth / 2}px`,
      transform: `rotate3d(1,0,0,-90deg) translate3d(0,0,${book.h - 5}px)`,
    }}
  />
);

export default Bottom;
