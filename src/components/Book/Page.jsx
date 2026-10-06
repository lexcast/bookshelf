const Page = ({ book }) => {
  if (!book) return null;

  const { w, h, pages, excerpt } = book;

  const width = `${w - 5}px`;
  const height = `${h - 10}px`;
  const oneLessHalfDepth = `${pages / 10 / 2 - 1}px`;

  return (
    <div
      className="bk-page absolute backface-hidden z-20 bg-paper top-[5px]"
      style={{
        width,
        height,
        transform: `translate3d(0,0,${oneLessHalfDepth})`,
      }}
    >
      <div className="bk-content absolute bg-paper backface-hidden top-[30px] left-[20px] bottom-[20px] right-[20px] p-[30px]">
        <p className="drop-cap select-none antialiased text-xs leading-relaxed text-black text-justify pb-[10px]">
          {excerpt}
        </p>
      </div>
    </div>
  );
};

export default Page;
