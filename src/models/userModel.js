import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
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
        minlength: 6
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});

UserSchema.methods.comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword)
};