const Left = ({ book, depth }) => {
  const { h, bg, text, author, title, l_title, collection } = book;

  const height = `${h}px`;

  return (
    <div
      className="absolute block backface-hidden"
      style={{
        width: `${depth}px`,
        height,
        left: `-${depth / 2}px`,
        backgroundColor: bg,
        transform: "rotateY(90deg) rotateX(-180deg)",
      }}
    >
      <div
        className="text-xs flex items-center pl-10 overflow-hidden"
        style={{
          width: height,
          height: `${depth}px`,
          color: text,
          transformOrigin: `${depth / 2}px`,
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
            width: `${depth}px`,
            color: text,
            transform: `rotate(180deg) translateY(${depth}px)`,
          }}
        >
          {collection}
        </div>
      )}
    </div>
  );
};

export default Left;
