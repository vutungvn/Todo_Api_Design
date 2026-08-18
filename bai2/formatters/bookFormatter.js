import authors from "../data/authors.js";

export const formatBook = (book, version) => {
  const author = authors.find((a) => a.id === book.authorId);

  if (version === "v1") {
    return {
      id: book.id,
      title: book.title,
      author: author ? author.name : "Unknown",
    };
  }

  if (version === "v2") {
    return {
      id: book.id,
      title: book.title,
      author: author ? { id: author.id, name: author.name } : null,
      publishedYear: book.publishedYear,
    };
  }

  return null;
};
