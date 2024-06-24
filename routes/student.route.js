const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.post("/add", studentController.addStudent);
router.get(
  "/:registrationNumber",
  studentController.getStudentByRegistrationNumber
);
router.put("/:registrationNumber", studentController.updateStudent);
router.delete("/:registrationNumber", studentController.deleteStudent);

module.exports = router;
