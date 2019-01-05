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

const router = express.Router();

router.post('/records', createRecord); 
router.get('/records', getAllRecords);      
router.put('/records/:record_id', updateRecordById)
router.delete('/records/:record_id', deleteRecord)
router.get('/records/artist/:artist', getRecordsByArtist)
router.get('/records/location/:location', recordsByLocation)
router.get('/records/artist/:artist/location/:location', getRecordsByArtistAndLocation)
router.get('/records/genre/:genre', getByGenre)
router.get('/records/genre/:genre/location/:location', getGenreAndLocation)

export default router;