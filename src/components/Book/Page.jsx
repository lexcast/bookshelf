const Page = ({ book, depth }) => (
  <div
    className="bk-page absolute backface-hidden z-20 bg-paper top-[5px]"
    style={{
      width: `${book.w - 5}px`,
      height: `${book.h - 10}px`,
      transform: `translate3d(0,0,${depth / 2 - 1}px)`,
    }}
  >
    <div className="bk-content absolute bg-paper backface-hidden top-[30px] left-[20px] bottom-[20px] right-[20px] p-[30px]">
      <p className="drop-cap select-none antialiased text-xs leading-relaxed text-black text-justify pb-[10px]">
        {book.excerpt}
      </p>
    </div>
  </div>
);

export default Page;
