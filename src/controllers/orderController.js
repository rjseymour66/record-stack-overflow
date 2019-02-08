import mongoose from 'mongoose';
import { OrderSchema } from '../models/orderModel';

// require model
const Order = mongoose.model('Order', OrderSchema);


// CREATE / POST NEW ORDER
export const createOrder = (req, res) => {

  let order = new Order({
    product_info: [{
      record_id: req.params.record_id,
    }],
    customer_info: [{
      username: req.user.username,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName
    }],
    shipping_info: [{
      shipping_address1: req.body.shipping_address1,
      shipping_address2: req.body.shipping_address2,
      shipping_city: req.body.shipping_city,
      shipping_state: req.body.shipping_state,
      shipping_zip: req.body.shipping_zip
    }],
    billing_info: [{
      paypal_email: req.body.paypal_email,
      billing_address1: req.body.billing_address1,
      billing_address2: req.body.billing_address2,
      billing_city: req.body.billing_city,
      billing_state: req.body.billing_state,
      billing_zip: req.body.billing_zip
    }],
    merchant_info: [{
      merchant_id: req.body.merchant_id,
      companyName: req.body.companyName,
      primaryContact: req.body.primaryContact,
      phoneNumber: req.body.phoneNumber
    }],
    comments: req.body.comments,
    _createdBy: req.user._id
  });
  order.save((err, order_info) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.json({order_info});
    }
  });
};


// RETRIEVE / GET ONE ORDER
export const getOrder = (req, res) => {
  const id = req.params.order_id

  Order.findById(id)
  .exec((err, order) => {
    if(err) {
      res.status(400).json({ 
        ERROR: "Order not found" 
      })
    } else {
      res.json(order)
    }
  })
};


// RETRIEVE / GET ALL ORDERS
export const getAllOrders = (req, res) => {
  const limit = parseInt(req.query.limit)
  const offset = parseInt(req.query.offset)
  const lastName = req.query.lastName
  const sort = { lastName : req.query.lastname }

    if(lastName) {
      Order.find({ customer_lastName : lastName })
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ 
            ERROR: "Request failed"
          })
        } else {
          res.json(data)
        }
      });

    } else {
      Order.find()
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ 
            ERROR: "Request failed."
          })
        } else {
          res.json(data)
        }
      });

    }
  }

  // Update an order
  export const updateOrderById = (req, res) => {
    const id = { _id: req.params.order_id }
    const updatedInfo = req.body;
    const userId = req.user._id
    Order.findOneAndUpdate(id, updatedInfo, { new: true }, (err, order) => {
      if (userId !== order._createdBy) {
        res.status(404).json({ 
          error: "Order not found. Check order id."
      })
      } else {
        res.json(order)
      }
    });
  };

// delete an order

export const deleteOrder = (req, res) => {
  Order.remove({ _id: req.params.order_id }, (err, data) => {
    if (err) {
      res.status(404).json({ 
        error: "Order not found. Check order id."
      })
    } else {
      res.json({
        success: 'Order object deleted'
      })
    }
  });
};

