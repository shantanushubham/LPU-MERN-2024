const { getBookByIsbn } = require("../service/book.service");

const getLateFine = async (issueRecord) => {
  let { returnDate } = issueRecord;
  returnDate = getStartOfDate(returnDate);
  let currentDate = getStartOfDate(new Date());
  if (returnDate > currentDate) {
    return { lateFine: 0, book: null };
  }
  const differenceOfDays =
    (currentDate.getTime() - returnDate.getTime()) / (1000 * 60 * 60 * 24);
  const book = await getBookByIsbn(issueRecord.bookIsbnNo);
  return { lateFine: differenceOfDays * 0.015 * book.price, book };
};

const getStartOfDate = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
};

module.exports = { getLateFine };
