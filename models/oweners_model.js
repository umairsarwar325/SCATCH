const mongoose =  require("mongoose");

const ownerSchema = mongoose.Schema({
  fullName: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  gstin: {
    type: String,
  },
  picture: {
    type: String,
  },
  products: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("owner", ownerSchema);
