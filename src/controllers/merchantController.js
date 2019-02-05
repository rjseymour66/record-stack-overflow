import mongoose from 'mongoose';
import { MerchantSchema } from '../models/merchantModel';
import { RecordSchema } from '../models/recordModel';


// require model
const Merchant = mongoose.model('Merchant', MerchantSchema);
const Record = mongoose.model('Record', RecordSchema);

// router.get('/api/v1/merchant/:merchant_id/records', loginRequired, getAllMerchantRecords) // get all records by merchant






// router.get('/api/v1/merchant/:merchant_id/orders', loginRequired, getAllMerchantOrders) // get all orders by merchant PRIVATE - find by _createdBY







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







