import mongoose from 'mongoose';
import { RecordSchema } from '../models/recordModel';

// require model
const Record = mongoose.model('Record', RecordSchema);


// RETRIEVE / GET RECORDS BY LOCATION
export const getRecordsByLocation = (req, res) => {
  const limit = parseInt(req.query.limit)
  const artistSort = {artist: 1}
  const offset = parseInt(req.query.offset)

  Record.find({location: req.params.location}, (err, data) => {
    if (err) {
      res.send(err) 
    } else {
      res.json(data)
    }
  }).limit(limit)
    .sort(artistSort)
    .skip(offset)
}


export const getRecordsByArtistAndLocation = (req, res) => {
  Record.find({artist: req.params.artist, location: req.params.location}, (err,data) => {
    if (err) {
      res.status(400).json({ message: "Location not found."}) 
    } else {
      res.json(data)
    }
  });
}