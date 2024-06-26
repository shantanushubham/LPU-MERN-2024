const studentService = require("../service/student.service");
const { generateToken } = require("../util/jwt");

const addStudent = async (req, res) => {
  try {
    const studentInfo = req.body;
    const student = await studentService.addStudent(studentInfo);
    return res.status(201).send(student);
  } catch (err) {
    return res.status(500).send({
      message: "Error occurred",
    });
  }
};

const getStudentByRegistrationNumber = async (req, res) => {
  try {
    let { registrationNumber } = req.params;
    const studentInfo = await studentService.getStudentByRegistrationNumber(
      registrationNumber
    );
    if (!studentInfo) {
      return res.status(404).send({
        message: "Invalid Registration Number",
      });
    }
    return res.status(200).send(studentInfo);
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: "An error occurred",
    });
  }
};

const updateStudent = async (req, res) => {
  try {
    let studentAfterUpdate = { ...req.body };
    const wasUpdated = await studentService.updateStudent(studentAfterUpdate);
    if (!wasUpdated) {
      return res
        .status(404)
        .send({ message: "Update Failed: Student not found." });
    }
    return res.status(200).send({ message: "Update Success!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "An error occurred" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    let { registrationNumber } = req.params;
    const wasDeleted = await studentService.deleteStudent(registrationNumber);
    if (!wasDeleted) {
      return res
        .status(404)
        .send({ message: "Delete Failed: Student not found." });
    }
    return res.status(200).send({ message: "Delete Success!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "An error occurred" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    const student = await studentService.loginStudent(
      registrationNumber,
      password
    );
    if (!student) {
      return res.status(400).send({
        message: "Invalid Credentials",
      });
    }
    const token = generateToken({
      registrationNumber: student.registrationNumber,
    });
    return res.status(200).send({ student, token });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "An error occurred" });
  }
};

module.exports = {
  addStudent,
  getStudentByRegistrationNumber,
  updateStudent,
  deleteStudent,
  loginStudent,
};
