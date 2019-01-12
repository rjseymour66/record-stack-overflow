'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _recordController = require('../controllers/recordController');

var _userController = require('../controllers/userController');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/records', _userController.loginRequired, _recordController.createRecord);
router.get('/records', _userController.loginRequired, _recordController.getAllRecords);
router.put('/records/:record_id', _userController.loginRequired, _recordController.updateRecordById);
router.delete('/records/:record_id', _userController.loginRequired, _recordController.deleteRecord);
router.get('/records/artist/:artist', _userController.loginRequired, _recordController.getRecordsByArtist);
router.get('/records/location/:location', _userController.loginRequired, _recordController.recordsByLocation);
router.get('/records/artist/:artist/location/:location', _userController.loginRequired, _recordController.getRecordsByArtistAndLocation);
router.get('/records/genre/:genre', _userController.loginRequired, _recordController.getByGenre);
router.get('/records/genre/:genre/location/:location', _userController.loginRequired, _recordController.getGenreAndLocation);

// AUTHORIZATION ROUTES
router.post('/auth/register', _userController.register);
router.post('/auth/login', _userController.login);

// Home route
router.get('/', function (req, res) {
  res.render('home');
});

exports.default = router;
//# sourceMappingURL=recordRoutes.js.map