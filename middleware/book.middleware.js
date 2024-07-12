// const WEEK = "Fiction";

const bookWeekMiddleware = (req, res, next) => {
  // req.week = WEEK;
  next();
};

module.exports = { bookWeekMiddleware };
