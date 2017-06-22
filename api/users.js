"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var mongodb = require("mongodb");
var db_1 = require("../db");
var user_1 = require("../models/user");
var router = express.Router();
router.post('/Register', function (req, res, next) {
    var user = new user_1.default();
    console.log(req.body);
    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;
    user.setPassword(req.body.password);
    user.save(function (err, newUser) {
        if (err) {
            return next(err);
        }
        res.json({ message: "Registration complete. Please login." });
    }).catch(function (err) {
        res.status(500);
    });
});
router.post('/Login/Local', function (req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Please fill in all fields." });
    }
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (user) {
            return res.json({ token: user.generateJWT(user.role) });
        }
        return res.status(400).send(info);
    })(req, res, next);
});
router.get('/', function (req, res) {
    var userId = new mongodb.ObjectID(req.params['id']);
    db_1.default.db.collection('users').find().toArray().then(function (users) {
        res.json(users);
    });
});
exports.default = router;
