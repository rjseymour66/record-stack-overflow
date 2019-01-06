import mongoose from 'mongoose';
const Schema = mongoose.Schema

export const RecordSchema = new Schema ({
  artist: {
    type: String,
    required: 'Enter the artist name'
  },
  title: {
    type: String,
    required: 'Enter the album title'
  },
  genre: {
    type: String,
    required: 'Enter the genre'
  },
  price: {
    type: String,
    required: 'Enter the price'
  },
  condition: {
    type: String,
    required: 'Enter the condition'
  },
  location: {
    type: String,
    required: 'Enter the location'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Array
  }
});


// module.exports = mongoose.model('Record', RecordSchema)