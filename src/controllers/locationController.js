import mongoose from 'mongoose';
import { RecordSchema } from '../models/recordModel';

// require model
const Record = mongoose.model('Record', RecordSchema);

export const recordsByLocation = (req, res) => {
  const limit = parseInt(req.query.limit)
  const location = req.query.location

  Record.find({location: location}, (err, data) => {
    if (err) {
      res.status(400).json({ message: "Invalid location."}) 
    } else {
      res.json(data)
    }
  }).limit(limit);
};

export const getRecordsByArtistAndLocation = (req, res) => {
  Record.find({artist: req.params.artist, location: req.params.location}, (err,data) => {
    if (err) {
      res.status(400).json({ message: "Location not found."}) 
    } else {
      res.json(data)
    }
  });
}