const Top = ({ book, depth }) => (
  <div
    className="absolute block backface-hidden bg-paper"
    style={{
      width: `${book.w - 5}px`,
      height: `${depth}px`,
      top: `-${depth / 2 - 5}px`,
      transform: "rotate3d(1,0,0,90deg)",
      clipPath: "inset(0px 0px 0px 0px)",
      WebkitClipPath: "inset(0px 0px 0px 0px)",
    }}
  />
);

export default Top;
