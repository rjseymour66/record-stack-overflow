import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import { MerchantSchema } from '../models/merchantModel'
import { RecordSchema } from '../models/recordModel';

const User = mongoose.model('User', UserSchema);
const Merchant = mongoose.model('Merchant', MerchantSchema)
const Record = mongoose.model('Record', RecordSchema)


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
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ ERROR: 'Authentication failed. No user found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ ERROR: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({ 'secret token' : jwt.sign({ email: user.email, username: user.username, _id: user.id }, process.env.JWT_SECRET) 
        });
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
        return res.json({ 'secret token' : jwt.sign({ isMerchant: merchant.isMerchant, companyName: merchant.companyName, primaryContact: merchant.primaryContact, email: merchant.email, _id: merchant.id }, process.env.JWT_SECRET) });
      }
    }
  });
};



// USER LOGIN REQUIRED
export const loginRequired = (req, res, next) => {
  if (req.user) {

    next();
  } else {
    return res.status(401).json({ ERROR: 'Unauthorized user' });
  }
};




// IS MERCHANT MIDDLEWARE


export const verifyMerchant = (req, res, next) => {
  if(!req.user.isMerchant) {
    res.status(404).json({Error : 'Insufficient privileges'})
  } else
    next();
}



