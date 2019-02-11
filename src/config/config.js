// let env = process.env.NODE_ENV || 'development'

// if (env === 'development' || env === 'test') {
//   const config = require('./config.json')
//   const envConfig = config[env];

//   Object.keys(envConfig).forEach((key) => {
//     process.env[key] = envConfig[key];
//   });
// }

// if (env === 'development') {
//   process.env.PORT = 4000;
//   process.env.DATABASE_URL = 'mongodb://localhost/record-stack-overflow'
// } else if (env === 'test') {
//   process.env.PORT = 4000;
//   process.env.DATABASE_URL = 'mongodb://localhost/record-stack-overflowtest'
// }