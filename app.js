const express = require("express");
const app = express();
const PORT = 8080;
require("./connect-db");
const studentRouter = require("./routes/student.route");
const bookRouter = require("./routes/book.route");
const { bookMiddleware } = require("./middleware/book.middleware");

app.use(express.json());
app.use("/student", studentRouter);
app.use("/book", bookMiddleware, bookRouter);

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server running successfully.");
  }
});
