const studentRepository = require("../repository/student.repository");

const addStudent = async (studentInfo) => {
  try {
    const student = await studentRepository.addStudent(studentInfo);
    console.info("Successfully saved student");
    return student;
  } catch (err) {
    console.error("Student save failed.");
    throw err;
  }
};

const getStudentByRegistrationNumber = async (registrationNumber) => {
  try {
    const student = await studentRepository.getStudentByRegistrationNumber(
      registrationNumber
    );
    if (!student) {
      console.info(
        `Student with Registration Number ${registrationNumber} was not found.`
      );
    } else {
      console.info(
        `Student with Registration Number ${registrationNumber} was successfully found.`
      );
    }
    return student;
  } catch (err) {
    console.error(
      `There was an error finding student with the registration numbeR: ${registrationNumber}`
    );
    throw err;
  }
};

const updateStudent = async (studentAfterUpdate) => {
  return await studentRepository.updateStudent(studentAfterUpdate);
};

const deleteStudent = async (registrationNumber) => {
  return await studentRepository.deleteStudent(registrationNumber);
};

module.exports = {
  addStudent,
  getStudentByRegistrationNumber,
  updateStudent,
  deleteStudent,
};
