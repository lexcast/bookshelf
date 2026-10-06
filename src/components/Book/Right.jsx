const Right = ({ book, depth }) => (
  <div
    className="absolute block backface-hidden bg-paper top-[5px]"
    style={{
      width: `${depth}px`,
      height: `${book.h - 10}px`,
      left: `-${depth / 2}px`,
      transform: `rotate3d(0,1,0,90deg) translate3d(0,0,${book.w - 5}px)`,
    }}
  />
);

export default Right;
