const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const colors = require("colors");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();

const app = express();

//passport config
require("./config/passport")(passport);

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// body-parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//express session middleware
app.use(
  session({
    secret: "cat bark",
    resave: true,
    saveUninitialized: true,
  })
);

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//global var
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
