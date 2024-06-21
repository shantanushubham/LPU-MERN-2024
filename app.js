const express = require("express");
const app = express();
const Student = require("./models/Student");
const PORT = 8080;
require("./connect-db");

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.get("/get-student-info/:registrationNumber", (req, res) => {
  let registrationNumber = req.params.registrationNumber;
  const studentName = STUDENTS[registrationNumber];
  if (studentName) {
    return res.status(200).send(studentName);
  }
  return res.status(404).send({
    message: "Invalid Registration Number",
  });
});

app.post("/add-student", async (req, res) => {
  try {
    const studentInfo = req.body;
    const student = new Student(studentInfo);
    await student.save();
    console.info("Successfully saved student");
    return res.status(201).send({
      message: "Student saved.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "Error occurred",
    });
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Server running successfully.");
  }
});
