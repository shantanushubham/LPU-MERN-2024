const bookService = require("../service/book.service");

const addBook = async (req, res, next) => {
  try {
    const bookInfo = req.body;
    if (req.week && bookInfo.category !== req.week) {
      return res.status(403).send({
        message: `Its ${req.week} week!!!`,
      });
    }
    const book = await bookService.addBook(bookInfo);
    return res.status(201).send(book);
  } catch {
    return res.status(500).send({
      message: "Error occurred",
    });
  } finally {
    next();
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

const updateBook = async (req, res) => {
  try {
    let bookAfterUpdate = { ...req.body };
    const wasUpdated = await bookService.updateBook(bookAfterUpdate);
    if (!wasUpdated) {
      return res
        .status(404)
        .send({ message: "Update Failed: book not found." });
    }
    return res.status(200).send({ message: "Update Success!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "An error occurred" });
  }
};

const deleteBook = async (req, res) => {
  try {
    let { isbn } = req.params;
    const wasDeleted = await bookService.deleteBook(isbn);
    if (!wasDeleted) {
      return res
        .status(404)
        .send({ message: "Delete Failed: book not found." });
    }
    return res.status(200).send({ message: "Delete Success!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "An error occurred" });
  }
};

module.exports = {
  addBook,
  getBookByIsbn,
  updateBook,
  deleteBook,
};
