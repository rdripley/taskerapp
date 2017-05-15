import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import jwt = require('jsonwebtoken');

let UserSchema = new mongoose.Schema({
  username: {type:String, lowercase: true, unique: true},
  email: {type: String, lowercase: true, unique: true},
  passwordHash: String,
  salt: String
});

UserSchema.method("setPassword", function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha1').toString('hex');
});

UserSchema.method("validatePassword", (password) => {
  let hash = crypto.pbkdf2Sync(password, this.salt, 100, 64, 'sha1').toString('hex');
  return(hash === this.passwordHash);
});

UserSchema.method("generateJWT", (role) => {
  return jwt.sign({
    id: this._id,
    username: this.username,
    email: this.email,
    role: role
  }, 'SecretKey');
});

export default mongoose.model('User', UserSchema);
