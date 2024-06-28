class NotFoundException extends Error {
  constructor(model, property, value) {
    super();
    this.message = `${model} with ${property}: ${value} doesn't exist in the database.`;
  }
}

module.exports = NotFoundException;
