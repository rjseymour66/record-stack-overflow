import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

export const SuperSchema = new Schema({
  username: {
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
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
})

SuperSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return { _id: userObject._id, username: userObject.username, email: userObject.email}
}

SuperSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens = user.tokens.concat([{ access, token }])

  return user.save().then(() => {
    return token;
  });
};