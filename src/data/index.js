import booksData from "./books.json";
import authorsData from "./authors.json";

// Replace each book's author ids with the full author data
const books = booksData.map((book) => {
  const authors = book.authors.map((id) => {
    if (!authorsData[id]) {
      throw new Error(`Book ${book.isbn} has unknown author "${id}"`);
    }
    return { id, ...authorsData[id] };
  });

  return {
    ...book,
    authors,
    authorNames: authors.map((author) => author.name).join(", "),
  };
});

export default books;
