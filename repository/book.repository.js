const BookModel = require("../models/Book");

const addStudent = async (bookInfo) => {
  const book = new BookModel(bookInfo);
  return await book.save();
};

const getBookByIsbn = async (isbnNumber) => {
  return await BookModel.findOne({ isbn: isbnNumber });
};

module.exports = {
  addStudent,
  getBookByIsbn,
};
