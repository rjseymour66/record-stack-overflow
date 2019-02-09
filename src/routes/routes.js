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

// USER CONTROLLER
import {
  getUserInfo,
  updateUserById,
  getUserOrders,
  cancelOrder
} from '../controllers/userController'

// MIDDLEWARE
import { 
  login,
  registerUser,
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




// ORDER ROUTES
router.post('/api/v1/orders/records/:record_id', loginRequired, createOrder)// DONE
router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // DONE
router.get('/api/v1/orders/merchants/:merchant_id', loginRequired, createdBy, getAllMerchantOrders) // get all orders by merchant PRIVATE
router.get('/api/v1/orders/customers/:customer_id', loginRequired, getUserOrders) // get orders by user PRIVATE
// router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE MAKE PRIVATE
router.delete('/api/v1/orders/:order_id/customer/:customer_id', loginRequired, orderedBy, cancelOrder) // delete order for user




// MERCHANT ROUTES
router.get('/api/v1/merchants/:merchant_id', loginRequired, getMerchant) // get merchant information 
router.put('/api/v1/merchants/:merchant_id', loginRequired, updateMerchantById) // update merchant account information PRIVATE


// CUSTOMER ROUTES
router.get('/api/v1/customers/:customer_id', loginRequired, getUserInfo) // get user info PRIVATE
router.put('/api/v1/customers/:customer_id', loginRequired, updateUserById) // update user info PRIVATE



// AUTHORIZATION ROUTES / USER ROUTES
router.post('/auth/register/customer', registerUser)
router.post('/auth/login/customer', login)


// AUTHORIZATION ROUTES / MERCHANT
router.post('/auth/register/merchant', registerMerchant)
router.post('/auth/login/merchant', loginMerchant)


// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});



export default router;