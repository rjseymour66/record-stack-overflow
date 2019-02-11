import mongoose from 'mongoose';
import { CustomerSchema } from '../models/customerModel';
import { OrderSchema } from '../models/orderModel';

const Customer = mongoose.model('Customer', CustomerSchema);
const Order = mongoose.model('Order', OrderSchema);


// router.get('/api/v1/customers/:customer_id', loginRequired, updateCustomer) // get Customer info PRIVATE

export const getCustomerInfo = (req, res) => {
  const customerId = req.params.customer_id

  Customer.find({ _id: customerId })
    .exec((err, customer) => {
      if (err) {
        res.status(400).json({ 
          ERROR: 'Request failed. Check customer id'
        })
      } else {
        res.json(customer)
      }
    })
}




// router.put('/api/v1/customers/:customer_id') // update customer info PRIVATE

export const updateCustomerById = (req, res) => {
    const customerParam = req.params.customer_id
    const customer_id = { _id: req.params.customer_id }
    const updatedInfo = req.body;
    const customerId = req.user._id

    Customer.findOneAndUpdate(customer_id, updatedInfo, { new: true }, (err, customer) =>{
      if(customerId !== customerParam) {
        res.status(404).json({ 
          ERROR: "Insufficient privileges" 
        })
      } else {
      res.json(customer)
      }
    })
}


// router.get('/api/v1/customers/:customer_id/orders') // get orders by customer PRIVATE - _createdBy === :customer_id

export const getCustomerOrders = (req, res) => {
  const customerId = req.params.customer_id

  const limit = parseInt(req.query.limit)
  const sort = { created_date: req.query.sort }
  const offset = parseInt(req.query.offset)

  Order.find({ _createdBy : customerId})
  .limit(limit)
  .sort(sort)
  .skip(offset)
  .exec((err, orders) => {
    if(customerId !== req.user._id) {
      res.status(404).json({ 
        message: "Insufficient privileges."
      })
      } else {
        res.json(orders)
      }
  })
}






// router.delete('/api/v1/customers/:customer_id/orders/:order_id) // delete order for customer

export const cancelOrder = (req, res) => {
  const orderId = { _id: req.params.order_id }
  Order.remove(orderId, (err, data) => {
    if(err) {
      res.status(404).json({ 
        ERROR: "Order not found" 
      })
    } else {
      res.json({ 
        SUCCESS: 'Order deleted' 
      })
    }
  })
};