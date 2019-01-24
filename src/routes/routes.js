import express from 'express';
import {
  createRecord,
  getAllRecords,
  updateRecordById,
  deleteRecord,
  getRecordsByArtist,
  getByGenre,
  getGenreAndLocation,
} from '../controllers/recordController';
import { login, register, loginRequired } from '../controllers/userController';
import { recordsByLocation, getRecordsByArtistAndLocation } from '../controllers/locationController';
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

router.get('/api/records/artist/:artist', loginRequired, getRecordsByArtist)
router.get('/api/records/genre', loginRequired, getByGenre)
router.get('/api/records/genre/:genre/location/:location', loginRequired, getGenreAndLocation)

// LOCATION ROUTES
router.get('/api/location', loginRequired, recordsByLocation)
router.get('/api/records/artist/:artist/location/:location', loginRequired, getRecordsByArtistAndLocation)

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