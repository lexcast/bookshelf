const Front = ({ book, depth, state }) => {
  const { w, h, bg, text, author, author_photo, publisher, cover, title } = book;

  const width = `${w}px`;
  const height = `${h}px`;
  const halfDepth = `${depth / 2}px`;

  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div
      className="preserve-3d absolute block t-transform z-30 rounded-r-[3px]"
      style={{
        width,
        height,
        transformOrigin: "0% 50%",
        transform:
          state === "inside"
            ? `translate3d(0,0,${halfDepth}) rotate3d(0,1,0,-160deg)`
            : `translate3d(0,0,${halfDepth})`,
      }}
    >
      <div
        className="p-10 flex items-center justify-start flex-col absolute text-center block backface-hidden preserve-3d z-10 rounded-l-[3px]"
        style={{
          width,
          height,
          backgroundColor: bg,
          color: text,
          transform: "rotate3d(0,1,0,-180deg)",
        }}
      >
        <div className="flex-1 flex flex-col items-center justify-start">
          {author_photo && (
            <img
              className="w-32 mb-4 border-4 border-white pointer-events-none"
              src={`${baseUrl}/images/authors/${author_photo}`}
              alt={author}
            />
          )}
          <h1>{author}</h1>
        </div>
        <h3 className="text-xs font-extralight">{publisher}</h3>
      </div>

      <div
        className="absolute block backface-hidden preserve-3d z-10 rounded-r-[3px]"
        style={{
          width,
          height,
          backgroundColor: bg,
        }}
      >
        <img
          className="backface-hidden preserve-3d rounded-r-[3px] pointer-events-none"
          style={{ width, height }}
          src={`${baseUrl}/images/covers/${cover}`}
          alt={title}
        />
        <div className="absolute top-0 bottom-0 left-[10px] w-[3px] bg-black/5" />
      </div>

      <div
        className="absolute w-px top-[1px] bottom-[1px] -left-px"
        style={{ backgroundColor: bg }}
      />
    </div>
  );
};

export default Front;
