const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.post("/add", bookController.addBook);
router.get("/:isbnNumber", bookController.getBookByIsbn);

module.exports = router;
