const countryNames = new Intl.DisplayNames(["es"], { type: "region" });
const collator = new Intl.Collator("es");

// Lowercase and without accents, so "garcia" finds "García"
export const normalize = (text = "") =>
  text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

const ROMAN = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];

// Decades from 1900 on, centuries before that
export const eraOf = (year) => {
  if (!year) return null;
  if (year >= 1900) {
    const decade = Math.floor(year / 10) * 10;
    return { id: `${decade}s`, label: `${decade}–${decade + 9}`, start: decade };
  }
  const century = Math.floor((year - 1) / 100) + 1;
  return { id: `c${century}`, label: `Siglo ${ROMAN[century]}`, start: (century - 1) * 100 };
};

export const countryName = (code) => countryNames.of(code);

// Options for the selects, built only from what the books actually have
export const filterOptions = (books) => {
  const authors = new Map();
  const countries = new Set();
  const eras = new Map();

  for (const book of books) {
    for (const author of book.authors) {
      authors.set(author.id, author.name);
      if (author.country) countries.add(author.country);
    }
    const era = eraOf(book.year);
    if (era) eras.set(era.id, era);
  }

  return {
    authors: [...authors]
      .map(([id, name]) => ({ id, label: name }))
      .sort((a, b) => collator.compare(a.label, b.label)),
    countries: [...countries]
      .map((id) => ({ id, label: countryName(id) }))
      .sort((a, b) => collator.compare(a.label, b.label)),
    eras: [...eras.values()].sort((a, b) => a.start - b.start),
  };
};

export const filterBooks = (books, { query, author, country, era }) => {
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  return books.filter((book) => {
    if (author && !book.authors.some((a) => a.id === author)) return false;
    if (country && !book.authors.some((a) => a.country === country)) return false;
    if (era && eraOf(book.year)?.id !== era) return false;

    const haystack = normalize(`${book.title} ${book.l_title ?? ""} ${book.authorNames}`);
    return terms.every((term) => haystack.includes(term));
  });
};

// Hue of the spine color, with grays sent to the end ordered by lightness
const colorKey = (hex) => {
  let value = hex.replace("#", "");
  if (value.length === 3) value = [...value].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  if (max - min < 0.08) return 1000 + lightness;

  let hue;
  if (max === r) hue = ((g - b) / (max - min) + 6) % 6;
  else if (max === g) hue = (b - r) / (max - min) + 2;
  else hue = (r - g) / (max - min) + 4;
  return hue * 60;
};

// Books without a value go last
const byNumber = (get) => (a, b) => (get(a) ?? Infinity) - (get(b) ?? Infinity);

export const SORTS = {
  shelf: { label: "Orden del librero" },
  author: {
    label: "Autor",
    compare: (a, b) => collator.compare(a.authorNames, b.authorNames),
  },
  year: { label: "Año original", compare: byNumber((book) => book.year) },
  pages: { label: "Páginas", compare: byNumber((book) => book.pages) },
  color: { label: "Color", compare: byNumber((book) => colorKey(book.bg)) },
};

export const sortBooks = (books, sort) => {
  const { compare } = SORTS[sort];
  return compare ? [...books].sort(compare) : books;
};
