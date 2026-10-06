const Left = ({ book }) => {
  if (!book) return null;

  const { h, pages, bg, text, author, title, l_title, collection } = book;

  const depthVal = pages / 10;
  const halfDepthVal = depthVal / 2;

  const height = `${h}px`;
  const depth = `${depthVal}px`;
  const halfDepth = `${halfDepthVal}px`;

  return (
    <div
      className="absolute block backface-hidden"
      style={{
        width: depth,
        height,
        left: `-${halfDepth}`,
        backgroundColor: bg,
        transform: "rotateY(90deg) rotateX(-180deg)",
      }}
    >
      <div
        className="text-xs flex items-center pl-10 overflow-hidden"
        style={{
          width: height,
          height: depth,
          color: text,
          transformOrigin: halfDepth,
          transform: "rotate(90deg)",
        }}
      >
        <span className="flex-none uppercase font-sans">{author}</span>
        <span className="font-semibold ml-2">{l_title || title}</span>
      </div>

      {collection && (
        <div
          className="text-base leading-none font-bold h-10 flex items-center justify-center overflow-hidden"
          style={{
            width: depth,
            color: text,
            transform: `rotate(180deg) translateY(${depth})`,
          }}
        >
          {collection}
        </div>
      )}
    </div>
  );
};

export default Left;
