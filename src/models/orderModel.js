import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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
  customer_firstName: {
    type: String,
    required: 'Enter the customer first name'
  },
  customer_lastName: {
    type: String,
    required: 'Enter the customer last name'
  },
  shipping_street: {
    type: String,
    required: 'Enter the customer street address'
  },
  shipping_city: {
    type: String,
    required: 'Enter the customer city'
  },
  shipping_state: {
    type: String,
    required: 'Enter the customer state'
  },
  shipping_zip: {
    type: String,
    required: 'Enter the customer zip code'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Array
  }
});