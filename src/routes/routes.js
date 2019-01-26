import express from 'express';
import {
  createRecord,
  getAllRecords,
  updateRecordById,
  deleteRecord,
} from '../controllers/recordController';
import { login, register, loginRequired } from '../controllers/userController';
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderById,
  deleteOrder,
  
 } from '../controllers/orderController';

const router = express.Router();


// RECORD ROUTES
router.post('/api/records', loginRequired, createRecord); // DONE
router.get('/api/records', loginRequired, getAllRecords); // DONE 
router.put('/api/records/:record_id', loginRequired, updateRecordById) // DONE
router.delete('/api/records/:record_id', loginRequired, deleteRecord) // DONE


// ORDER ROUTES
router.post('/api/orders', loginRequired, createOrder) // DONE
router.get('/api/orders/:order_id', loginRequired, getOrder) // DONE
router.get('/api/orders', loginRequired, getAllOrders) // DONE
router.put('/api/orders/:order_id', loginRequired, updateOrderById) // DONE
router.delete('/api/orders/:order_id', loginRequired, deleteOrder) // DONE


// AUTHORIZATION ROUTES
router.post('/auth/register', register)
router.post('/auth/login', login)

// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});

export default router;