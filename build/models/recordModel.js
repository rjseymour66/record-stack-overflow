'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecordSchema = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RecordSchema = exports.RecordSchema = new Schema({
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
//# sourceMappingURL=recordModel.js.map