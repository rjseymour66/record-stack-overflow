'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _userModel = require('./models/userModel');

var _userModel2 = _interopRequireDefault(_userModel);

var _expressRateLimit = require('express-rate-limit');

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _recordRoutes = require('./routes/recordRoutes');

var _recordRoutes2 = _interopRequireDefault(_recordRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// express server
var app = (0, _express2.default)();

// CONNECT DB
// =================================================================

var PORT = 4000;
var URL = process.env.DATABASE_URL || 'mongod://localhost/record-stack-overflow';
console.log(process.env.DATABASE_URL);

_mongoose2.default.connect(URL, function () {
  console.log('The database is connected!');
});

// MIDDLEWARE
// =================================================================

// EJS
app.set('view engine', 'ejs');

// helmet setup
app.use((0, _helmet2.default)());

// body parser
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

// JWT setup
app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    _jsonwebtoken2.default.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

// rate limit setup
var limiter = new _expressRateLimit2.default({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
});

// morgan setup
app.use((0, _morgan2.default)('tiny'));

// serve static files
app.use(_express2.default.static('public'));

// router
app.use(_recordRoutes2.default);

// middleware route

// TEST ROUTE =======================================

// app.get('/params', (req, res) => {
//   res.json({ message : 'Hello World!', fullName: req.query})
//   console.log(JSON.stringify(req.query));

// });

// Server ===========================================

app.listen(PORT, function () {
  console.log('Server is listening on port ' + PORT);
});

app.get('/', function (req, res) {
  res.render('home');
});
//# sourceMappingURL=index.js.map