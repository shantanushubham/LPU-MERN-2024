const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;

const encode = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, SALT_ROUNDS);
};

const check = (encodedPassword, plainPassword) => {
  return bcrypt.compareSync(plainPassword, encodedPassword);
};

module.exports = { encode, check };
