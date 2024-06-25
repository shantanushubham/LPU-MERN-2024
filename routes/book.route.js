const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.post("/add", bookController.addBook);
router.get("/:isbnNumber", bookController.getBookByIsbn);
router.put("/", bookController.updateBook);
router.delete("/:isbnNumber", bookController.deleteBook);

module.exports = router;

// const router1 = {
//   post: function (string, ...callbacks) {
//     // Some operation with string
//     for (let callback of callbacks) {
//       callback();
//     }
//   },
// };

// router1.post(
//   "/hello",
//   () => {
//     console.log("Hello 1");
//   },
//   () => {
//     console.log("Hello 2");
//   },
//   () => {
//     console.log("Hello 3");
//   },
//   () => {
//     console.log("Hello 4");
//   }
// );
