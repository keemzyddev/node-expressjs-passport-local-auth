const LocalStrategy = require("passport-local").Strategy;
const moongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//load user model
const User = require("../models/User");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          //Match user
          const user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, {
              message: "This email is not registered",
            });
          }

          //Match user
          let isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "password incorrect" });
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
