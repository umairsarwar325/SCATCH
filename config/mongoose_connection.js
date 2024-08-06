const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongooose");

mongoose
  .connect("mongodb://127.0.0.1:27017/scatch")
  .then(() => {
    dbgr("db connected");
  })
  .catch((error) => {
    dbgr(error);
  });

module.exports = mongoose.connection;
