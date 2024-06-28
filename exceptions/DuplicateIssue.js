class DuplicateIssueException extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

module.exports = DuplicateIssueException;
