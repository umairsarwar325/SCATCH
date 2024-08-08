const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongooose");
const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(() => {
    dbgr("db connected");
  })
  .catch((error) => {
    dbgr(error);
  });

module.exports = mongoose.connection;
