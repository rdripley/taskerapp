import * as express from 'express';
import * as mongoose from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as passport from 'passport';
import * as crypto from 'crypto';
import * as mongodb from 'mongodb';
import database from '../db';
import User from '../models/user';

var router = express.Router();

router.post('/Register', (req, res, next) => {
    let user:any = new User();
    console.log(req.body);
    user.username = req.body.username;
    user.email = req.body.email;
    user.role = req.body.role;
    user.setPassword(req.body.password);
    user.save(function(err, newUser){
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
        return res.json({token: user.generateJWT(user.role)});
      }
    return res.status(400).send(info);
  })(req, res, next);
});


router.get('/', (req, res) => {
  let userId = new mongodb.ObjectID(req.params['id']);
  database.db.collection('users').find().toArray().then((users) => {
    res.json(users);
  })
});

export default router;
