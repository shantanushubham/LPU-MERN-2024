const bookMiddleware = (req, res, next) => {
  console.log("This is Book Middleware");
  next();
};

module.exports = { bookMiddleware };
