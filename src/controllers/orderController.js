import mongoose from 'mongoose';
import { OrderSchema } from '../models/orderModel';
import { RecordSchema } from '../models/recordModel';

// require model
const Order = mongoose.model('Order', OrderSchema);
const Record = mongoose.model('Record', RecordSchema);


// find record and create order

      // find record by id
      // change available to false
      // create order with record id as album_id



// CREATE / POST NEW ORDER
export const createOrder = (req, res) => {

  let order = new Order({
    record_id: req.body.record_id,
    price: req.body.price,
    customer: [{
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
    comments: [req.body.comments],
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
      res.status(400).json({ ERROR: "Order not found" })
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
  const lastNameSort = { lastName : 1 }

    if(lastName) {
      Order.find({ customer_lastName : lastName })
      .limit(limit)
      .sort(lastNameSort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ ERROR: "Request failed"})
        } else {
          res.json(data)
        }
      });

    } else {
      Order.find()
      .limit(limit)
      .sort(lastNameSort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ ERROR: "Request failed."})
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
        res.status(404).json({ message: "Order not found. Check order id."})
      } else {
        res.json(order)
      }
    });
  };

// delete an order

export const deleteOrder = (req, res) => {
  Order.remove({ _id: req.params.order_id }, (err, data) => {
    if (err) {
      res.status(404).json({ ERROR: "Order not found. Check order id."})
    } else {
      res.json({SUCCESS: 'Order object deleted'})
    }
  });
};





// export const updateRecordById = (req, res) => {
//   const id = { _id: req.params.record_id };
  

//   Record.findOneAndUpdate(id, { sold: true }, { new: true }, (err, data) => {
//     if (err) {
//       res.status(404).json({ message: "Record not found. Check record id." })
//     } else {
//       res.json(data)
//     }
//     let order = new Order(req.body);
//     order.save((err, orderInfo) => {
//       if (err) {
//         return res.status(400).send({ message: "Order not saved." });
//       } else {
//         return res.json({ message: 'Success - record created!', 'New Record Information': orderInfo })
//       }
//     })
//   }
// )

// }

// export const updateRecordById = (req, res) => {
//   const id = {_id: req.params.record_id};
//   const updatedInfo = req.body;
//   Record.findOneAndUpdate(id, updatedInfo, { new: true }, (err, contact) => {
//     if (err) {
//       res.status(404).json({ message: "Record not found. Check record id."})
  //   } else {
  //     res.json(contact)
  //   }
  // });
// };