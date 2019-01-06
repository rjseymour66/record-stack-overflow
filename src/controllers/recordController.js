import mongoose from 'mongoose';
import { RecordSchema } from '../models/recordModel';


// require model
const Record = mongoose.model('Record', RecordSchema);
// const Record = require('./src/models/recordModel')



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

export const getAllRecords = (req, res) => {
  Record.find((err, data) => {
    if (err) {
      res.send(err) 
    } else {
      res.json(data)
    }
  });
};

export const updateRecordById = (req, res) => {
  const id = {_id: req.params.record_id};
  const updatedInfo = req.body;
  Record.findOneAndUpdate(id, updatedInfo, { new: true }, (err, contact) => {
    if (err) {
      res.send(err)
    } else {
      res.json(contact)
    }
  });
};

export const deleteRecord = (req, res) => {
  Record.remove({_id: req.params.record_id}, (err, data) => {
    if (err) {
      res.send(err)
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

export const recordsByLocation = (req, res) => {
  Record.find({location: req.params.location}, (err, data) => {
    if (err) {
      res.send(err) 
    } else {
      res.json(data)
    }
  });
};

export const getRecordsByArtistAndLocation = (req, res) => {
  Record.find({artist: req.params.artist, location: req.params.location}, (err,data) => {
    if (err) {
      res.send(err) 
    } else {
      res.json(data)
    }
  });
}

export const getByGenre = (req, res) => {
  Record.find({genre: req.params.genre}, (err, data) => {
    if (err) {
      res.send(err) 
    } else {
      res.json(data)
    }
  });
};

export const getGenreAndLocation = (req, res) => {
  Record.find({genre: req.params.genre, location: req.params.location}, (err,data) => {
    if (err) {
      res.send(err) 
    } else {
      res.json(data)
    }
  });
}


