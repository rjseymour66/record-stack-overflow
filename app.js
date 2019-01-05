import express from 'express';
import mongoose, { Collection } from 'mongoose';
import bodyParser from 'body-parser';
import RateLimit from 'express-rate-limit';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './src/routes/recordRoutes';


// express server
const app = express();
const PORT = process.env.PORT || 4000;

// CONNECT DB
// =================================================================

mongoose.connect('mongodb://localhost/record-stack-overflow', () => {
  console.log(`The database is connected!`);
});

// MIDDLEWARE
// =================================================================

// helmet setup
app.use(helmet());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/params', (req, res) => {
  res.json({ message : 'Hello World!', fullName: req.query})
  console.log(JSON.stringify(req.query));
  
});

// Server ===========================================

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});