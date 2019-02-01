import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';
import { SuperSchema } from '../models/userTest';

const Super = mongoose.model('Super', SuperSchema)
const User = mongoose.model('User', UserSchema);


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