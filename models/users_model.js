const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
  contact: {
    type: Number,
  },
  picture: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  ],
  orders: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("user", userSchema);
