const Right = ({ book }) => {
  if (!book) return null;

  const { w, h, pages } = book;

  const depth = pages / 10;
  const halfDepth = depth / 2;

  return (
    <div
      className="absolute block backface-hidden bg-paper top-[5px]"
      style={{
        width: `${depth}px`,
        height: `${h - 10}px`,
        left: `-${halfDepth}px`,
        transform: `rotate3d(0,1,0,90deg) translate3d(0,0,${w - 5}px)`,
      }}
    />
  );
};

export default Right;
