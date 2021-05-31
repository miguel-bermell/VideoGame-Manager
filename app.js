require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const loadModels = require("./models/relationship");
var indexRouter = require("./routes/index");
var gamesRouter = require("./routes/videogames");
const imagesRouter = require("./routes/images");
const usersRouter = require("./routes/users");

var app = express();
loadModels();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/videogames", gamesRouter);
app.use("/images", imagesRouter);
module.exports = app;
