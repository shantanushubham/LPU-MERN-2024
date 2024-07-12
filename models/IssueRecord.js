const mongoose = require("mongoose");

const IssueRecordSchema = mongoose.Schema({
  studentRegNo: {
    type: Number,
    required: true,
  },
  bookIsbnNo: {
    type: Number,
    required: true,
    // TODO: Lets talk about validation later!
  },
  issueDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
    default: ({ issueDate }) => {
      return new Date(issueDate.getTime() + 15 * 24 * 60 * 60 * 1000);
    },
  },
  status: {
    type: String,
    enum: ["Issued", "Returned"],
    default: "Issued",
  },
  lateFine: {
    type: Number,
    default: 0,
    min: 0,
  },
});
IssueRecordSchema.virtual("book", {
  ref: "book",
  localField: "bookIsbnNo",
  foreignField: "isbn",
  justOne: true,
});
IssueRecordSchema.set("toObject", { virtuals: true });
IssueRecordSchema.set("toJSON", { virtuals: true });

const IssueRecordModel = mongoose.model("issue-record", IssueRecordSchema);
module.exports = IssueRecordModel;
