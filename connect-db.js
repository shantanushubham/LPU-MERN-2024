const mongoose = require("mongoose");

const DB_NAME = "Lou";

const MONGO_DB_SRV = process.env.MONGO_DB_SRV;

mongoose
  .connect(`${MONGO_DB_SRV}/${DB_NAME}`)
  .then(() => {
    console.log("Database connection is successful");
  })
  .catch((err) => {
    console.error(err);
  });
