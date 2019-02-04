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
    _createdBy: req.user._id
  })
  record.save((err, data) => {
    if (err) {
      return res.status(400).json({ ERROR: "Request failed." })
    } else {
      return res.json({ SUCCESS: 'Record created', 'New Record Information': data });
    }
  });
};

// RETRIEVE / GET ALL RECORDS
export const getAllRecords = (req, res) => {
  const limit = parseInt(req.query.limit)
  const sort = { artist: req.query.sort }
  const offset = parseInt(req.query.offset)
  const artist = req.query.artist
  const merchant = req.query.merchant

  if (artist && merchant) {
    Record.find({ $and: [{ artist: artist }, { merchant: merchant }] })
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ ERROR: "Request failed" })
        } else {
          res.json(data)
        }
      })
  } else if (merchant) {
    Record.find({ merchant: merchant })
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ ERROR: "Request failed" })
        } else {
          res.json(data)
        }
      })

  } else if (artist) {
    Record.find({ artist: artist })
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ ERROR: "Request failed" })
        } else {
          res.json(data)
        }
      })
  } else {
    Record.find()
      .limit(limit)
      .sort(sort)
      .skip(offset)
      .exec((err, data) => {
        if (err) {
          res.status(400).json({ ERROR: "Request failed" })
        } else {
          res.json(data)
        }
      })
  }
}





// UPDATE / PUT BY ID

// export const updateRecordById = (req, res) => {
//   const id = req.params.record_id;
//   // const creatorId = req.user._id;
//   const updatedInfo = req.body;
//   // const query = { _id: id, _createdBy: creatorId }
//   Record.findOneAndUpdate(id, updatedInfo, { new: true }, (err, data) => {
//     if (err) {
//       res.status(401).json({ ERROR: "Record not found. Check record id." })
//     } else {
//       res.json(data)
//     }
//   });
// };



export const updateRecordById = (req, res) => {
  const id = { _id: req.params.record_id };
  const updatedInfo = req.body;
  const merchId = req.user._id;
  Record.findOneAndUpdate(id, updatedInfo, { new: true }, (err, record) =>{
    if(merchId !== record._createdBy) {
      res.status(404).json({ ERROR: "Record not found. Check record id." })
    } else {
    res.json(record)
    }
  })
}
    


// DELETE RECORD BY ID

export const deleteRecord = (req, res) => {
  const id = { _id: req.params.record_id }
  const merchId = req.user._id;
  Record.findByIdAndRemove(id, (err, record) => {
    if(merchId !== record._createdBy) {
      res.status(404).json({ ERROR: "Insufficient privileges" })
    } else {
      res.json({ SUCCESS: 'Record object deleted' })
    }
  })
};






// export const deleteRecord = (req, res) => {

//   const id = req.params.record_id;
//   const creatorId = req.user._id;
//   const _createdBy = req.body._createdBy

//   Record.findById(id, (err, data) => {
//     if(creatorId === _createdBy) {
//       Record.remove()
//       res.json({ SUCCESS: 'Record object deleted' })
//     }
//     res.status(404).json({ ERROR: "Record not found. Check record id." })
//   })
// }
