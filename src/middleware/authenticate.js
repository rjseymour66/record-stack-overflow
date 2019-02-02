import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import { SuperSchema } from '../models/userTest';
import { MerchantSchema } from '../models/merchantModel'

const User = mongoose.model('User', UserSchema);
const Super = mongoose.model('Super', SuperSchema)
const Merchant = mongoose.model('Merchant', MerchantSchema)


// REGISTER NEW USER

export const registerUser = (req, res) => {
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

// REGISTER NEW MERCHANT

export const registerMerchant = (req, res) => {
  const newMerchant = new Merchant(req.body);
  newMerchant.hashPassword = bcrypt.hashSync(req.body.password, 10);
  newMerchant.save((err, merchant) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      newMerchant.hashPassword = undefined;
      return res.json(merchant);
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

// LOGIN MERCHANT GET TOKEN


export const loginMerchant = (req, res) => {
  Merchant.findOne({
    email: req.body.email
  }, (err, merchant) => {
    if (err) throw err;
    if (!merchant) {
      res.status(401).json({ ERROR: 'Authentication failed. No merchant found.' });
    } else if (merchant) {
      if (!merchant.comparePassword(req.body.password, merchant.hashPassword)) {
        res.status(401).json({ ERROR: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({ token: jwt.sign({ companyName: merchant.companyName, primaryContact: merchant.primaryContact, email: merchant.email, _id: merchant.id }, process.env.JWT_SECRET) });
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

// MERCHANT LOGIN REQUIRED

export const merchantLoginRequired = (req, res, next) => {
  if(req.user.companyName) {

    next();
  } else {
    return res.status(401).json({ ERROR: 'Unauthorized user. Configure merchant account to complete action.' });
  }
}

// ==============================================================================================================

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
