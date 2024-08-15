const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const db = require("./config/mongoose_connection");
const connectFlash = require("connect-flash");
const expressSession = require("express-session");
const keys = require("./config/keys");

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const index = require("./routes/index");

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: keys.EXPRESS_SESSION_SECRET,
  })
);
app.use(connectFlash());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", index);
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

app.listen(3000);
