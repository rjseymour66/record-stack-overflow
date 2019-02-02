import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';


const Schema = mongoose.Schema;

export const MerchantSchema = new Schema({
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
    unique: true
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
    required: true
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