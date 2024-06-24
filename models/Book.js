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
        let n = isbn.length;
        if (n != 10) {
          return false;
        }
        let sum = 0;
        for (let i = 0; i < 9; i++) {
          let digit = isbn[i] - "0";
          if (0 > digit || 9 < digit) {
            return false;
          }
          sum += digit * (10 - i);
        }
        let last = isbn[9];
        if (last != "X" && (last < "0" || last > "9")) {
          return false;
        }
        sum += last == "X" ? 10 : last - "0";
        return sum % 11 == 0;
      },
      "Please enter a valid ISBN",
    ],
  },
  count: {
    // 6
    type: Number,
    min: 0,
    default: 0,
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
