import mongoose from 'mongoose';
import { RecordSchema } from '../models/recordModel';
import { OrderSchema } from '../models/orderModel';


// require model
const Record = mongoose.model('Record', RecordSchema);


// CREATE / POST NEW RECORD
export const createRecord = (req, res) => {
  let record = new Record(req.body);
  record.save((err, data) => {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.json({message: 'Success - record created!', 'New Record Information': data});
    }
  });
};

// RETRIEVE / GET ALL RECORDS
export const getAllRecords = (req, res) => {
  const limit = parseInt(req.query.limit)
  const artistSort = {artist: 1}
  const offset = parseInt(req.query.offset)

  Record.find((err, data) => {
    if (err) {
      res.status(400).json({ message: "Request failed." })
    } else {
      res.json(data)
    }
  }).limit(limit)
    .sort(artistSort)
    .skip(offset)
}  

// UPDATE / PUT BY ID
export const updateRecordById = (req, res) => {
  const id = {_id: req.params.record_id};
  const updatedInfo = req.body;
  Record.findOneAndUpdate(id, updatedInfo, { new: true }, (err, data) => {
    if (err) {
      res.status(404).json({ message: "Record not found. Check record id."})
    } else {
      res.json(data)
    }
  });
};

// DELETE RECORD BY ID
export const deleteRecord = (req, res) => {
  Record.remove({_id: req.params.record_id}, (err, data) => {
    if (err) {
      res.status(404).json({ message: "Record not found. Check record id."})
    } else {
      res.json({message: 'Successfully deleted!'})
    }
  });
};



export const getRecordsByArtist = (req, res) => {

  Record.find({artist: req.params.artist}, (err, data) => {
    if (err) {
      res.send(err) 
    } else {
      res.json(data)
    }
  });
}

export const getByGenre = (req, res) => {
  const limit = parseInt(req.query.limit)
  const genre = req.query.genre

  Record.find({genre: genre}, (err, data) => {
    if (err) {
      res.status(400).json({ message: "Genre not found."}) 
    } else {
      res.json(data)
    }
  }).limit(limit);
};

export const getGenreAndLocation = (req, res) => {
  Record.find({genre: req.params.genre, location: req.params.location}, (err,data) => {
    if (err) {
      res.status(400).json({ message: "Genre or Location not found."}) 
    } else {
      res.json(data)
    }
  });
}


