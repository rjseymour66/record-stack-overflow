import mongoose from 'mongoose';
import { RecordSchema } from '../models/recordModel';

// require model
const Record = mongoose.model('Record', RecordSchema);
// const Record = require('./src/models/recordModel')



export const createRecord = (req, res) => {
  let record = new Record(req.body)
  record.save((err, data) => {
    if(!req.body.artist) {
      res.json({ error: 'artist is required' })
    } else if (!req.body.title) {
      res.json({ error: 'title is required' })
    } else if (!req.body.genre) {
      res.json({ error: 'genre is required' })
    } else if (!req.body.price) {
      res.json({ error: 'price is required' })
    } else if (!req.body.condition) {
      res.json({ error: 'condition is required '})
    } else if (!req.body.location) {
      res.json({ error: 'location is required' })
    } else {
      res.json({message: 'Success - record created!', 'New Record Information': data})
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


