import React from "react";

const Page = ({ book }) => {
  const width = `${book.w - 5}px`;
  const height = `${book.h - 10}px`;
  const oneLessHalfDepth = `${book.pages / 10 / 2 - 1}px`;

  return (
    <div
      className="bk-page absolute backface-hidden z-20 bg-paper"
      style={{
        transform: `translate3d(0,0,${oneLessHalfDepth})`,
        width,
        height,
        top: "5px"
      }}
    >
      <div
        className="bk-content absolute bg-paper backface-hidden"
        style={{
          top: "30px",
          left: "20px",
          bottom: "20px",
          right: "20px",
          padding: "30px"
        }}
      >
        <p
          className="drop-cap select-none antialiased text-xs leading-relaxed text-black text-justify"
          style={{
            padding: "0 0 10px"
          }}
        >
          {book.excerpt}
        </p>
      </div>
    </div>
  );
};

export default Page;
