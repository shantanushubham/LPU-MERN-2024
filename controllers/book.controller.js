const bookService = require("../service/book.service");

const addBook = async (req, res) => {
  try {
    const bookInfo = req.body;
    const book = await bookService.addBook(bookInfo);
    return res.status(201).send(book);
  } catch (err) {
    return res.status(500).send({
      message: "Error occurred",
    });
  }
};

const getBookByIsbn = async (req, res) => {
  try {
    let { isbnNumber } = req.params;
    const bookInfo = await bookService.getBookByIsbn(isbnNumber);
    if (!bookInfo) {
      return res.status(404).send({
        message: "Invalid ISBN Number",
      });
    }
    return res.status(200).send(bookInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "An error occurred",
    });
  }
};

module.exports = {
  addBook,
  getBookByIsbn,
};
