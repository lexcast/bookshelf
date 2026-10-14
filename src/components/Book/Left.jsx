const Left = ({ book, depth }) => {
  const { h, bg, text, authorNames, title, l_title, collection } = book;

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
        className={`${depth < 24 ? "text-xs" : "text-sm"} leading-none flex items-center gap-2 pl-10 pr-4 overflow-hidden`}
        style={{
          width: height,
          height: `${depth}px`,
          color: text,
          transformOrigin: `${depth / 2}px`,
          transform: "rotate(90deg)",
        }}
      >
        <span className="flex-none uppercase font-sans text-[0.8em] tracking-wider opacity-85">{authorNames}</span>
        <span className="font-semibold truncate">{l_title || title}</span>
      </div>

      <div className="absolute inset-0 spine-sheen pointer-events-none" />

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
