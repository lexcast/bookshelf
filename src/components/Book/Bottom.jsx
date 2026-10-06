const Bottom = ({ book }) => {
  if (!book) return null;

  const { w, h, pages } = book;

  const depth = pages / 10;
  const halfDepth = depth / 2;
  const width = `${w - 5}px`;

  return (
    <div
      className="absolute block backface-hidden bg-paper"
      style={{
        width,
        height: `${depth}px`,
        top: `-${halfDepth}px`,
        transform: `rotate3d(1,0,0,-90deg) translate3d(0,0,${h - 5}px)`,
      }}
    />
  );
};

export default Bottom;
