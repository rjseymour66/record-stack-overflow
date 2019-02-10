import mongoose from 'mongoose';
import { ShippingSchema, BillingSchema } from './userModel';

const Schema = mongoose.Schema;

// user billing

// must include merchant ID

export const TestSchema = new Schema({
  status: {
    type: String,
    default: 'In progress'
  },
  product_info: {
    record_id: {
      type: String,
      required: 'Enter the record id'
    }
  },
  customer_info: {
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
    }
  },
  shipping_info: {
    shipping_address1: {
      type: String,
      required: 'Address 1 required'
    },
    shipping_address2: {
      type: String,
    },
    shipping_city: {
      type: String,
      required: 'City required'
    },
    shipping_state: {
      type: String,
      required: 'State required'
    },
    shipping_zip: {
      type: String,
      required: 'Zip code required'
    }
  },
  merchant_info: {
    merchant_id: {
      type: String,
      required: 'Enter the merchant id'
    },
    companyName: {
      type: String,
      required: 'Enter the company name',
      trim: true,
      minlength: 1
    },
    primaryContact: {
      type: String,
      required: 'Enter the primary contact',
      trim: true,
      minlength: 1
    },
    phoneNumber: {
      type: String,
      required: 'Enter the merchant phone number',
      minLength: 10
    }
  },
  billing_info: {
    paypal_email: {
      type: String,
      required: 'Enter your PayPal account email'
    },
    billing_address1: {
      type: String,
      default: undefined
    },
    billing_address2: {
      type: String,
      default: undefined,
    },
    billing_city: {
      type: String,
      default: undefined,
    },
    billing_state: {
      type: String,
      default: undefined,
    },
    billing_zip: {
      type: String,
      default: undefined,
    }
  },
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
})


  




  