import express from 'express';
import {
  createRecord,
  getAllRecords,
  updateRecordById,
  deleteRecord,
  getRecordsByArtist,
  recordsByLocation,
  getRecordsByArtistAndLocation,
  getByGenre,
  getGenreAndLocation,
} from '../controllers/recordController';
import { login, register, loginRequired } from '../controllers/userController';

const router = express.Router();

router.post('/records', loginRequired, createRecord); 
router.get('/records', loginRequired, getAllRecords);      
router.put('/records/:record_id', loginRequired, updateRecordById)
router.delete('/records/:record_id', loginRequired, deleteRecord)
router.get('/records/artist/:artist', loginRequired, getRecordsByArtist)
router.get('/records/location/:location', loginRequired, recordsByLocation)
router.get('/records/artist/:artist/location/:location', loginRequired, getRecordsByArtistAndLocation)
router.get('/records/genre/:genre', loginRequired, getByGenre)
router.get('/records/genre/:genre/location/:location', loginRequired, getGenreAndLocation)

// AUTHORIZATION ROUTES
router.post('/auth/register', register)
router.post('/auth/login', login)

// Home route
// router.get('/', (req, res) => {
//   res.render('home')
// });

export default router;