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
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
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
