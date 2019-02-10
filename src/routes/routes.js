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
<<<<<<< HEAD
router.delete('/api/v1/records/:record_id/merchants/:merchant_id', loginRequired, createdBy, deleteRecord) // delete record PRIVATE

// TEST ROUTE
// router.post('/api/v1/test/records/:record_id', loginRequired, createTest); // DONE

=======
>>>>>>> parent of 68f9a02... Change user to customer, rearranged routes page, fixed verifyMerchant auth middleware


// ORDER ROUTES
router.post('/api/v1/records/:record_id/orders', loginRequired, createOrder)// DONE
router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // DONE
<<<<<<< HEAD
router.get('/api/v1/orders/merchants/:merchant_id', loginRequired, createdBy, getAllMerchantOrders) // get all orders by merchant PRIVATE
router.get('/api/v1/orders/customers/:customer_id', loginRequired, getUserOrders) // get orders by user PRIVATE
// router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
=======
router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
>>>>>>> parent of 68f9a02... Change user to customer, rearranged routes page, fixed verifyMerchant auth middleware
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE MAKE PRIVATE



// MERCHANT ROUTES
router.get('/api/v1/merchants/:merchant_id/records', loginRequired, getAllMerchantRecords) // get all records by merchant
router.get('/api/v1/merchants/:merchant_id/orders', loginRequired, createdBy, getAllMerchantOrders) // get all orders by merchant PRIVATE 
router.get('/api/v1/merchants/:merchant_id', loginRequired, getMerchant) // get merchant information 
router.put('/api/v1/merchants/:merchant_id', loginRequired, updateMerchantById) // update merchant account information PRIVATE
<<<<<<< HEAD


// CUSTOMER ROUTES
router.get('/api/v1/customers/:customer_id', loginRequired, getUserInfo) // get user info PRIVATE
router.put('/api/v1/customers/:customer_id', loginRequired, updateUserById) // update user info PRIVATE

=======
router.delete('/api/v1/merchants/:merchant_id/records/:record_id', loginRequired, createdBy, deleteRecord) // delete record PRIVATE

// USER ROUTES
router.get('/api/v1/users/:user_id', loginRequired, getUserInfo) // get user info PRIVATE
router.put('/api/v1/users/:user_id', loginRequired, updateUserById) // update user info PRIVATE
router.get('/api/v1/users/:user_id/orders', loginRequired, getUserOrders) // get orders by user PRIVATE
router.delete('/api/v1/users/:user_id/orders/:order_id', loginRequired, orderedBy, cancelOrder) // delete order for user
>>>>>>> parent of 68f9a02... Change user to customer, rearranged routes page, fixed verifyMerchant auth middleware


// AUTHORIZATION ROUTES / USER ROUTES
router.post('/auth/register/user', registerUser)
router.post('/auth/login/user', login)


// AUTHORIZATION ROUTES / MERCHANT
router.post('/auth/register/merchant', registerMerchant)
router.post('/auth/login/merchant', loginMerchant)


// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});



export default router;