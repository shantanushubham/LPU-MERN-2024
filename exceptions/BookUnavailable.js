class BookUnavailableException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = BookUnavailableException;
