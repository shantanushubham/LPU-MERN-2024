const express = require("express");
const app = express();
const Student = require("./models/Student");
const PORT = 8080;
require("./connect-db");

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

app.get("/get-student-info/:registrationNumber", async (req, res) => {
  try {
    let registrationNumber = req.params.registrationNumber;
    const studentInfo = await Student.findOne({ registrationNumber });
    if (studentInfo) {
      console.info(
        `Student with Registration Number ${registrationNumber} was successfully found.`
      );
      return res.status(200).send(studentInfo);
    }
    console.info(
      `Student with Registration Number ${registrationNumber} was not found.`
    );
    return res.status(404).send({
      message: "Invalid Registration Number",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "An error occurred",
    });
  }
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
