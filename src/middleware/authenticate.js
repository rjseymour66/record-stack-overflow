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
        return res.json({ 
          token: jwt.sign({ email: user.email, username: user.username, _id: user.id }, process.env.JWT_SECRET) 
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
        return res.json({ token: jwt.sign({ companyName: merchant.companyName, primaryContact: merchant.primaryContact, email: merchant.email, _id: merchant.id }, process.env.JWT_SECRET) });
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

// MERCHANT LOGIN REQUIRED

export const merchantLoginRequired = (req, res, next) => {
  const token = req.headers['Authorization'];

  if(req.user.companyName) {

    next();
  } else {
    return res.status(401).json({ ERROR: 'Unauthorized user. Configure merchant account to complete action.' });
  }
}

export const authenticateUser = (req, res, next) => {
  let token = req.header('Authorization');

  Merchant.findByToken(token).then((merchant) => {
    if (!merchant) {
      return Promise.reject();
    }

    req.user = user;
    req.headers['Authorization'] = token
    next();
    res.send(merchant)
  }).catch((e) => {
    res.status(401).send()
  })
}


// IS MERCHANT MIDDLEWARE



export const findRecordById = (req, res, next) => {
  const id = req.params.record_id
  Record.findById(id)
    .exec((err, record) => {
      if (err) {
        res.status(404).json({ ERROR: "Record not found. Check record id." })
      } else {
        res.send(record)
      }
      next();
})
}

export const verifyUserId = (req, res, next) => {
  if (record._createdBy === req.user._id){
    next();
  } else {
    res.status(404).json({ ERROR: "Insufficient privileges" })
  }
  
}


export const getToken = (req, res, next) => {
  const token = req.headers('Authorization')
  const slicedToken = token.slice(9)
  next();
}


// METHOD -> Pull out createdBy with FindByID -> Verify user._id === _createdBy -> UPDATE

// METHOD -> Pull out createdBy with FindByID -> Verify user._id === _createdBy -> DELETE