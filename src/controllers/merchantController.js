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
      res.status(400).json({error: "Request failed" })
    } else {
      res.json(data)
    }
  })
}



// router.get('/api/v1/orders/merchant/:merchant_id', loginRequired, getAllMerchantOrders) // get all orders by merchant PRIVATE - find by _createdBY

export const getAllMerchantOrders = (req, res) => {
  const limit = parseInt(req.query.limit)
  const sort = { artist: req.query.sort }
  const offset = parseInt(req.query.offset)
  const merchant = req.params.merchant_id

  Order.find({ merchant_id: merchant })
  .limit(limit)
  .sort(sort)
  .skip(offset)
  .exec((err, orders) => {
      if(err) {
        res.status(400).json({ 
          error: "Check merchant id" 
        })
      } else {
        res.json(orders)
      }
    })
}






// router.get('/api/v1/merchant/:merchant_id', loginRequired, getMerchant) // get merchant information 

export const getMerchant = (req, res) => {
  const merchId = req.params.merchant_id

  Merchant.findById(merchId)
    .exec((err, merchant) => {
      if(err) {
        res.status(400).json({ 
          error: "Check merchant id" 
        })
      } else {
        res.json({
          companyName: merchant.companyName,
          primaryContact: merchant.primaryContact,
          email: merchant.email,
          phoneNumber: merchant.phoneNumber,
          password: merchant.password,
          address: [{
            shipping_address1: merchant.address[0].shipping_address1,
            shipping_address2: merchant.address[0].shipping_address2,
            shipping_city: merchant.address[0].shipping_city,
            shipping_state: merchant.address[0].shipping_state,
            shipping_zip: merchant.address[0].shipping_zip
          }]
        })
      }
    })
}







// router.put('/api/v1/merchant/:merchant_id', loginRequired, updateMerchant) // update merchant account information PRIVATE

export const updateMerchantById = (req, res) => {
  const merchParam = req.params.merchant_id;
  const merchant_id = { _id: req.params.merchant_id };
  const updatedInfo = req.body;
  const merchId = req.user._id;

  Merchant.findOneAndUpdate(merchant_id, updatedInfo, { new: true }, (err, merchant) =>{
    if(merchId !== merchParam) {
      res.status(404).json({ 
        error: "Insufficient privileges" 
      })
    } else {
    res.json(merchant)
    }
  })
}







// router.delete('/api/v1/merchant/:merchant_id/records/:record_id', loginRequired, deleteRecord) // delete record PRIVATE


// DELETE RECORD BY ID

export const deleteRecord = (req, res) => {
  const recId = { _id: req.params.record_id }
  Record.remove(recId, (err, data) => {
    if(err) {
      res.status(404).json({ 
        error_message: "Record was not found. Check record ID."
      })
    } else {
      res.json({ 
        message: 'Record deleted' 
      })
    }
  })
};
