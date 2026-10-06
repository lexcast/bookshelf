import { countryName } from "../../lib/books.js";

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

// "1927–2014" for authors who died, "1965" for living ones
const lifespan = ({ born, died }) => {
  const bornYear = born?.slice(0, 4);
  const diedYear = died?.slice(0, 4);
  if (bornYear && diedYear) return `${bornYear}–${diedYear}`;
  return bornYear || (diedYear && `†${diedYear}`);
};

const Author = ({ author, small }) => {
  const details = [
    author.country && countryName(author.country),
    lifespan(author),
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center">
      <img
        className={`${small ? "w-24" : "w-32"} mb-4 border-4 border-white pointer-events-none`}
        src={`${baseUrl}/images/authors/${author.id}.jpg`}
        alt={author.name}
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
      <h1>{author.name}</h1>
      {details.length > 0 && (
        <p className="text-xs font-extralight">{details.join(" · ")}</p>
      )}
    </div>
  );
};

export default Author;
