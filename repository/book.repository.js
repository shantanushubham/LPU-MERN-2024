const BookModel = require("../models/Book");

const addBook = async (bookInfo) => {
  const book = new BookModel(bookInfo);
  return await book.save();
};

const getAllBooks = async () => await BookModel.find();

const getBookByIsbn = async (isbnNumber) => {
  return await BookModel.findOne({ isbn: isbnNumber });
};

const updateBook = async (bookAfterUpdate) => {
  const { isbn } = bookAfterUpdate;
  const updateResult = await BookModel.updateOne(
    { isbn },
    { $set: { ...bookAfterUpdate } }
  );
  if (!updateResult.matchedCount) {
    console.info(`Update Failed: book with isbn ${isbn} was not found.`);
    return false;
  }
  console.info(`Update Success: book with isbn ${isbn} was updated.`);
  return true;
};

const deleteBook = async (isbn) => {
  const deleteResult = await BookModel.deleteOne({ isbn });
  if (!deleteResult.matchedCount) {
    console.info(`Delete Failed: book with isbn ${isbn} was not found.`);
    return false;
  }
  console.info(`Delete Success: book with isbn number ${isbn} was deleted.`);
  return true;
};

module.exports = {
  addBook,
  getAllBooks,
  getBookByIsbn,
  updateBook,
  deleteBook,
};
