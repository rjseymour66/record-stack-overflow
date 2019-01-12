'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGenreAndLocation = exports.getByGenre = exports.getRecordsByArtistAndLocation = exports.recordsByLocation = exports.getRecordsByArtist = exports.deleteRecord = exports.updateRecordById = exports.getAllRecords = exports.createRecord = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _recordModel = require('../models/recordModel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// require model
var Record = _mongoose2.default.model('Record', _recordModel.RecordSchema);
// const Record = require('./src/models/recordModel')


var createRecord = exports.createRecord = function createRecord(req, res) {
  var record = new Record(req.body);
  record.save(function (err, data) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      return res.json({ message: 'Success - record created!', 'New Record Information': data });
    }
  });
};

var getAllRecords = exports.getAllRecords = function getAllRecords(req, res) {
  Record.find(function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

var updateRecordById = exports.updateRecordById = function updateRecordById(req, res) {
  var id = { _id: req.params.record_id };
  var updatedInfo = req.body;
  Record.findOneAndUpdate(id, updatedInfo, { new: true }, function (err, contact) {
    if (err) {
      res.send(err);
    } else {
      res.json(contact);
    }
  });
};

var deleteRecord = exports.deleteRecord = function deleteRecord(req, res) {
  Record.remove({ _id: req.params.record_id }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Successfully deleted!' });
    }
  });
};

var getRecordsByArtist = exports.getRecordsByArtist = function getRecordsByArtist(req, res) {

  Record.find({ artist: req.params.artist }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

var recordsByLocation = exports.recordsByLocation = function recordsByLocation(req, res) {
  Record.find({ location: req.params.location }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

var getRecordsByArtistAndLocation = exports.getRecordsByArtistAndLocation = function getRecordsByArtistAndLocation(req, res) {
  Record.find({ artist: req.params.artist, location: req.params.location }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

var getByGenre = exports.getByGenre = function getByGenre(req, res) {
  Record.find({ genre: req.params.genre }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};

var getGenreAndLocation = exports.getGenreAndLocation = function getGenreAndLocation(req, res) {
  Record.find({ genre: req.params.genre, location: req.params.location }, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });
};
//# sourceMappingURL=recordController.js.map