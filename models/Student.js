const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: [15, "Age of the student must be 15 or above"],
    max: [23, "Age of the student must be less than 23"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "The student email already exists"],
    validate: [
      (email) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
      },
      "Please enter valid email.",
    ],
  },
  registrationNumber: {
    type: Number,
    required: true,
    unique: true,
    min: [9_999_999, "Please enter a valid 8 digit registration number."],
    max: [1_000_000_000, "Please enter a valid 8 digit registration number."],
  },
  city: {
    type: String,
  },
});

const StudentModel = mongoose.model("students", StudentSchema);

module.exports = StudentModel;
