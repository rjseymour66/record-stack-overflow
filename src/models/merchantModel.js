import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';


const Schema = mongoose.Schema;

export const MerchantSchema = new Schema({
  isMerchant: {
    type: Boolean,
    default: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  primaryContact: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  hashPassword: {
    type: String,
    required: true,
    minLength: 6
  },
  address1: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  address2: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  state: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2,
  },
  zip: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  created_date: {
    type: Date,
    default: Date.now 
  }
})

MerchantSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
};

MerchantSchema.methods.toJSON = function() {
  let merchant = this;
  let merchantObject = merchant.toObject()

  return { 
    _id: merchantObject._id,
    companyName: merchantObject.companyName,
    primaryContact: merchantObject.primaryContact,
    email: merchantObject.email,
    password: merchantObject.password,
    address1: merchantObject.address1,
    address2: merchantObject.address2,
    city: merchantObject.city,
    state: merchantObject.state,
    zip: merchantObject.zip
  }
}

MerchantSchema.methods.generateAuthToken = function () {
  let merchant = this;
  let bearer = 'auth';
  let token = jwt.sign({_id: merchant._id.toHexString(), bearer}, process.env.JWT_SECRET).toString();

  merchant.tokens = merchant.tokens.concat([{bearer, token}]);

  return merchant.save().then(() => {
    return token;
  })
}

MerchantSchema.statics.findByToken = function(token) {
  let Merchant = this;
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch(e) {
    return Promise.reject();
  }

  return Merchant.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.bearer': 'auth'
  });
};