const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/registerUser");

router.get("/", (req, res) => {
  res.send("users");
});

router.post("/register", registerUser);

module.exports = router;
