import express from 'express';
import {
  createRecord,
  getAllRecords,
  updateRecordById,
  deleteRecord,
} from '../controllers/recordController';
import { createUser } from '../controllers/userController';
import { 
  login,
  registerUser,
  registerMerchant,
  loginRequired,
  merchantLoginRequired,
  loginMerchant,
  authenticateUser } from '../middleware/authenticate';
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderById,
  deleteOrder,
  
} from '../controllers/orderController';

const router = express.Router();


// RECORD ROUTES
router.post('/api/v1/records', merchantLoginRequired, createRecord); // DONE
router.get('/api/v1/records', loginRequired, getAllRecords); // DONE 
router.put('/api/v1/records/:record_id', merchantLoginRequired, updateRecordById) // DONE
router.delete('/api/v1/records/:record_id', merchantLoginRequired, deleteRecord) // DONE


// ORDER ROUTES
router.post('/api/v1/orders', loginRequired, createOrder)// DONE
router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // DONE
router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE
router.delete('/api/v1/orders/:order_id', loginRequired, deleteOrder) // DONE


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