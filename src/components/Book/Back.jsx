import Barcode from "react-barcode";

const Back = ({ book }) => {
  if (!book) return null;

  const { w, h, pages, bg, text, title, author, sinopsis, isbn } = book;

  const width = `${w}px`;
  const height = `${h}px`;
  const halfDepth = `${pages / 10 / 2}px`;

  const cleanIsbn = isbn ? `0${isbn.replace(/\D/g, "0")}0` : "";

  return (
    <div
      className="absolute block overflow-hidden p-10 text-justify text-[0.6rem] rounded-l-[3px]"
      style={{
        width,
        height,
        backgroundColor: bg,
        color: text,
        transform: `rotate3d(0,1,0,-180deg) translate3d(0,0,${halfDepth})`,
      }}
    >
      <h1 className="text-xs font-bold text-center">{title}</h1>
      <h2 className="text-xs text-center mb-2">{author}</h2>
      <p className="whitespace-pre-line">{sinopsis}</p>

      {cleanIsbn && (
        <div className="absolute bottom-0 right-0 mr-8 mb-3 scale-70 origin-bottom-right">
          <Barcode
            value={cleanIsbn}
            format="EAN13"
            width={1}
            height={25}
          />
        </div>
      )}

      <div className="absolute top-0 bottom-0 right-2.5 w-[3px] bg-black/5" />
    </div>
  );
};

export default Back;
