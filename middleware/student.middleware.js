const { verifyToken } = require("../util/jwt");
const studentService = require("../service/student.service");

const studentMiddleware = async (req, res, next) => {
  let token = req.headers["authorization"]; // Bearer: <token>
  token = token.substr(8);
  const [isValid, payload] = verifyToken(token);
  if (!isValid) {
    return res.status(403).send({ message: "Forbidden User" });
  }
  const { registrationNumber } = payload;
  const student = await studentService.getStudentByRegistrationNumber(
    registrationNumber
  );
  req.student = student;
  next();
};

const isClassRepresentativeMiddleware = (req, res, next) => {
  if (!req.student.isClassRepresentative) {
    return res.status(403).send({
      message: "Student is not a class representative.",
    });
  }
  next();
};

module.exports = { studentMiddleware, isClassRepresentativeMiddleware };
