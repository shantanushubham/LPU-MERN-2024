const bookRepository = require("../repository/book.repository");

const addBook = async (bookInfo) => {
  try {
    let book = await getBookByIsbn(bookInfo.isbn);
    if (!book) {
      book = await bookRepository.addBook(bookInfo);
    } else {
      book.count++;
      await bookRepository.addBook(book);
    }
    console.info("Successfully saved book");
    return book;
  } catch (err) {
    console.error("Book save failed.", err);
    throw err;
  }
};

const getBookByIsbn = async (isbnNumber) => {
  try {
    const book = await bookRepository.getBookByIsbn(isbnNumber);
    if (!book) {
      console.info(`Book with ISBN Number ${isbnNumber} was not found.`);
    } else {
      console.info(
        `Book with ISBN Number ${isbnNumber} was successfully found.`
      );
    }
    return book;
  } catch (err) {
    console.error(
      `There was an error finding book with the ISBN number: ${isbnNumber}`
    );
    throw err;
  }
};

const updateBook = async (bookAfterUpdate) => {
  return await bookRepository.updateBook(bookAfterUpdate);
};

const deleteBook = async (isbn) => {
  return await bookRepository.deleteBook(isbn);
};

module.exports = { addBook, getBookByIsbn, updateBook, deleteBook };
