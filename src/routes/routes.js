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
  getCustomerOrders,
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


// RECORD ROUTES
router.post('/api/v1/records',  verifyMerchant, loginRequired, createRecord); // DONE
router.get('/api/v1/records', loginRequired, getAllRecords); // DONE 
router.get('/api/v1/records/merchants/:merchant_id', loginRequired, getAllMerchantRecords) // get all records by merchant
router.put('/api/v1/records/:record_id', verifyMerchant, loginRequired, updateRecordById) // DONE
router.delete('/api/v1/records/:record_id/merchants/:merchant_id', loginRequired, createdBy, deleteRecord) // delete record PRIVATE


// TEST ROUTE
// router.post('/api/v1/test/records/:record_id', loginRequired, createTest); // DONE



// ORDER ROUTES
router.post('/api/v1/orders/records/:record_id', loginRequired, createOrder)// DONE
router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // DONE
// router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE

router.get('/api/v1/orders/merchants/:merchant_id', loginRequired, createdBy, getAllMerchantOrders) // get all orders by merchant PRIVATE
router.get('/api/v1/orders/customers/:customer_id', loginRequired, getCustomerOrders) // get orders by customer PRIVATE
// router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE MAKE PRIVATE
router.delete('/api/v1/orders/:order_id/customer/:customer_id', loginRequired, orderedBy, cancelOrder) // delete order for customer




// MERCHANT ROUTES
router.get('/api/v1/merchants/:merchant_id', loginRequired, getMerchant) // get merchant information 
router.put('/api/v1/merchants/:merchant_id', loginRequired, updateMerchantById) // update merchant account information PRIVATE
router.get('/api/v1/merchants/:merchant_id/orders', loginRequired, createdBy, getAllMerchantOrders) // get all orders by merchant PRIVATE 


// USER ROUTES
router.get('/api/v1/customers/:customer_id', loginRequired, getCustomerInfo) // get Customer info PRIVATE
router.put('/api/v1/customers/:customer_id', loginRequired, updateCustomerById) // update Customer info PRIVATE
router.get('/api/v1/customers/:customer_id/orders', loginRequired, getCustomerOrders) // get orders by Customer PRIVATE



// CUSTOMER ROUTES
// router.get('/api/v1/customers/:customer_id', loginRequired, getCustomerInfo) // get Customer info PRIVATE
// router.put('/api/v1/customers/:customer_id', loginRequired, updateCustomerById) // update Customer info PRIVATE



// AUTHORIZATION ROUTES / CUSTOMER ROUTES
router.post('/auth/register/customer', registerCustomer) // WORKS
router.post('/auth/login/customer', login) // WORKS


// AUTHORIZATION ROUTES / MERCHANT
router.post('/auth/register/merchant', registerMerchant) // WORKS
router.post('/auth/login/merchant', loginMerchant) // WORKS


// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});



export default router;