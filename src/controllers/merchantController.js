import mongoose from 'mongoose';
import { MerchantSchema } from '../models/merchantModel';
import { RecordSchema } from '../models/recordModel';
import { OrderShema } from '../models/orderModel'


// require model
const Merchant = mongoose.model('Merchant', MerchantSchema);
const Record = mongoose.model('Record', RecordSchema);
const Order = mongoose.model('Order', OrderShema);


// router.get('/api/v1/merchant/:merchant_id/records', loginRequired, getAllMerchantRecords) // get all records by merchant
export const getAllMerchantRecords = (req, res) => {
  const limit = parseInt(req.query.limit)
  const sort = { artist: req.query.sort }
  const offset = parseInt(req.query.offset)
  const merchant = req.params.merchant_id

  Record.find({ _id: merchant })
  .limit(limit)
  .sort(sort)
  .skip(offset)
  .exec((err, data) => {
    if(err) {
      res.status(400).json({ ERROR: 'Request failed'})
    } else {
      res.json(data)
    }
  })
}



// router.get('/api/v1/merchant/:merchant_id/orders', loginRequired, getAllMerchantOrders) // get all orders by merchant PRIVATE - find by _createdBY

export const getOrdersByMerchant = (req, res) => {
  const limit = parseInt(req.query.limit)
  const sort = { artist: req.query.sort }
  const offset = parseInt(req.query.offset)
  const merchant = req.params.merchant_id

  Order.find({ merchant_id: merchant }) // Need to change order schema to include merchant ID. /api/v1/merchant/:merchant_id/orders
}






// router.get('/api/v1/merchant/:merchant_id', loginRequired, getMerchant) // get merchant information 








// router.put('/api/v1/merchant/:merchant_id', loginRequired, updateMerchant) // update merchant account information PRIVATE








// router.delete('/api/v1/merchant/:merchant_id/records/:record_id', loginRequired, deleteRecord) // delete record PRIVATE


// DELETE RECORD BY ID

export const deleteRecord = (req, res) => {
  const recId = { _id: req.params.record_id }
  Record.remove(recId, (err, data) => {
    if(err) {
      res.status(404).json({ ERROR: "Record not found" })
    } else {
      res.json({ SUCCESS: 'Record deleted' })
    }
  })
};







