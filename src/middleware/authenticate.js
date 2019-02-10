import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import { MerchantSchema } from '../models/merchantModel'
import { RecordSchema } from '../models/recordModel';

const User = mongoose.model('User', UserSchema);
const Merchant = mongoose.model('Merchant', MerchantSchema)


// REGISTER NEW USER

export const registerUser = (req, res) => {
  const newUser = new User({
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    shipping_info: [{
      shipping_address1: req.body.shipping_address1,
      shipping_address2: req.body.shipping_address2,
      shipping_city: req.body.shipping_city,
      shipping_state: req.body.shipping_state,
      shipping_zip: req.body.shipping_zip
    }],
    billing_info: [{
      paypal_email: req.body.paypal_email,
      billing_address1: req.body.billing_address1,
      billing_address2: req.body.billing_address2,
      billing_city: req.body.billing_city,
      billing_state: req.body.billing_state,
      billing_zip: req.body.billing_zip
    }]    
  });
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
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ ERROR: 'Authentication failed. No user found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password, user.hashPassword)) {
        res.status(401).json({ ERROR: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({ 'secret token' : jwt.sign({ 
          email: user.email, 
          username: user.username, 
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName }, process.env.JWT_SECRET) 
        });
      }
    }
  });
};


// REGISTER NEW MERCHANT

export const registerMerchant = (req, res) => {
  const newMerchant = new Merchant({
    companyName: req.body.companyName,
    primaryContact: req.body.primaryContact,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    address: [{
      shipping_address1: req.body.shipping_address1,
      shipping_address2: req.body.shipping_address2,
      shipping_city: req.body.shipping_city,
      shipping_state: req.body.shipping_state,
      shipping_zip: req.body.shipping_zip
    }]
  });
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
        return res.json({ 'secret token' : jwt.sign({ merchantAccount: merchant.merchantAccount, companyName: merchant.companyName, primaryContact: merchant.primaryContact, email: merchant.email, _id: merchant.id }, process.env.JWT_SECRET) });
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

  console.log('*********** merchantAccount', req.user.merchantAccount);
  if(!req.user.merchantAccount) {
    res.status(404).json({Error : 'Insufficient privileges'})
  } else
    next();
}

// CREATED BY MIDDLEWARE - MERCHANT

export const createdBy = (req, res, next) => {
  const merchId = req.params.merchant_id;
  const userId = req.user._id
  const recId = req.params.record_id;

  console.log('***************** MerchantID', merchId);
  console.log('*****************    User ID', userId);
  console.log('*****************  Record ID', recId);

  if(merchId !== userId){
    res.status(404).json({ ERROR: "Insufficient privileges" })  
  } else {
      next();
  }
}

export const orderedBy = (req, res, next) => {
  const userParam = req.params.user_id
  const userId = req.user._id

  console.log('*****************    User ID', userId);
  console.log('*****************  Record ID', userParam);

  if(userParam !== userId){
    res.status(404).json({ ERROR: "Insufficient privileges" })  
  } else {
      next();
  }
}
