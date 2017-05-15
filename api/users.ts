import * as express from 'express';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as crypto from 'crypto';
import User from '../models/user';

var router = express.Router();

router.post('/Register', (req, res, next) => {
  let newUser:any = new User();
  let salt = crypto.randomBytes(16).toString('hex');
  let passwordHash = crypto.pbkdf2Sync(req.body.password, salt, 1000, 64, 'sha1').toString('hex');
  console.log(req.body);
  newUser.username = req.body.username;
  newUser.email = req.body.email;
  newUser.passwordHash = passwordHash;
  newUser.salt = salt;
  newUser.save(function(err, newUser){
    if(err){
      return next(err);
    }
    res.json({message: "Registration complete. Please login."})
  }).catch((err) => {
    res.status(500);
  });
});

router.post('/Login/Local',(req, res, next) => {

  if(!req.body.username || !req.body.password){
    res.status(400).json({message:"Please fill in all fields."});
  }
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err);
    }
    if(user){
      return res.json({token: user.generateJWT(req.body.role)});
    }
    return res.status(400).send(info);
  })(req, res, next);
});

export default router;
