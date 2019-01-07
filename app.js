import express from 'express';
import mongoose, { Collection } from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import User from './src/models/userModel';
import RateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './src/routes/recordRoutes';


// express server
const app = express();

// CONNECT DB
// =================================================================

const PORT = process.env.PORT || 4000;
const URL = process.env.DATABASE_URL || 'mongod://localhost/record-stack-overflow'
console.log(process.env.DATABASE_URL);

mongoose.connect(URL, () => {
  console.log(`The database is connected!`);
});

// MIDDLEWARE
// =================================================================

// EJS
app.set('view engine', 'ejs');

// helmet setup
app.use(helmet());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// JWT setup
app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
          if(err) req.user = undefined;
          req.user = decode;
          next();
      });
  } else {
      req.user = undefined;
      next();
  }
});

// rate limit setup
const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0
});

// morgan setup
app.use(morgan('tiny'))

// serve static files
app.use(express.static('public'));

// router
app.use(router)

// middleware route

// TEST ROUTE =======================================

// app.get('/params', (req, res) => {
//   res.json({ message : 'Hello World!', fullName: req.query})
//   console.log(JSON.stringify(req.query));
  
// });

// Server ===========================================

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


app.get('/', (req, res) => {
  res.render('home')
});