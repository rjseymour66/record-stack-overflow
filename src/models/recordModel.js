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
  comments: [{
    type: String
  }],
  _createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});


RecordSchema.pre('exec', function(next) {
  let record = this;

  if (record._createdBy !== req.user._id){
    res.status(404).json({Error : 'Insufficient privileges'})
  } else {
    next();
  }
})