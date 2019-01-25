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
      return res.json({ message: 'Success - record created!', 'New Record Information': data });
    }
  });
};

// RETRIEVE / GET ALL RECORDS
export const getAllRecords = (req, res) => {
  const limit = parseInt(req.query.limit)
  const artistSort = { artist: 1 }
  const offset = parseInt(req.query.offset)
  const artist = req.query.artist
  const location = req.query.location

  if (artist && location) {
    Record.find({ $and: [{ artist: artist }, { location: location }] })
      .limit(limit)
      .sort(artistSort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ message: "Request failed." })
        } else {
          res.json(data)
        }
      })
  } else if (location) {
    Record.find({ location: location })
      .limit(limit)
      .sort(artistSort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ message: "Request failed." })
        } else {
          res.json(data)
        }
      })

  } else if (artist) {
    Record.find({ artist: artist })
      .limit(limit)
      .sort(artistSort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ message: "Request failed." })
        } else {
          res.json(data)
        }
      })
  } else {
    Record.find()
      .limit(limit)
      .sort(artistSort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ message: "Request failed." })
        } else {
          res.json(data)
        }
      })
  }
}





// UPDATE / PUT BY ID
export const updateRecordById = (req, res) => {
  const id = { _id: req.params.record_id };
  const updatedInfo = req.body;
  Record.findOneAndUpdate(id, updatedInfo, { new: true }, (err, data) => {
    if (err) {
      res.status(404).json({ message: "Record not found. Check record id." })
    } else {
      res.json(data)
    }
  });
};

// DELETE RECORD BY ID
export const deleteRecord = (req, res) => {
  Record.remove({ _id: req.params.record_id }, (err, data) => {
    if (err) {
      res.status(404).json({ ERROR: "Record not found. Check record id." })
    } else {
      res.json({ SUCCESS: 'Record object deleted' })
    }
  });
};