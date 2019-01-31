let env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  process.env.PORT = 4000;
  process.env.DATABASE_URL = 'mongodb://localhost/record-stack-overflow'
} else if (env === 'test') {
  process.env.PORT = 4000;
  process.env.DATABASE_URL = 'mongodb://localhost/record-stack-overflowtest'
}
let p = process.env.PORT
console.log(p);