const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const {
  isClassRepresentativeMiddleware,
} = require("../middleware/student.middleware");

router.post("/add", isClassRepresentativeMiddleware, bookController.addBook);
router.get("/:isbnNumber", bookController.getBookByIsbn);
router.put("/", isClassRepresentativeMiddleware, bookController.updateBook);
router.delete(
  "/:isbnNumber",
  isClassRepresentativeMiddleware,
  bookController.deleteBook
);

module.exports = router;

/**
 * Create a Middleware that allows a CR to only add Fiction/Non-Fiction books depending on
 * what week it is!
 * Consider week is hard coded in your code. [FICTION, NON-FICTION]
 */
