const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const { studentMiddleware } = require("../middleware/student.middleware");

router.post("/add", studentController.addStudent);
router.get(
  "/:registrationNumber",
  studentMiddleware,
  studentController.getStudentByRegistrationNumber
);
router.put(
  "/:registrationNumber",
  studentMiddleware,
  studentController.updateStudent
);
router.delete(
  "/:registrationNumber",
  studentMiddleware,
  studentController.deleteStudent
);
router.post("/login", studentController.loginStudent);

module.exports = router;
