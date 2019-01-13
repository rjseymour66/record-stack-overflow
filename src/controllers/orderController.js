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


// create an order
export const createOrder = (req, res) => {
  let order = new Order(req.body);
  order.save((err, data) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.json({message: 'Success - order created!', 'New Order Information': data});
    }
  });
};


// get all orders - get orders
export const getAllOrders = (req, res) => {
  const limit = parseInt(req.query.limit)

    Order.find((err, data) => {
      if (err) {
        res.status(400).json({ message: "Request failed."})
      } else {
        res.json(data)
      }
    }).limit(limit);
  }

  // Update an order
  export const updateOrderById = (req, res) => {
    const id = {_id: req.params.order_id};
    const updatedInfo = req.body;
    Order.findOneAndUpdate(id, updatedInfo, { new: true }, (err, data) => {
      if (err) {
        res.status(404).json({ message: "Order not found. Check order id."})
      } else {
        res.json(data)
      }
    });
  };

// delete an order

export const deleteOrder = (req, res) => {
  Order.remove({_id: req.params.order_id}, (err, data) => {
    if (err) {
      res.status(404).json({ message: "Order not found. Check order id."})
    } else {
      res.json({message: 'Successfully deleted!'})
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