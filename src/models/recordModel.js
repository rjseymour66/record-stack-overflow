import mongoose from 'mongoose';
const Schema = mongoose.Schema

let date = new Date();


export const RecordSchema = new Schema ({
  available: {
    type: Boolean,
    default: true
  },
  artist: {
    type: String,
    required: 'Enter the artist name'
  },
  title: {
    type: String,
    required: 'Enter the album title'
  },
  price: {
    type: String,
    required: 'Enter the price'
  },
  condition: {
    type: String,
    required: 'Enter the condition'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: [{}]
  },
  _createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


// module.exports = mongoose.model('Record', RecordSchema)