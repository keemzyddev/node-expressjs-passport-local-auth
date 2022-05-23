//user model
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

loginData = (req, res) => {
  res.render("login");
};

regData = (req, res) => {
  res.render("register");
};

regHandle = async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill in all fields" });
  }

  //check if passwords match
  if (password !== password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  //check password length
  if (password.length < 6) {
    errors.push({ msg: "Passwords should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation passed
    const user = await User.findOne({ email });
    try {
      if (user) {
        //user exist
        errors.push({ msg: "Email already registered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
          user,
        });
      } else {
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create new user
        const newUser = await User.create({
          name,
          email,
          password: hashPassword,
        });

        // console.log(newUser);
        req.flash("success_msg", "You are now registered and can log in");
        res.redirect("/users/login");
      }
    } catch (error) {
      console.error(error);
    }
  }
};

//Login handle
loginHandle = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
};

//Logout handle
logoutHandle = (req, res, next) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("/users/login");
};

module.exports = {
  loginData,
  regData,
  regHandle,
  loginHandle,
  logoutHandle,
};
