const BookUnavailableException = require("../eceptions/BookUnavailable");
const DuplicateIssueException = require("../eceptions/DuplicateIssue");
const issueRecordRepository = require("../repository/issueRecord.repository");
const bookService = require("../service/book.service");

const addIssueRecord = async (issueRecordInfo) => {
  try {
    const { studentRegNo, bookIsbnNo } = issueRecordInfo;
    const existingBookIssue = await getIssueRecordsByFilters({
      studentRegNo,
      bookIsbnNo,
      status: "Issued",
    });
    if (existingBookIssue?.length) {
      const message = `The student with Registration No.: ${studentRegNo} has already issued a book with ISBN: ${bookIsbnNo} and it is in ISSUED state.`;
      console.info(message);
      throw new DuplicateIssueException(message);
    }
    const book = await bookService.getBookByIsbn(bookIsbnNo);
    if (!book?.count) {
      const message = `Book Issue Failed! The Book with ISBN ${bookIsbnNo} is not available for issuing.`;
      console.info(message);
      throw new BookUnavailableException(message);
    }
    const issueRecord = await issueRecordRepository.addIssueRecord(
      issueRecordInfo
    );
    if (issueRecord) {
      book.count--;
      bookService.updateBook(book);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getIssueRecordById = async (issueRecordId) => {
  return await issueRecordRepository.getIssueRecordById(issueRecordId);
};

const getIssueRecordsByFilters = async (filterObject) => {
  return await issueRecordRepository.getIssueRecordsByFilters(filterObject);
};

const updateIssueRecord = async (issueRecord) => {
  return await issueRecordRepository.updateIssueRecord(issueRecord);
};

const deleteIssueRecord = async (issueRecordId) => {
  return await issueRecordRepository.deleteIssueRecord(issueRecordId);
};

module.exports = {
  addIssueRecord,
  getIssueRecordById,
  getIssueRecordsByFilters,
  updateIssueRecord,
  deleteIssueRecord,
};
