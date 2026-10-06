const Top = ({ book }) => {
  if (!book) return null;

  const { w, pages } = book;

  const width = `${w - 5}px`;
  const height = `${pages / 10}px`;
  const lessHalfDepth = `${pages / 10 / 2 - 5}px`;

  return (
    <div
      className="absolute block backface-hidden bg-paper"
      style={{
        width,
        height,
        top: `-${lessHalfDepth}`,
        transform: "rotate3d(1,0,0,90deg)",
        clipPath: "inset(0px 0px 0px 0px)",
        WebkitClipPath: "inset(0px 0px 0px 0px)",
      }}
    />
  );
};

export default Top;
