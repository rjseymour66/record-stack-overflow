import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import { SuperSchema } from '../models/userTest';

const User = mongoose.model('User', UserSchema);
const Super = mongoose.model('Super', SuperSchema)

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
        return res.json({ token: jwt.sign({ email: user.email, username: user.username, _id: user.id }, 'FAKE PWORD') });
      }
    }
  });
};

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ ERROR: 'Unauthorized user' });
  }
};

// CREATE / REGISTER IS SAME AS CREATE

export const createUser = (req, res) => {
  const body = req.body
  let superUser = new Super(body)

  superUser.save().then(() => {
    return superUser.generateAuthToken()
  }).then((token) => {
    res.header('x-auth', token).send(superUser);
  })
  .catch((e) => {
    res.status(400).send(e)
  })
}

// RETRIEVE / GET USER INFORMATION
  // require username, email, password

// UPDATE / PUT 
  // change username, change email, change password



// DELETE / DELETE USER ACCOUNT
  // delete account to get new API key
