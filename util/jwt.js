const jwt = require("jsonwebtoken");
const JWT_SIGNATURE = process.env.JWT_SIGNATURE;

const JWT_OPTIONS = { encoding: "base64" };

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SIGNATURE);
};

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SIGNATURE);
    return [true, payload];
  } catch (err) {
    return [false, undefined];
  }
};

module.exports = { generateToken, verifyToken };
