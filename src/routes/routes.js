import express from 'express';
import {
  createRecord,
  getAllRecords,
  updateRecordById,
  deleteRecord,
} from '../controllers/recordController';
import { login, register, loginRequired, createUser } from '../controllers/userController';
import {
  createOrder,
  getOrder,
  getAllOrders,
  updateOrderById,
  deleteOrder,
  falseAvailable
} from '../controllers/orderController';

const router = express.Router();


// RECORD ROUTES
router.post('/api/v1/records', loginRequired, createRecord); // DONE
router.get('/api/v1/records', loginRequired, getAllRecords); // DONE 
router.put('/api/v1/records/:record_id', loginRequired, updateRecordById) // DONE
router.delete('/api/v1/records/:record_id', loginRequired, deleteRecord) // DONE


// ORDER ROUTES
router.post('/api/v1/orders', loginRequired, createOrder)// DONE
router.get('/api/v1/orders/:order_id', loginRequired, getOrder) // DONE
router.get('/api/v1/orders', loginRequired, getAllOrders) // DONE
router.put('/api/v1/orders/:order_id', loginRequired, updateOrderById) // DONE
router.delete('/api/v1/orders/:order_id', loginRequired, deleteOrder) // DONE

// USER ROUTES
router.post('/users', createUser)

// AUTHORIZATION ROUTES / USER ROUTES
router.post('/auth/register', register)
router.post('/auth/login', login)

// VIEW ROUTES
router.get('/', (req, res) => {
  res.render('home')
});

export default router;