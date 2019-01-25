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
  getAllOrders,
  updateOrderById,
  deleteOrder
 } from '../controllers/orderController';

const router = express.Router();


// RECORD ROUTES
router.post('/api/records', loginRequired, createRecord); // DONE
router.get('/api/records', loginRequired, getAllRecords); // DONE 
router.put('/api/records/:record_id', loginRequired, updateRecordById) // DONE
router.delete('/api/records/:record_id', loginRequired, deleteRecord) // DONE


// ORDER ROUTES
router.post('/api/orders', loginRequired, createOrder)
router.get('/api/orders', loginRequired, getAllOrders) 
router.put('/api/orders/:order_id', loginRequired, updateOrderById)
router.delete('/api/orders/:order_id', loginRequired, deleteOrder)


// AUTHORIZATION ROUTES
router.post('/auth/register', register)
router.post('/auth/login', login)

// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});

export default router;