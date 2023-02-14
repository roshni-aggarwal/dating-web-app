const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

// database connection
const DbConnection = require("./database/connection");

const Auth = require("./api/auth/index");

// config
// const config = require()

dotenv.config();

const app = express();

DbConnection();

// app use
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());

app.get("/", function (req, res) {
  res.status(200).json({
    message: "Welcome to the website",
  });
});

app.use("/auth", Auth);

// listening port
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`app is live at ${PORT}`);
});
