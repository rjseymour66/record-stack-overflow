import mongoose from 'mongoose';
import { RecordSchema } from '../models/recordModel';


// require model
const Record = mongoose.model('Record', RecordSchema);


// CREATE / POST NEW RECORD
export const createRecord = (req, res) => {
  let record = new Record({
    artist: req.body.artist,
    title: req.body.title,
    price: req.body.price,
    condition: req.body.condition,
    comments: req.body.comments,
    _createdBy: req.user
  })
  record.save((err, record) => {
    if (err) {
      return res.status(400).json({ 
        error_message: "Request failed",
        status_code: 400
      })
    } else {
      return res.json(record);
    }
  });
};

// RETRIEVE / GET ALL RECORDS
export const getAllRecords = (req, res) => {
  const limit = parseInt(req.query.limit)
  const sort = { artist: req.query.sort }
  const offset = parseInt(req.query.offset)
  const artist = req.query.artist
  const companyName = req.query.companyName

  if (artist && companyName) {
    Record.find({ $and: [{ artist: artist }, { companyName: companyName }] })
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, record) => {
        if (err) {
          res.status(400).json({ 
            error_message: "Request failed",
            status_code: 400
          })
        } else {
          res.json(record)
        }
      })
  } else if (companyName) {
    Record.find({ companyName: companyName })
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, record) => {
        if (err) {
          res.status(400).json({ 
            error_message: "Request failed",
            status_code: 400
          })
        } else {
          res.json(record)
        }
      })

  } else if (artist) {
    Record.find({ artist: artist })
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, record) => {
        if (err) {
          res.status(400).json({ 
            error_message: "Request failed",
            status_code: 400
          })
        } else {
          res.json(record)
        }
      })
  } else {
    Record.find()
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, record) => {
        if (err) {
          res.status(400).json({ 
            error_message: "Request failed",
            status_code: 400
          })
        } else {
          res.json(record)
        }
      })
  }
}


export const updateRecordById = (req, res) => {
  const id = { _id: req.params.record_id };
  const updatedInfo = req.body;
  const merchId = req.user._id;
  Record.findOneAndUpdate(id, updatedInfo, { new: true }, (err, record) =>{
    if(merchId !== record._createdBy) {
      res.status(404).json({ 
        error_message : "Record not found. Check record ID",
        status_code: 404 
      })
    } else {
    res.json(record)
    }
  })
}