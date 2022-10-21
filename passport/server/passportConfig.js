const User = require("./user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((userId, pass, done) => {
      User.findOne({ userId: userId }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(pass, user.pass, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        userId: user.userId,
      };
      cb(err, userInformation);
    });
  });
};