import express from 'express';


// RECORD CONTROLLER
import {
  createRecord,
  getAllRecords,
  updateRecordById,
} from '../controllers/recordController';

// ORDER CONTROLLER
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderById,
} from '../controllers/orderController';

// MERCHANT CONTROLLER
import {
  getAllMerchantRecords,
  getAllMerchantOrders,
  getMerchant,
  updateMerchantById,
  deleteRecord
} from '../controllers/merchantController'

// CUSTOMER CONTROLLER
import {
  getCustomerInfo,
  updateCustomerById,
  getAllCustomerOrders,
  cancelOrder
} from '../controllers/customerController'

// MIDDLEWARE
import { 
  login,
  registerCustomer,
  registerMerchant,
  loginRequired,
  loginMerchant,
  verifyMerchant,
  createdBy,
  orderedBy
} from '../middleware/authenticate';

const router = express.Router();


// AUTHORIZATION ROUTES / CUSTOMER ROUTES
router.post('/auth/register/customer', registerCustomer) // WORKS
router.post('/auth/login/customer', login) // WORKS


// AUTHORIZATION ROUTES / MERCHANT
router.post('/auth/register/merchant', registerMerchant) // X
router.post('/auth/login/merchant', loginMerchant) // X


// RECORD ROUTES
router.post('/api/v1/records',  verifyMerchant, loginRequired, createRecord); // X
router.get('/api/v1/records', loginRequired, getAllRecords); // X 
router.get('/api/v1/records/merchants/:merchant_id', loginRequired, getAllMerchantRecords) // X
router.put('/api/v1/records/:record_id', verifyMerchant, loginRequired, updateRecordById) // X
router.delete('/api/v1/records/:record_id/merchants/:merchant_id', loginRequired, createdBy, deleteRecord) // X


// ORDER ROUTES
router.post('/api/v1/orders/merchants/:merchant_id/records/:record_id', loginRequired, createOrder)// X
router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // X
router.get('/api/v1/orders/merchants/:merchant_id', loginRequired, createdBy, getAllMerchantOrders) // X
router.get('/api/v1/orders/customers/:customer_id', loginRequired, getAllCustomerOrders) // X
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE MAKE PRIVATE
router.delete('/api/v1/orders/:order_id/customers/:customer_id', loginRequired, orderedBy, cancelOrder) // delete order for customer


// MERCHANT ROUTES
router.get('/api/v1/merchants/:merchant_id', loginRequired, getMerchant) // X
router.put('/api/v1/merchants/:merchant_id', loginRequired, updateMerchantById) // X

// CUSTOMER ROUTES
router.get('/api/v1/customers/:customer_id', loginRequired, getCustomerInfo) // get Customer info PRIVATE
router.put('/api/v1/customers/:customer_id', loginRequired, updateCustomerById) // update Customer info PRIVATE




// ABOVE ROUTES ARE TESTED AND COMPLETED #####################################################################################


// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});



export default router;