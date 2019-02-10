import mongoose from 'mongoose';
import { TestSchema } from '../models/testModel';

const Test = mongoose.model('Test', TestSchema);

export const createTest = (req, res) => {
  let test = new Test({
    product_info: {
      record_id: req.params.record_id,
    },
    customer_info: {
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    },
    shipping_info: {
      shipping_address1: req.body.shipping_address1,
      shipping_address2: req.body.shipping_address2,
      shipping_city: req.body.shipping_city,
      shipping_state: req.body.shipping_state,
      shipping_zip: req.body.shipping_zip
    },
    billing_info: {
      paypal_email: req.body.paypal_email,
      billing_address1: req.body.billing_address1,
      billing_address2: req.body.billing_address2,
      billing_city: req.body.billing_city,
      billing_state: req.body.billing_state,
      billing_zip: req.body.billing_zip
    },
    merchant_info: {
      merchant_id: req.body.merchant_id,
      companyName: req.body.companyName,
      primaryContact: req.body.primaryContact,
      phoneNumber: req.body.phoneNumber
    },
    comments: req.body.comments,
    _createdBy: req.user._id
  })
  test.save((err, test) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.json({test});
    }
  });
}