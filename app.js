const express = require("express");
const app = express();
const PORT = 8080;
require("./connect-db");
const studentRouter = require("./routes/student.route");

app.use(express.json());
app.use("/student", studentRouter);

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
