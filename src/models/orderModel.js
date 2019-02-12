import mongoose from 'mongoose';
import { ShippingSchema, BillingSchema } from './customerModel';

const Schema = mongoose.Schema;

// customer billing

// must include merchant ID


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
    default: 'In progress'
  },
  record_id: {
    type: String,
    required: 'Please enter the record ID'
  },
  merchant_id: {
    type: String,
    required: 'Please enter the record ID'
  },
    
  customer_info: [CustomerSchema],

  shipping_info: [ShippingSchema],

  billing_info: [BillingSchema],

  created_date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: [String],
    default: undefined
  },
  _createdBy: {
    type: String,
    required: true,
  }
});