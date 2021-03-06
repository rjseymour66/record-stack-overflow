import mongoose from 'mongoose';
const Schema = mongoose.Schema

let date = new Date();


export const RecordSchema = new Schema ({
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
    type: [String],
    default: undefined
  },
  _createdBy: {
    type: String,
    required: true
  }
});

