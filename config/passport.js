"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var mongoose = require("mongoose");
var LocalStrategy = require('passport-local').Strategy;
var User = mongoose.model('User');
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: "Invalid user" });
        }
        if (!user.validatePassword(password, user.salt, user.passwordHash)) {
            return done(null, false, { message: 'Passwords dont match' });
        }
        return done(null, user);
    });
}));
