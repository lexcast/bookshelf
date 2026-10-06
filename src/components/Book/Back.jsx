import Barcode from "react-barcode";

// Convert an ISBN-10 to its EAN-13 (ISBN-13) form, null if it isn't an ISBN
const toEan13 = (isbn = "") => {
  const clean = isbn.replace(/[-\s]/g, "").toUpperCase();
  if (/^97[89]\d{10}$/.test(clean)) return clean;
  if (!/^\d{9}[\dX]$/.test(clean)) return null;

  const base = `978${clean.slice(0, 9)}`;
  const sum = [...base].reduce((acc, d, i) => acc + d * (i % 2 ? 3 : 1), 0);
  return `${base}${(10 - (sum % 10)) % 10}`;
};

const Back = ({ book, depth }) => {
  const { w, h, bg, text, title, authorNames, year, sinopsis, isbn } = book;

  const width = `${w}px`;
  const height = `${h}px`;
  const halfDepth = `${depth / 2}px`;

  const ean = toEan13(isbn);

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
      <h2 className="text-xs text-center mb-2">
        {authorNames}
        {year && ` · ${year}`}
      </h2>
      <p className="whitespace-pre-line">{sinopsis}</p>

      {ean && (
        <div className="absolute bottom-0 right-0 mr-8 mb-3 scale-70 origin-bottom-right">
          <Barcode
            value={ean}
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
