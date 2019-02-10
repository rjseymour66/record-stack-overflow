import mongoose from 'mongoose';
import { UserSchema } from '../models/userModel';
import { OrderSchema } from '../models/orderModel';

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);


// router.get('/api/v1/users/:user_id', loginRequired, updateUser) // get user info PRIVATE

export const getUserInfo = (req, res) => {
  const userId = req.params.user_id

  User.find({ _id: userId })
    .exec((err, user) => {
      if (err) {
        res.status(400).json({ ERROR: 'Request failed. Check user id'})
      } else {
        res.json(user)
      }
    })
}




// router.put('/api/v1/users/:user_id') // update user info PRIVATE

export const updateUserById = (req, res) => {
    const userParam = req.params.user_id
    const user_id = { _id: req.params.user_id }
    const updatedInfo = req.body;
    const userId = req.user._id

    User.findOneAndUpdate(user_id, updatedInfo, { new: true }, (err, user) =>{
      if(userId !== userParam) {
        res.status(404).json({ ERROR: "Insufficient privileges" })
      } else {
      res.json(user)
      }
    })
}


// router.get('/api/v1/users/:user_id/orders') // get orders by user PRIVATE - _createdBy === :user_id

export const getUserOrders = (req, res) => {
  const userId = req.params.user_id

  const limit = parseInt(req.query.limit)
  const sort = { created_date: req.query.sort }
  const offset = parseInt(req.query.offset)

  Order.find({ _createdBy : userId})
  .limit(limit)
  .sort(sort)
  .skip(offset)
  .exec((err, orders) => {
    if(userId !== req.user._id) {
      res.status(404).json({ message: "Insufficient privileges."})
      } else {
        res.json(orders)
      }
  })
}






// router.delete('/api/v1/users/:user_id/orders/:order_id) // delete order for user

export const cancelOrder = (req, res) => {
  const orderId = { _id: req.params.order_id }
  Order.remove(orderId, (err, data) => {
    if(err) {
      res.status(404).json({ ERROR: "Order not found" })
    } else {
      res.json({ SUCCESS: 'Order deleted' })
    }
  })
};