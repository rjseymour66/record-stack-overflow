import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import { SuperSchema } from '../models/userTest';

const User = mongoose.model('User', UserSchema);
const Super = mongoose.model('Super', SuperSchema)


// REGISTER NEW USER

export const register = (req, res) => {
  const newUser = new User(req.body);
  newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newUser.save((err, user) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hashPassword = undefined;
      return res.json(user);
    }
  })

};


// LOGIN USER GET TOKEN

export const login = (req, res) => {
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ ERROR: 'Authentication failed. No user found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ ERROR: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({ token: jwt.sign({ email: user.email, username: user.username, _id: user.id }, process.env.JWT_SECRET) });
      }
    }
  });
};


// CHECK USER CREDS
export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ ERROR: 'Unauthorized user' });
  }
};


// AUTHENTICATE USER CREATED THAT ROUTE

export const authenticateUser = (req, res, next) => {
  let token = req.header('x-auth');

  Super.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
    res.send(user)
  }).catch((e) => {
    res.status(401).send()
  })
}
