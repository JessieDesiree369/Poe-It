const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");


passport.serializeUser(function(user , done) {
  done(null, user);
});

passport.deserializeUser(function(user , done) {
  db.User.find({where: {id: user.id}}).success(function(user){
    done(null, user);
  }).error(function(err){
    console.log(`Error at ./config/passport.js : line 14 ${err}`);
    done(err,null);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done){
    db.User.find({where: {username: username}}).success(function(user){
      pw = user ? user.password : "";
      isMatch = db.User.validPassword(password, pw, done, user);

    });
  }));