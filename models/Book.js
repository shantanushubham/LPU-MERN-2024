const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
    unique: true,
    validate: [
      (isbn) => {
        isbn = `${isbn}`.replace(/[-\s]/g, "");
        // ISBN-13 must be 13 digits long
        if (isbn.length !== 13) {
          return false;
        }
        // Ensure all characters are digits
        if (!/^\d{13}$/.test(isbn)) {
          return false;
        }
        // Calculate the checksum using the ISBN-13 algorithm
        let sum = 0;
        for (let i = 0; i < 12; i++) {
          let digit = parseInt(isbn[i], 10);
          sum += i % 2 === 0 ? digit : digit * 3;
        }
        // Calculate the check digit
        let checkDigit = (10 - (sum % 10)) % 10;
        // Validate the check digit
        return checkDigit === parseInt(isbn[12], 10);
      },
      "Please enter a valid ISBN",
    ],
  },
  count: {
    // 6
    type: Number,
    min: 0,
    default: 1,
  },
  boughtOn: {
    type: Date,
    default: () => new Date(),
  },
  price: {
    type: Number,
    min: 0,
    required: true,
  },
  category: {
    type: String,
    enum: ["Fiction", "Non-Fiction"],
    required: true,
  },
});

const BookModel = mongoose.model("book", BookSchema);

module.exports = BookModel;
