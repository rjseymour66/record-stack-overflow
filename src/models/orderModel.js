import mongoose from 'mongoose';
import { ShippingSchema } from './userModel';

const Schema = mongoose.Schema;


export const CustomerSchema = new Schema({
  username: {
    type: String,
    required: 'Customer username required'
  },
  email: {
    type: String,
    required: 'Customer email required'
  },
  firstName: {
    type: String,
    required: 'Customer first name required'
  },
  lastName: {
    type: String,
    required: 'Customer last name required'
  },
  _id: false,
  id: false
})


export const OrderSchema = new Schema ({
  status: {
    type: String,
    default: 'Order'
  },
  record_id: {
    type: String,
    required: 'Enter the album id'
  },
  price: {
    type: String,
    required: 'Enter the price'
  },
  
  customer: [CustomerSchema],

  shipping_info: [ShippingSchema],

  created_date: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: String
  }],
  _createdBy: {
    type: String,
    required: true,
  }
});