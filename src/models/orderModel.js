import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const OrderSchema = new Schema ({
  status: {
    type: String,
    default: 'Order'
  },
  album_id: {
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
  customer_street: {
    type: String,
    required: 'Enter the customer street address'
  },
  customer_city: {
    type: String,
    required: 'Enter the customer city'
  },
  customer_state: {
    type: String,
    required: 'Enter the customer state'
  },
  customer_zip: {
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